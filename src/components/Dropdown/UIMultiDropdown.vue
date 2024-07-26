<template>
  <div class="ui-multi-dropdown-c">
    <div class="ui-multi-dropdown-c-wrapper">
      <label class="label" v-if="label?.length !== 0">{{ label }}</label>
      <button @click="toggleDropdown" class="ui-multi-dropdown-button" :class="{ active: isOpen }">
        <div class="placeholder-text">{{ labelDisplay }}</div>
        <SvgIcon class="arrow" :class="{ up: isOpen }" :name="'arrow-down'" :size="'s'" />
      </button>
      <div v-if="isOpen" class="ui-multi-dropdown-menu" :style="{ fontSize: fontSize + 'px' }">
        <div v-if="searchable" class="search-container">
          <div class="search-content-wrapper">
            <input type="text" v-model="searchQuery" placeholder="Search..." class="ui-multi-dropdown-search" />
            <span class="clear-search">
              <SvgIcon v-if="searchQuery" @click.stop="clearSearch" class="clear-search-img" :name="'x'" :size="'s'" />
            </span>
          </div>
        </div>
        <div class="button-wrapper" v-if="hasActionBox">
          <span class="toggle" @click="selectAll">Select All</span>
          <span class="toggle" @click="dropAll">Drop All</span>
        </div>
        <div class="ui-multi-dropdown-content" :style="{ fontSize: fontSize + 'px', height: dropdownListMaxHeight }">
          <div v-for="item in filteredItems()" :key="item[primaryKey]" class="ui-multi-dropdown-item"
            @click.stop="selectItem(item)" :class="{ selected: isSelected(item) }">
            <div v-if="this.isSelected(item)" class="item-container">
              <div class="image-label-wrapper">
                <div class="dropdown-item-img" :class="{ isVisible: isImageAvailable, visibleIcon: !checkItem(item) }">
                  <SvgIcon :name="item[iconImage]" :size="'s'" />
                </div>

                <span class="item-name"> {{ isLongItem(item) }}</span>
              </div>

              <span :class="['circle', className ? `${className}` : '']"> </span>
            </div>
            <div v-else class="item-container">
              <div class="image-label-wrapper">
                <div class="dropdown-item-img" :class="{ isVisible: isImageAvailable, visibleIcon: !checkItem(item) }">
                  <SvgIcon :name="item[iconImage]" :size="'s'" />
                </div>

                <span class="item-name">{{ isLongItem(item) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UIMultiDropDown',

  props: {
    items: {
      // items in the database.
      type: Array,
      required: true,
      default: () => []
    },
    primaryKey: {
      type: String,
      default: 'id'
    },
    dataSize: {
      // how many data will shown in the dropdown.
      type: Number
    },
    maxVisibleItems: {
      type: Number,
      default: 1
    },

    hasActionBox: {
      type: Boolean
    },
    className: {
      type: String,
      default: 'flight'
    },
    modelValue: {
      type: Array<Object>,
      default: () => []
    },

    label: {
      // label on the dropdown to understand what the dropdown contents are.
      type: String
    },

    fontSize: {
      // defined fontsize shown in the dropdown.
      type: Number,
      default: 14
    },
    placeHolder: {
      // placeHolder before the selection.
      type: Array,
      default: () => ['Select an item']
    },
    searchable: {
      // in many results user can find what he/she looks for.
      type: Boolean,
      default: false
    },

    displayField: {
      // takes the name of the chosen id
      type: String,
      default: 'name'
    },

    sortField: {
      type: String
    },
    sortByAscending: {
      type: Boolean,
      default: false
    },
    maxItemThreshold: {
      type: Number,
      default: 15
    },
    iconImage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isOpen: false, // checks that if drowdown is open or not.
      searchQuery: '', // when the user input text, it comes to the searchQuery.
      selectedItems: this.modelValue, // represents the currently selected item.
      dropdownItems: this.items,
      isImageAvailable: false
    }
  },
  computed: {
    computedDataSize(): Number {
      //if it is defined 'dataSize' if not 'itemLength'
      return this.dataSize !== undefined ? this.dataSize : this.items.length
    },
    //sets the height of dropdown content
    dropdownListMaxHeight(): string {
      const itemHeight = 33
      const maxHeight = itemHeight * this.computedDataSize
      return `${maxHeight}px`
    },
    //prints selected items on dropdown button
    labelDisplay(): String {
      if (this.selectedItems.length === 0 || this.selectedItems === undefined) {
        return this.placeHolder.toString()
      } else if (this.selectedItems.length > this.maxVisibleItems) {
        return this.selectedItems.length + ' items have been selected'
      } else {
        let displayLabel = this.isLongItem(this.selectedItems[0])
        for (let i = 1; i < this.selectedItems.length; i++) {
          displayLabel = displayLabel + ',' + this.isLongItem(this.selectedItems[i])
        }
        return displayLabel
      }
    }
  },
  methods: {
    dropAll() {
      const toBeDeleted = this.filteredItems()
      for (let i = 0; i < toBeDeleted.length; i++) {
        this.selectedItems = this.selectedItems.filter(
          (selected) => selected[this.primaryKey] !== toBeDeleted[i][this.primaryKey]
        )
      }
      this.$emit('update:modelValue', this.selectedItems)
    },
    selectAll() {
      let addedItems = this.filteredItems()
      for (let i = 0; i < addedItems.length; i++) {
        if (!this.isSelected(addedItems[i])) {
          this.selectedItems.push(addedItems[i])
        }
      }
      this.$emit('update:modelValue', this.selectedItems)
    },
    //sorts items by ascending or descending
    sortItems(items: Array<any>): Array<any> {
      if (this.sortField === undefined) return [...items]
      else {
        return [...items].sort((a, b) => {
          const aValue = String(a[this.sortField]).toLowerCase()
          const bValue = String(b[this.sortField]).toLowerCase()
          if (aValue < bValue) return this.sortByAscending ? -1 : 1
          if (aValue > bValue) return this.sortByAscending ? 1 : -1
          return 0
        })
      }
    },
    //maps Turkish characters to english characters
    mapToTurkishWords(word): string {
      const mappedTurkishLetters = {
        ç: 'c',
        ı: 'i',
        ğ: 'g',
        ö: 'o',
        ş: 's',
        ü: 'u'
      }

      return word.replace(
        /[çığöşü]/g,
        (letter) => mappedTurkishLetters[letter.toLowerCase()] || letter
      )
    },
    stringContainsAnyWord(word, array): boolean {
      return array.some((char) => word.includes(char))
    },

    createItemDropdown(): string {
      const turkishLetters = ['ç', 'ı', 'ğ', 'ö', 'ş', 'ü']

      if (this.stringContainsAnyWord(this.searchQuery, turkishLetters)) {
        return this.dropdownItems.filter((item) =>
          String(item[this.displayField].toLowerCase()).includes(this.searchQuery.toLowerCase())
        )
      } else {
        return this.dropdownItems.filter((item) =>
          this.mapToTurkishWords(item[this.displayField].toLowerCase()).includes(
            this.searchQuery.toLowerCase()
          )
        )
      }
    },
    filteredItems(): Array<any> {
      let items = this.createItemDropdown()
      if (this.sortField !== undefined) {
        items = this.sortItems(items)
      }
      let selectedItems = items.filter(item => this.isSelected(item))
      let nonSelectedItems = items.filter(item => !this.isSelected(item))

      // Concatenate selected items at the top
      return [...selectedItems, ...nonSelectedItems]
    },
    //this method shortens the word if the word is too long and puts ... at the end
    isLongItem(item): string {
      if (
        item[this.displayField] !== undefined &&
        String(item[this.displayField]).length > this.maxItemThreshold
      ) {
        return String(item[this.displayField]).substring(0, this.maxItemThreshold) + '...'
      } else if (item[this.displayField] === undefined) return item[this.displayField]
      return String(item[this.displayField])
    },
    checkItem(item): boolean {
      return item[this.iconImage] !== '' && item[this.iconImage] !== undefined
    },
    checkImage(): boolean {
      for (let i = 0; i < this.dropdownItems.length; i++) {
        if (
          this.dropdownItems[i][this.iconImage] !== '' &&
          this.dropdownItems[i][this.iconImage] !== undefined
        ) {
          return true
        }
      }
      return false
    },
    isSelected(item): boolean {
      let flag = false
      for (let i = 0; i < this.selectedItems.length; i++) {
        if (this.selectedItems[i][this.primaryKey] === item[this.primaryKey]) {
          flag = true
        }
      }
      return flag
    },

    selectItem(item) {
      if (this.isSelected(item)) {
        this.selectedItems = this.selectedItems.filter(
          (selected) => selected[this.primaryKey] !== item[this.primaryKey]
        )
        this.$emit('update:modelValue', this.selectedItems)
      } else {
        this.selectedItems.push(item)
        this.$emit('update:modelValue', this.selectedItems)
      }
      this.dropdownItems = this.items
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.clearSearch()
      }

      this.clearSearch()
    },
    clearSearch() {
      // clears the searchQuery
      this.searchQuery = ''
    },
    handleClickOutside(event: MouseEvent) {
      // when clicked out of the dropdown, dropdownMenu closes.
      const target = event.target as HTMLElement
      if (
        !this.$el.children[0]?.children[1]?.contains(target) &&
        !this.$el.children[0].children[2]?.contains(target)
      ) {
        this.isOpen = false
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside) // When is clicked , event occurs anywhere on the document. this.handleClickOutside is invoked.
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside) // Ensures that the clickEventListener added in mounted is removed.
  },
  created() {
    this.isImageAvailable = this.checkImage()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/main.scss';

.ui-multi-dropdown-c {
  user-select: none;
  display: inline-block;
  justify-content: space-around;
  width: fit-content;
  height: fit-content;
  padding: 10px;

  .ui-multi-dropdown-c-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    width: fit-content;

    .label {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 15px;
      font-size: 16px;
      font-weight: 70;
      color: #333;
      text-align: left; //Left aligned
      align-self: flex-start; // Align label to the start
    }

    .ui-multi-dropdown-button {
      max-width: fit-content;
      padding: 8px; // smaller padding
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 10px; // smaller border-radius
      cursor: pointer;
      justify-content: space-between;
      align-items: center;
      display: flex;

      &.active {
        border: 1px solid #60acfe;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .placeholder-text {
        display: flex;
        flex-direction: row;
        font-size: 15px;
        // font-weight: bold;

        &:active {
          color: grey;
          font-weight: normal;
        }
      }

      .arrow {
        padding: 5px;

        &.up {
          transform: rotate(180deg);
        }
      }
    }

    .ui-multi-dropdown-menu {
      position: absolute;
      width: 10rem;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 0.2rem;
      padding-bottom: 0.5rem;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 12px;
      overflow-x: hidden;
      overflow-y: auto;
      z-index: 1000;
      box-shadow: 8px 10px 8px rgba(0, 0, 0, 0.1);

      .button-wrapper {
        display: flex;
        justify-content: center;
        background-color: #f8f9fa;
        padding: 0.25rem;

        .toggle {
          cursor: pointer;
          width: 100%;
          height: 100%;
          text-align: center;
          font-size: 10px;
          font-weight: 500;

          &:hover {
            filter: opacity(0.6);
          }
        }
      }

      .search-container {
        background-color: #fff;
        align-items: center;
        min-width: fit-content;

        .search-content-wrapper {
          display: flex;
          flex-direction: row;
          position: relative;
          box-sizing: border-box;
          margin: 10px;
          border-radius: 10px;
          border: 1px solid #ccc;
          align-items: center;

          .ui-multi-dropdown-search {
            max-width: fit-content;
            width: 100%;
            padding: 10px;
            border-radius: 10px;
            border: none;

            &:focus {
              outline: none;
            }
          }

          .clear-search {
            display: flex;
            align-items: center;
            padding-right: 1.25rem;
            height: 100%;
            width: 15%;

            .clear-search-img {
              position: absolute;
              cursor: pointer;
              width: 1rem;
              height: 1rem;

              &:hover {
                filter: opacity(0.5);
              }
            }
          }
        }
      }

      .ui-multi-dropdown-content {
        overflow-y: auto;

        .ui-multi-dropdown-item {
          display: flex;
          align-items: center;
          padding: 8px;
          font-size: 12px;
          cursor: pointer;
          transition: background-color 0.3s;
          height: 1rem;

          &:hover {
            background-color: #f3f3f3;
          }

          &.selected {
            text-shadow: 0 0 0.75px black;
          }

          .item-text {
            flex-grow: 1;
          }

          .item-container {
            display: flex;
            width: 100%;
            align-items: center;
            height: 100%;
            flex-shrink: 0;

            .image-label-wrapper {
              height: 100%;
              width: 90%;
              align-items: center;
              display: flex;
              justify-content: start;
              flex-shrink: 0;

              .dropdown-item-img {
                width: 16px;
                height: 16px;
                padding-right: 10px;
                justify-self: end;
                display: none;
                align-items: center;

                .svg-icon-c {
                  width: 16px;
                  height: 16px;
                  padding: 0;
                }

                &.isVisible {
                  display: inline-block;
                  align-items: center;
                }

                &.visibleIcon {
                  visibility: hidden;
                  align-items: center;
                }
              }
            }
          }

          .circle {
            height: 12px;
            width: 12px;
            background-color: red;
            border-radius: 100%;
            display: inline-block;
            justify-self: end;
            margin-left: auto;
            flex-shrink: 0;

            &.flight {
              background-color: $primary-color;
            }

            &.hotel {
              background-color: $secondary-color;
            }
          }
        }
      }
    }
  }
}
</style>
