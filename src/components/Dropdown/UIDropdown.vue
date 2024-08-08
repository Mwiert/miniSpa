<template>
  <div class="ui-dropdown-c">
    <div class="ui-dropdown-c-wrapper">
      <label class="label" v-if="label?.length !== 0">{{ label }}</label>
      <div
        @click="toggleDropdown"
        class="ui-dropdown-button"
        :class="{ active: isOpen && !disabled, disabled: disabled }">
        <span class="placeholder-text">
          {{ isLongItem(selectedItem) || placeHolder }}
        </span>
        <SvgIcon
          class="arrow"
          :class="{ up: isOpen && !disabled }"
          :name="'arrow-down'"
          :size="'s'" />
      </div>

      <div
        v-if="isOpen && !disabled"
        class="ui-dropdown-menu"
        :style="{ fontSize: fontSize + 'px' }">
        <div v-if="searchable" class="search-container">
          <div class="search-content-wrapper">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search..."
              class="ui-dropdown-search" />
            <span class="clear-search">
              <SvgIcon
                v-if="searchQuery"
                @click.stop="clearSearch"
                class="clear-search-img"
                :name="'x'"
                :size="'s'" />
            </span>
          </div>
        </div>
        <div
          class="ui-dropdown-content"
          :style="{ fontSize: fontSize + 'px', maxHeight: dropdownListMaxHeight }">
          <div
            v-for="item in filteredItems()"
            :key="item[primaryKey]"
            :ref="'item-' + item[primaryKey]"
            class="ui-dropdown-item"
            @click="selectItem(item)"
            :class="{ selected: isSelected(item) }">
            <div class="image-label-wrapper">
              <div
                class="dropdown-item-img"
                :class="{ isVisible: isImageAvailable, visibleIcon: !checkItem(item) }">
                <SvgIcon :name="item[iconImage]" :size="'s'" />
              </div>
              <span>{{ isLongItem(item) }}</span>
            </div>

            <SvgIcon
              v-if="unselectable && isSelected(item)"
              :name="'x'"
              :size="'s'"
              class="unselectable-icon" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UIDropdown',
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

    modelValue: {
      type: Object,
      default: () => ({})
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
      type: String,
      default: 'Select an item'
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

    dataSize: {
      // how many data will shown in the dropdown.
      type: Number
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
      default: 'iconImage'
    },
    unselectable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpen: false, // checks that if drowdown is open or not.
      searchQuery: '', // when the user input text, it comes to the searchQuery.
      selectedItem: this.modelValue, // represents the currently selected item.
      dropdownItems: this.items,
      isImageAvailable: false
    }
  },
  computed: {
    computedDataSize(): Number {
      //if it is defined 'dataSize' if not 'itemLength'
      return this.dataSize !== null ? this.dataSize : this.items.length
    },
    dropdownListMaxHeight(): string {
      //sets the height of dropdown content
      const itemHeight = 30

      const maxHeight = itemHeight * this.computedDataSize
      return `${maxHeight}px`
    }
  },
  methods: {
    //sorts items by ascending or descending
    sortItems(items: Array<any>): Array<any> {
      if (this.sortField === undefined) {
        return items
      } else {
        return items.sort((a, b) => {
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

    createItemDropdown(): Array<Object> {
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

      return items
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
      return this.selectedItem[this.primaryKey] === item[this.primaryKey]
    },

    selectItem(item) {
      if (this.isSelected(item) && this.unselectable) {
        this.selectedItem = {}
      } else {
        this.selectedItem = item
      }
      this.$emit('update:modelValue', this.selectedItem)
      this.isOpen = false
      this.dropdownItems = this.items
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen
      if (this.isOpen && !this.disabled) {
        this.clearSearch()

        this.$nextTick(() => {
          const dropdownMenu = this.$el.querySelector('.ui-dropdown-menu')
          const rect = dropdownMenu.getBoundingClientRect()
          const windowHeight = window.innerHeight || document.documentElement.clientHeight

          if (rect.bottom > windowHeight) {
            // if the dropdown menu is out of the window, it will be shown above.
            dropdownMenu.classList.add('above')
          } else {
            // if the dropdown menu is in the window, it will be shown below.
            dropdownMenu.classList.remove('above')
          }

          for (let i = 0; i < this.dropdownItems.length; i++) {
            if (this.isSelected(this.dropdownItems[i])) {
              const selectedItemRef = this.$refs['item-' + this.selectedItem[this.primaryKey]]
              if (selectedItemRef && selectedItemRef[0]) {
                selectedItemRef[0].scrollIntoView({
                  behavior: 'instant',
                  block: 'nearest',
                  inline: 'nearest'
                })
              }
              break
            }
          }
        })
      } else {
        this.clearSearch()
      }
    },
    clearSearch() {
      // clears the searchQuery
      this.searchQuery = ''
    },
    handleClickOutside(event: MouseEvent) {
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
.ui-dropdown-c {
  user-select: none;
  display: inline-block;
  justify-content: space-around;
  width: fit-content;
  padding: 10px;

  .ui-dropdown-c-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    width: fit-content;

    .label {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-weight: 70;
      color: #333;
      text-align: left; //Left aligned
      align-self: flex-start; // Align label to the start
    }

    .ui-dropdown-button {
      max-width: fit-content;
      padding: 8px; // smaller padding
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 10px; // smaller border-radius
      cursor: pointer;
      justify-content: space-between;
      align-items: center;
      display: flex;
      &.disabled {
        cursor: not-allowed;
        background-color: gray;
        border: none;
        opacity: 0.8;
      }
      &.active {
        border: 1px solid #60acfe;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .placeholder-text {
        display: flex;
        font-size: 15px;
        // font-weight: bold;
      }

      .arrow {
        padding: 5px;

        &.up {
          transform: rotate(180deg);
        }
      }
    }

    .ui-dropdown-menu {
      position: absolute;
      width: 10rem;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 0.2rem;
      padding-bottom: 1rem;
      padding-top: 0.5rem;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 12px;
      overflow-x: hidden;
      overflow-y: auto;
      z-index: 1000;
      box-shadow: 8px 10px 8px rgba(0, 0, 0, 0.1);
      bottom: auto;

      &.above {
        top: auto;
        bottom: 80%;
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

          .ui-dropdown-search {
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

      .ui-dropdown-content {
        overflow-y: auto;

        .ui-dropdown-item {
          display: flex;
          align-items: center;
          padding: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
          justify-content: space-between;
          .unselectable-icon {
            width: 16px;
            height: 16px;
            position: relative;
            right: -0.5rem;
          }
          &:hover {
            background-color: #f3f3f3;
          }

          &.selected {
            text-shadow: 0 0 0.75px black;
          }

          .image-label-wrapper {
            display: flex;
            align-items: center;
            justify-content: start;

            .dropdown-item-img {
              width: 16px;
              height: 16px;
              padding-right: 10px;
              display: none;

              .svg-icon-c {
                width: 16px;
                height: 16px;
                padding: 0;
              }

              &.isVisible {
                display: inline-block;
              }

              &.visibleIcon {
                visibility: hidden;
              }
            }
          }
        }
      }
    }
  }
}
</style>
