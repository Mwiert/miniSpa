<template>
  <div class="ui-dropdown-c">
    <label class="ui-dropdown-label">{{ label }}</label>
    <button
      @click="toggleDropdown"
      :class="{ 'ui-dropdown-button-active': isOpen }"
      class="ui-dropdown-button"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
    >
      <span :class="{ 'placeholder-text': !selectedItem }">
        {{ selectedItem || placeHolder }}
      </span>
      <span class="arrow" :class="{ 'arrow-up': isOpen }"></span>
    </button>
    <div v-if="isOpen" class="dropdown-menu" role="listbox">
      <div class="search-container">
        <input
          v-if="searchable"
          type="text"
          v-model="searchQuery"
          placeholder="Search..."
          class="dropdown-search"
          aria-controls="dropdown-options"
        />
        <span v-if="searchQuery" class="clear-search" @click="clearSearch">×</span>
      </div>
      <div id="dropdown-options" role="optionlist">
        <div
          v-for="(item, index) in filteredItems"
          :key="index"
          @click="selectItem(item)"
          class="dropdown-item"
          role="option"
          :aria-selected="item === selectedItem"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DropdownComponent',

  props: {
    label: {
      type: String,
      default: 'Select an option'
    },
    initialSelectedItem: {
      type: String,
      default: null
    },
    placeHolder: {
      type: String,
      default: 'Select an Item'
    },
    searchable: {
      type: Boolean,
      default: true
    },
    items: {
      type: Array as () => string[]
    }
  },
  data() {
    return {
      selectedItem: this.initialSelectedItem as string | null,
      isOpen: false,
      searchQuery: ''
    }
  },
  computed: {
    filteredItems(): string[] {
      return this.items.filter((item: string) =>
        item.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
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
    clearSearch() {
      this.searchQuery = ''
    },
    handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement
      if (!this.$el.contains(target)) {
        this.isOpen = false
      }
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
  margin: 10px;

  .ui-dropdown-label {
    margin-bottom: 5px;
    display: block;
    font-weight: bold;
    color: #333;
    font-size: 12px;
  }

  .ui-dropdown-button {
    padding: 15px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-active {
      border: 1px solid #000;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .arrow {
      margin-left: 15px;
      border: solid black;
      border-width: 0 1px 1px 0;
      display: inline-block;
      padding: 5px;
      transform: rotate(45deg);

      &-up {
        transform: rotate(-135deg);
      }
    }

    .placeholder-text {
      color: #999; /* Faint color for placeholder */
    }
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #fff;
    border: 2px solid #ccc;
    border-radius: 8px;
    max-height: calc(7 * 50px);
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    .search-container {
      position: relative;

      .dropdown-search {
        width: 90%;
        padding: 10px;
        box-sizing: border-box;
        margin: 7px;
        border-radius: 10px;
        border: 2px solid #ccc;
        outline: none;
      }

      .clear-search {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        font-size: 25px;
        color: #ccc;
        width: 25px;
        height: 25px;
        background-color: #f0f0f0;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          color: #000;
        }
      }
    }

    .dropdown-item {
      padding: 10px;
      cursor: pointer;
      border-bottom: 1px solid #f0f0f0;

      &:hover {
        background-color: #f3f3f3;
      }
    }
  }

  .dropdown-search {
    width: 90%;
    padding: 10px;
    box-sizing: border-box;
    margin: 7px;
    border-radius: 10px;
    border: 2px solid #ccc;
    outline: none;
  }
}
</style>
