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
      <div class="search-container">
        <input
          v-if="searchable"
          type="text"
          v-model="searchQuery"
          placeholder="Search..."
          class="ui-dropdown-search"
        />
        <span v-if="searchQuery" class="clear-search" @click="clearSearch">×</span>
      </div>
      <div
        v-for="item in limitedItems"
        :key="item"
        @click="selectItem(item)"
        class="ui-dropdown-item"
        :style="{ fontSize: fontSize }"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UIDropdown',

  data() {
    return {
      selectedItem: this.initialSelectedItem as string | null,
      isOpen: false,
      searchQuery: ''
    }
  },
  props: {
    dataSize: {
      type: Number,
      default: 10
    },
    label: {
      // label on the dropdown to understand what the dropdown contents are.
      type: String,
      default: ''
    },
    initialSelectedItem: {
      type: String,
      default: null
    },
    placeHolder: {
      type: String,
      default: 'Select an option'
    },
    searchable: {
      type: Boolean,
      default: true
    },
    items: {
      type: Array as () => string[],
      required: true
    },
    fontSize: {
      type: String,
      default: '12px'
    }
  },
  computed: {
    filteredItems(): string[] {
      return this.items.filter((item: string) =>
        item.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
    limitedItems(): string[] {
      return this.filteredItems.slice(0, this.dataSize)
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
      event.stopPropagation() // Prevent dropdown from closing
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
  margin-top: 320px;
  margin-left: 400px;
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
      // font-weight: bold;

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
    padding-bottom: 17px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 12px;
    max-height: 300px;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 8px 10px 8px rgba(0, 0, 0, 0.1);

    .search-container {
      position: relative;

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

    .ui-dropdown-item {
      padding: 8px;
      padding-left: 15px;
      //font-size: 15px;
      cursor: pointer;

      &:hover {
        font-weight: bold;
        background-color: #f3f3f3;
      }
    }
  }
}
</style>
