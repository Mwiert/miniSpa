<template>
  <div class="ui-dropdown-c">
    <label class="label">{{ label }}</label>
    <button
      @click="toggleDropdown"
      :class="{ 'ui-dropdown-button-active': isOpen }"
      class="ui-dropdown-button"
    >
      <span
        :class="{ 'placeholder-text-active': !selectedItem[displayField] }"
        class="placeholder-text"
      >
    <button @click="toggleDropdown" class="ui-dropdown-button" :class="{ active: isOpen }">
      <span
        :class="{ 'placeholder-text-active': !selectedItem[displayField] }"
        class="placeholder-text"
      >
        {{ selectedItem[displayField] || placeHolder }}
      </span>

      <SvgIcon class="arrow" :class="{ up: isOpen }" :name="'arrow-down'" :size="'s'" />
    </button>
    <div v-if="isOpen" class="ui-dropdown-menu" :style="{ fontSize: fontSize + 'px' }">
      <div class="search-container">
        <input
          v-if="searchable"
          type="text"
          v-model="searchQuery"
          placeholder="Search..."
          class="ui-dropdown-search"
        />
        <span class="clear-search">
          <SvgIcon
            v-if="searchQuery"
            @click="clearSearch"
            class="clear-search-img"
            :name="'x'"
            :size="'s'"
          />
        </span>
      </div>
      <div
        class="ui-dropdown-content"
        :style="{ fontSize: fontSize + 'px', maxHeight: dropdownListMaxHeight }"
      >
        <div
          v-for="item in filteredItems"
          :key="item[idField]"
          class="ui-dropdown-item"
          @click="selectItem(item)"
          :class="{ selected: selectedItem == item }"
        >
        <div class="search-content-wrapper">
          <input
            v-if="searchable"
            type="text"
            v-model="searchQuery"
            placeholder="Search..."
            class="ui-dropdown-search"
            @input="filteredItems()"
          />
          <span class="clear-search">
            <SvgIcon
              v-if="searchQuery"
              @click="clearSearch"
              class="clear-search-img"
              :name="'x'"
              :size="'s'"
            />
          </span>
        </div>
      </div>
      <div
        class="ui-dropdown-content"
        :style="{ fontSize: fontSize + 'px', maxHeight: dropdownListMaxHeight }"
      >
        <div
          v-for="(item, index) in filteredItems()"
          :key="index"
          class="ui-dropdown-item"
          @click="selectItem(item)"
          :class="{ selected: isSelected(item) }"
        >
          <!-- <img v-if="item[urlField]" :src="item[urlField]" alt="" class="dropdown-item-img" /> -->
          <span>{{ item[displayField] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SvgIcon from './SvgIcon.vue'

export default {
  name: 'UIDropdown',
  components: {
    SvgIcon
  },
  props: {
    items: {
      // items in the database.
    modelValue: {
      type: Object,
      default: () => ({})
    },
    items: {
      // items in the database.
      type: Array,
      required: true,
      default: () => []
    },
    label: {
      // label on the dropdown to understand what the dropdown contents are.
      type: String,
      required: true
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
    value: {
      // chosen object becomes the value.
      type: Object,
      default: () => ({})
    },
    idField: {
      //takes the id according to the value
      type: String,
      default: 'id'
    },
    displayField: {
      // takes the name of the chosen id

    displayField: {
      // takes the name of the chosen id
      type: String,
      default: 'name'
    },
    urlField: {
      // picture of the object taken here
      type: String,
      default: 'url'
    },
    dataSize: {
      // how many data will shown in the dropdown.
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isOpen: false, // checks that if drowdown is open or not.
      searchQuery: '', // when the user input text, it comes to the searchQuery.
      selectedItem: this.value // represents the currently selected item.
    }
      isOpen: false, // checks that if drowdown is open or not.
      searchQuery: '', // when the user input text, it comes to the searchQuery.
      selectedItem: this.modelValue, // represents the currently selected item.
      dropdownItems: this.items
    }
  },
  computed: {
    filteredItems() {
      // Filtered items according to the search query
      return this.items.filter((item) =>
        item[this.displayField].toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
    computedDataSize(): number {
      //if it is defined 'dataSize' if not 'itemLength'
    computedDataSize(): Number {
      //if it is defined 'dataSize' if not 'itemLength'
      return this.dataSize !== null ? this.dataSize : this.items.length
    },
    dropdownListMaxHeight(): String {
      const itemHeight = 30
      const searchBoxHeight = this.searchable ? 30 : 0
      const maxHeight = itemHeight * this.computedDataSize + searchBoxHeight
      return `${maxHeight}px`
    }
  },
  methods: {
    toggleDropdown() {
      //opens and closes the dropdown
      this.isOpen = !this.isOpen
    filteredItems(): Array<any> {
      return this.dropdownItems.filter((item) =>
        item[this.displayField].toLowerCase().startsWith(this.searchQuery.toLowerCase())
      )
    },
    isSelected(item) {
      return this.selectedItem === item
    },
    selectItem(item) {
      this.selectedItem = item ? item : {}
      this.$emit('update:modelValue', item)
      this.isOpen = false
      this.dropdownItems = this.items
    },
    toggleDropdown() {
      //opens and closes the dropdown
      this.isOpen = !this.isOpen
    },
    clearSearch(event: Event) {
      // clears the searchQuery
      this.searchQuery = ''
      event.stopPropagation() // Prevent dropdown from closing
    },
    selectItem(item) {
      // takes the clicked item and starts the emit.
      this.selectedItem = item
      this.$emit('input', item)
      this.isOpen = false
    },
    handleClickOutside(event: MouseEvent) {
      // when clicked out of the dropdown, dropdownMenu closes.
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
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  .label {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    font-size: 16px;
    font-weight: 70;
    color: #333;
    margin-bottom: 5px;
    text-align: left; //Left aligned
    align-self: flex-start; // Align label to the start
    text-align: left; //Left aligned
    align-self: flex-start; // Align label to the start
  }

  .ui-dropdown-button {
    padding: 10px; // smaller padding
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
    max-height: 12rem;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 8px 10px 8px rgba(0, 0, 0, 0.1);
  }

  .search-container {
    position: relative;
    display: flex;
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 10;
    .search-container {
      background-color: #fff;
      align-items: center;
      min-width: fit-content;

    .ui-dropdown-search {
      width: 90%;
      padding: 10px;
      box-sizing: border-box;
      margin: 10px;
      border-radius: 10px;
      border: 1px solid #ccc;
      outline: none;
    }
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
      right: 10px;
      top: 8px;
      cursor: pointer;

      &-hover {
        opacity: 0.7;
      }
    }
    .dropdown-content {
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
      max-height: 200px;
      overflow-y: auto;
    }
  }

  .ui-dropdown-item {
    display: flex;
    align-items: center;
    padding: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
      .ui-dropdown-item {
        display: flex;
        align-items: center;
        padding: 8px;
        cursor: pointer;
        transition: background-color 0.3s;

    &:hover {
      background-color: #f3f3f3;
    }
    &.selected {
      font-weight: bold;
    }
  }
}
.ui-dropdown-search {
  width: 90%;
  border: 1px solid #ccc;
}
.ui-dropdown-c-label {
  margin-bottom: 10px; //Adds space below the label
}
.label {
  display: flex;
  justify-content: center;
  align-items: center;
}
        &:hover {
          background-color: #f3f3f3;
        }
        &.selected {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
