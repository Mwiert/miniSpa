<template>
  <div class="ui-dropdown-c">
    <label class="label">{{ label }}</label>
    <button
      @click="toggleDropdown"
      :class="{ 'ui-dropdown-button-active': isOpen }"
      class="ui-dropdown-button"
    >
      <span :class="{ 'placeholder-text-active': !selectedItem }" class="placeholder-text">
        {{ selectedItem || placeHolder }}
      </span>
      <span class="arrow" :class="{ 'arrow-up': isOpen }"></span>
    </button>
    <div v-if="isOpen" class="ui-dropdown-menu">
      <div class="search-container" v-if="searchable">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search..."
          class="ui-dropdown-search"
        />
        <span v-if="searchQuery" class="clear-search" @click="clearSearch">×</span>
      </div>
      <div class="dropdown-list" :style="{ maxHeight: dropdownListMaxHeight }">
        <div
          v-for="item in filteredItems"
          :key="item"
          @click="selectItem(item)"
          class="ui-dropdown-item"
          :style="{ fontSize: fontSize }"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UIDropdown',
  data() {
    return {
      //selectedItem: this.initialSelectedItem as string | null,  // represents the currently selected item.
      isOpen: false, // checks if our dropdown open or not.
      searchQuery: '' // when we search for an item this will fill up.
    }
  },
  props: {
    dataSize: {
      type: Number, // how many data will shown in the dropdown
      default() {
        return this.items.length
      },
      required: false
    },
    label: {
      // label on the dropdown to understand what the dropdown contents are.
      type: String,
      default: ''
    },
    initialSelectedItem: {
      // represents the currently selected item.
      type: String,
      default: null
    },
    placeHolder: {
      // placeHolder before the selection.
      type: String,
      default: 'Select an option'
    },
    searchable: {
      // in many results user can find what he/she looks for.
      type: Boolean,
      default: true
    },
    items: {
      type: Array as () => string[],
      required: true
    },
    fontSize: {
      // defined fontsize shown in the dropdown.
      type: String,
      default: '12px'
    }
  },
  computed: {
    filteredItems(): string[] {
      return this.items.filter((item) =>
        item.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
    dropdownListMaxHeight() {
      const itemHeight = 30
      const searchBoxHeight = this.searchable ? 10 : 0
      //const maxHeight = itemHeight * (this.dataSize || this.items.length) + searchBoxHeight
      const maxHeight = itemHeight * this.dataSize + searchBoxHeight
      return `${maxHeight}px`
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    selectItem(item: string) {
      this.selectedItem = item
      this.isOpen = false
      this.$emit('update:selectedItem', item)
    },
    handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement
      if (!this.$el.contains(target)) {
        this.isOpen = false
      }
    },
    clearSearch(event: Event) {
      this.searchQuery = ''
      event.stopPropagation()
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>

<style lang="scss" scoped>
.ui-dropdown-c {
  position: relative;
  display: inline-block;
  display: flex;
  flex-direction: column;
  max-width: fit-content;

  .ui-dropdown-button {
    min-width: 230px;
    padding: 15px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;

    &-active {
      border: 2px solid #60acfe;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .placeholder-text {
      display: flex;
      font-size: 17px;

      &-active {
        color: grey;
        font-weight: normal;
      }
    }

    .arrow {
      position: absolute;
      top: 63%;
      right: 15px;
      padding: 5px;
      border: solid black;
      border-width: 0 2px 2px 0;
      display: inline-block;
      transform: rotate(45deg);

      &-up {
        transform: rotate(-135deg);
      }
    }
  }

  .ui-dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 12px;
    overflow: hidden;
    z-index: 1000;
    box-shadow: 8px 10px 8px rgba(0, 0, 0, 0.1);
  }

  .search-container {
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 10;

    .ui-dropdown-search {
      width: 90%;
      padding: 12px;
      box-sizing: border-box;
      margin: 14px;
      border-radius: 18px;
      border: 1px solid #ccc;
      outline: none;
    }

    .clear-search {
      position: absolute;
      right: 15px;
      top: 21px;
      transform: translateY(-50%, -50%);
      cursor: pointer;
      font-size: 25px;
      color: #ccc;
      width: 25px;
      height: 25px;
      background-color: #585858;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .dropdown-list {
    overflow-y: auto;
  }

  .ui-dropdown-item {
    padding: 8px;
    padding-left: 15px;
    cursor: pointer;

    &:hover {
      font-weight: bold;
      background-color: #f3f3f3;
    }
  }
}
</style>
