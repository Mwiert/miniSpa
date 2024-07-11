<template>
  <div class="ui-dropdown-c">
    <label class="label">{{ label }}</label>
    <button
      @click="toggleDropdown"
      :class="{ 'ui-dropdown-button-active': isOpen }"
      class="ui-dropdown-button"
    >
      <span :class="{ 'placeholder-text-active': !selectedItem[displayField] }" class="placeholder-text">
        {{ selectedItem[displayField] || placeHolder }}
      </span>
      <span class="arrow" :class="{ 'arrow-up': isOpen }"></span>
    </button>
    <div v-if="isOpen" class="ui-dropdown-menu" :style="{ fontSize: fontSize + 'px' }">
      <div class="search-container">

          <span class="clear-search" > 
          <img v-if="searchQuery" @click="clearSearch" class="clear-search-img" :src="photo">
          </span>
               
        <input
          v-if="searchable"
          type="text"
          v-model="searchQuery"
          placeholder="Search..."
          class="ui-dropdown-search"
        />

        </div>
      <div class="ui-dropdown-content" :style="{fontSize: fontSize + 'px' , maxHeight: dropdownListMaxHeight}"  >
        <div v-for="item in filteredItems" :key="item[idField]" class="ui-dropdown-item" @click="selectItem(item)">
          <!-- <img v-if="item[urlField]" :src="item[urlField]" alt="" class="dropdown-item-img" /> -->
          <span>{{ item[displayField] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import pp from '../assets/icons/x.svg'

export default {
  name: 'UIDropdown',
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
      default: 14
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
    dataSize:{
      type: Number,
      required: true
    }

  },
  data() {
    return {
      isOpen: false,
      searchQuery: '',
      selectedItem: this.value,
      photo:pp
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => item[this.displayField].toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
    computedDataSize(): number {
      return this.dataSize !== null ? this.dataSize : this.items.length
    },
    dropdownListMaxHeight() {
      const itemHeight = 30
      const searchBoxHeight = this.searchable ? 30 : 0
      const maxHeight = itemHeight * this.computedDataSize + searchBoxHeight
      return `${maxHeight}px`
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    clearSearch(event: Event) {
      this.searchQuery = '';
      event.stopPropagation() // Prevent dropdown from closing
    },
    selectItem(item) {
      this.selectedItem = item;
      this.$emit('input', item);
      this.isOpen = false;
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
      this.selectedItem = newVal;
    }
  }
};
</script>

<style lang="scss" scoped>
.ui-dropdown-c {
  position: relative;
  display: inline-block;
  display: flex;
  flex-direction: column;
  max-width: fit-content;
  
.label{
    font-size: large;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Arial, sans-serif; /* Font family */
  font-size: 16px;                /* Font size */
  font-weight: bold;             /* Font weight */
  color: #333;                   /* Font color */
  }
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
      font-size: 15px;
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
      //font-size: 15px;
      cursor: pointer;

      &:hover {
        font-weight: bold;
        background-color: #f3f3f3;
      }
    }
  }

  .ui-dropdown-search {
   width: 90%;
   padding: 10px;
   box-sizing: border-box;
   margin: 7px;
   border-radius: 10px;
   border: 2px solid #ccc;
    outline: none;
  }
  .ui-dropdown-c-label{
    margin-bottom: 10px; /* Adds space below the label */
  }
  .label{
    display: flex;
    justify-content: center;
    align-items: center;
  }

}
</style>
