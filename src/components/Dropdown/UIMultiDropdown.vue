<template>
  <div class="ui-multi-dropdown-c">
    <div class="ui-multi-dropdown-c-wrapper">
      <label class="label" v-if="label?.length !== 0">{{ label }}</label>
      <button @click="toggleDropdown" class="ui-multi-dropdown-button" :class="{ active: isOpen }">
        <div class="placeholder-text">{{ labelDisplay }}</div>
        <SvgIcon class="arrow" :class="{ up: isOpen }" :name="'arrow-down'" :size="'s'" />
      </button>
      <div v-if="isOpen" class="ui-multi-dropdown-menu" :style="{ fontSize: fontSize + 'px' }">
        <div class="search-container">
          <div v-if="searchable" class="search-content-wrapper">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search..."
              class="ui-multi-dropdown-search" />
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
        <div class="button-wrapper" v-if="hasActionBox">
          <span class="toggle" @click="selectAll">Select All</span>
          <span class="toggle" @click="dropAll">Drop All</span>
        </div>
        <div
          class="ui-multi-dropdown-content"
          :style="{ fontSize: fontSize + 'px', maxHeight: dropdownListMaxHeight }">
          <div
            v-for="(item, index) in filteredItems()"
            :key="index"
            class="ui-multi-dropdown-item"
            @click.stop="selectItem(item)"
            :class="{ selected: isSelected(item) }">
            <div v-if="this.isSelected(item)" class="item-container">
              <div class="image-label-wrapper">
                <img
                  :src="item[urlField]"
                  alt=""
                  class="dropdown-item-img"
                  :class="{ isVisible: isImageAvailable, visibleIcon: !checkItem(item) }" />
                <span class="item-name"> {{ isLongItem(item) }}</span>
              </div>

              <span :class="['circle', className ? `${className}` : '']"> </span>
            </div>
            <div v-else class="item-container">
              <div class="image-label-wrapper">
                <img
                  :src="item[urlField]"
                  alt=""
                  class="dropdown-item-img"
                  :class="{ isVisible: isImageAvailable, visibleIcon: !checkItem(item) }" />
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
import SvgIcon from '../SvgIcon.vue'

export default {
  name: 'UIMultiDropDown',
  components: {
    SvgIcon
  },
  props: {
    items: {
      // items in the database.
      type: Array,
      required: true,
      default: () => []
    },
    primaryKey: {
      type: String,
      required: true,
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
      type: Array,
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

    urlField: {
      // picture of the object taken here
      type: String,
      default: ''
    },
    sortField: {
      type: String
    },
    sortByAscending: {
      type: Boolean,
      default: false
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
      return this.dataSize !== null ? this.dataSize : this.items.length
    },
    dropdownListMaxHeight(): String {
      const itemHeight = 30
      const maxHeight = itemHeight * this.computedDataSize
      return `${maxHeight}px`
    },
    labelDisplay(): String {
      if (this.selectedItems.length === 0) {
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
    sortItems(items: Array<any>): Array<any> {
      return items.sort((a, b) => {
        const aValue = a[this.sortField].toLowerCase()
        const bValue = b[this.sortField].toLowerCase()
        if (aValue < bValue) return this.sortByAscending ? -1 : 1
        if (aValue > bValue) return this.sortByAscending ? 1 : -1
        return 0
      })
    },
    filteredItems(): Array<any> {
      let items = this.dropdownItems.filter((item) =>
        String(item[this.displayField]).toLowerCase().includes(this.searchQuery.toLowerCase())
      )
      if (this.sortField) {
        items = this.sortItems(items)
      }
      return items
    },
    isLongItem(item) {
      if (item[this.displayField] !== undefined && String(item[this.displayField]).length > 15) {
        return String(item[this.displayField]).substring(0, 15) + '...'
      } else if (item[this.displayField] === undefined) return item[this.displayField]
      return String(item[this.displayField])
    },
    checkItem(item) {
      return item[this.urlField] !== '' && item[this.urlField] !== undefined
    },
    checkImage() {
      for (let i = 0; i < this.dropdownItems.length; i++) {
        if (
          this.dropdownItems[i][this.urlField] !== '' &&
          this.dropdownItems[i][this.urlField] !== undefined
        ) {
          return true
        }
      }
      return false
    },
    isSelected(item) {
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

        this.$nextTick(() => {
          if (this.sortField && this.sortByAscending) {
            let itemsCopy = [...this.dropdownItems].sort().reverse()
            const selectedIndex = itemsCopy.indexOf(this.selectedItem)
            const selectedItemRef = this.$refs['item-' + selectedIndex]

            if (selectedItemRef && selectedItemRef[0]) {
              selectedItemRef[0].scrollIntoView({ behavior: 'instant', block: 'center' })
            }
          } else if (this.sortField) {
            let itemsCopy = [...this.dropdownItems].sort()
            const selectedIndex = itemsCopy.indexOf(this.selectedItem)
            const selectedItemRef = this.$refs['item-' + selectedIndex]

            if (selectedItemRef && selectedItemRef[0]) {
              selectedItemRef[0].scrollIntoView({ behavior: 'instant', block: 'center' })
            }
          }
        })
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
      if (!this.$el.contains(target)) {
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
      padding-bottom: 1rem;
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

            .image-label-wrapper {
              height: 100%;
              width: 100%;
              align-items: center;
              display: flex;
              justify-content: start;

              .dropdown-item-img {
                width: 12px;
                height: 12px;
                padding-right: 10px;
                justify-self: end;
                display: none;
                align-items: center;

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
