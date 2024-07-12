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
        {{ selectedItem[displayField] || placeHolder }}
      </span>

      <SvgIcon class="arrow" :class="{ up: isOpen }" :name="'arrow-down'" :size="'s'" />
    </button>
    <div v-if="isOpen" class="ui-dropdown-menu">
      <div class="search-container">
        <span class="clear-search">
          <SvgIcon v-if="searchQuery" @click="clearSearch" class="clear-search-img" :name="'x'" />
        </span>
        <input
          v-if="searchable"
          type="text"
          v-model="searchQuery"
          placeholder="Search..."
          class="ui-dropdown-search"
        />
      </div>
      <div class="ui-dropdown-content" :style="{ maxHeight: dropdownListMaxHeight }">
        <div
          v-for="item in filteredItems"
          :key="item[idField]"
          class="ui-dropdown-item"
          @click="selectItem(item)"
          :class="{ selected: selectedItem == item }"
          :style="{ fontSize: fontSize }"
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
      type: Array,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    fontSize: {
      type: Number,
      default: 12
    },
    placeHolder: {
      type: String,
      default: 'Select an item'
    },
    searchable: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      default: () => ({})
    },
    idField: {
      type: String,
      default: 'id'
    },
    displayField: {
      type: String,
      default: 'name'
    },
    urlField: {
      type: String,
      default: 'url'
    },
    dataSize: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isOpen: false,
      searchQuery: '',
      selectedItem: this.value
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) =>
        item[this.displayField].toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
    computedDataSize(): number {
      return this.dataSize !== null ? this.dataSize : this.items.length
    },
    dropdownListMaxHeight() {
      const itemHeight = 10
      const searchBoxHeight = this.searchable ? 10 : 0
      const maxHeight = itemHeight * this.computedDataSize + searchBoxHeight
      return `${maxHeight}px`
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    clearSearch(event: Event) {
      this.searchQuery = ''
      event.stopPropagation() // Prevent dropdown from closing
    },
    selectItem(item) {
      this.selectedItem = item
      this.$emit('input', item)
      this.isOpen = false
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
  },
  watch: {
    value(newVal) {
      this.selectedItem = newVal
    }
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

  .label {
    margin-top: 15px;
    font-size: 16px;
    font-weight: 70;
    color: #333;
    margin-bottom: 5px;
    text-align: left; //Left aligned
    align-self: flex-start; // Align label to the start
    display: flex;
    justify-content: center;
  }

  .ui-dropdown-c-label {
    margin-bottom: 10px; //Adds space below the label
  }

  .ui-dropdown-button {
    padding: 10px; // smaller padding
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 10px; // smaller border-radius
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    display: flex;

    &-active {
      border: 2px solid #60acfe;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .placeholder-text {
      display: flex;
      font-size: 15px;

      &-active {
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
    top: 100%;
    left: 0;
    right: 0;
    padding-bottom: 17px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 12px;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 8px 10px 8px rgba(0, 0, 0, 0.1);

    .search-container {
      display: flex;
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
        right: 24px;
        top: 24px;
        transform: translateY(-50%, -50%);
        cursor: pointer;
        font-size: 20px;
        color: #cecaca;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: auto;
      }
    }

    .ui-dropdown-item {
      padding: 8px;
      padding-left: 15px;
      cursor: pointer;

      &:hover {
        background-color: #f3f3f3;
      }
      &.selected {
        font-weight: bold;
      }
    }
  }
}
</style>
