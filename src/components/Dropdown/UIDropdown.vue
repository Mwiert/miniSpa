<template>
  <div class="ui-dropdown-c">
    <div class="ui-dropdown-c-wrapper">
      <label class="label" v-if="label?.length !== 0">{{ label }}</label>
      <button @click="toggleDropdown" class="ui-dropdown-button" :class="{ active: isOpen }">
        <span
          :class="{ 'placeholder-text-active': !selectedItem[displayField] }"
          class="placeholder-text">
          {{ isLongItem(selectedItem) || placeHolder }}
        </span>
        <SvgIcon class="arrow" :class="{ up: isOpen }" :name="'arrow-down'" :size="'s'" />
      </button>
      <div v-if="isOpen" class="ui-dropdown-menu" :style="{ fontSize: fontSize + 'px' }">
        <div class="search-container">
          <div v-if="searchable" class="search-content-wrapper">
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
            v-for="(item, index) in filteredItems()"
            :key="index"
            :ref="'item-' + index"
            class="ui-dropdown-item"
            @click="selectItem(item)"
            :class="{ selected: isSelected(item) }">
            <div v-if="this.isSelected(item)" class="image-label-wrapper">
              <img
                :src="item[urlField]"
                alt=""
                class="dropdown-item-img"
                :class="{ isVisible: isImageAvailable, visibleIcon: !checkItem(item) }" />
              <span>{{ isLongItem(item) }}</span>
            </div>
            <div v-else class="image-label-wrapper">
              <img
                :src="item[urlField]"
                alt=""
                class="dropdown-item-img"
                :class="{ isVisible: isImageAvailable, visibleIcon: !checkItem(item) }" />
              <span>{{ isLongItem(item) }}</span>
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
  name: 'UIDropdown',
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

    urlField: {
      // picture of the object taken here
      type: String,
      default: ''
    },
    dataSize: {
      // how many data will shown in the dropdown.
      type: Number
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
    dropdownListMaxHeight(): String {
      const itemHeight = 30

      const maxHeight = itemHeight * this.computedDataSize
      return `${maxHeight}px`
    }
  },
  methods: {
    filteredItems(): Array<any> {
      return this.dropdownItems.filter((item) =>
        String(item[this.displayField]).toLowerCase().startsWith(this.searchQuery.toLowerCase())
      )
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
      return this.selectedItem[this.primaryKey] === item[this.primaryKey]
    },

    selectItem(item) {
      if (this.isSelected(item)) {
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
      if (this.isOpen) {
        this.clearSearch()

        this.$nextTick(() => {
          const selectedIndex = this.dropdownItems.indexOf(this.selectedItem)
          const selectedItemRef = this.$refs['item-' + selectedIndex]
          if (selectedItemRef && selectedItemRef[0]) {
            selectedItemRef[0].scrollIntoView({ behavior: 'instant', block: 'center' })
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
  },
  watch: {
    // watches the changes and updates the selectedItem.
    value(newVal) {
      this.selectedItem = newVal
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-dropdown-c {
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
      margin-top: 15px;
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

      &.active {
        border: 1px solid #60acfe;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .placeholder-text {
        display: flex;
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

    .ui-dropdown-menu {
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
          justify-content: start;

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
              width: 0.75rem;
              height: 0.75rem;
              padding-right: 10px;
              display: none;

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
