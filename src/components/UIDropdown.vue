<template>
  <div class="ui-dropdown-c">
    <label>
      {{ label }}
    </label>
      <button
        @click="toggleDropdown"
        :class="{ 'ui-dropdown-button-active': isOpen }"
        class="ui-dropdown-button"
      >
        {{ selectedItem || placeHolder }}
        <span class="arrow" :class="{ 'arrow-up': isOpen }"></span>   
      </button>
      <div v-if="isOpen" class="ui-dropdown-menu">
        <input
          v-if="searchable"
          type="text"
          v-model="searchQuery"
          placeholder="Search..."
          class="ui-dropdown-search"
        />
        <div
          v-for="item in filteredItems"
          :key="item"
          @click="selectItem(item)"
          class="ui-dropdown-item"
        >
          {{ item }}
        </div>
      </div>
  </div>
</template>


<script lang="ts">

export default {
  name: 'DropdownComponent',
  
  data() {
    return {
      selectedItem: this.initialSelectedItem as string | null,  // represents the currently selected item.
      isOpen: false,      // checks if our dropdown open or not.
      searchQuery: ''     // when we search for an item this will fill up.
    }
  },
  props: {
    dataSize: {           // how many data will shown in the dropdown.

    },
    label: {              // label on the dropdown to understand what the dropdown contents are.
      type: String,
      default: 'airline : '
    },
    initialSelectedItem: {             // represents the currently selected item.
      type: String,
      default: null
    },
    placeHolder: {                     // placeHolder before the selection.
      type: String,
      default: 'Select an option'
    },
    searchable: {                      // in many results user can find what he/she looks for.
      type: Boolean,
      default: true
    },
    items: {                           // items in the database.
        type: Array as () => string[]
      },

  },
  computed: {
     filteredItems(): string[] {                                    // filters according to the users input.
       return this.items.filter((item: string) =>
         item.toLowerCase().includes(this.searchQuery.toLowerCase())
       )
     }
  },
  methods: {
    toggleDropdown() {                                 // closes and opens the dropdown menu onClick.
      this.isOpen = !this.isOpen
    },
    selectItem(item: string) {                         // emits the selected item.
      this.selectedItem = item
      this.isOpen = false
      this.$emit('update:selectedItem', item)
    },
    handleClickOutside(event: MouseEvent) {            // if user clicks anywhere but the dropdown , dropdown closes.
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
  max-width: fit-content;
  .ui-dropdown-button {
    display: flex;
    min-width: 150px;
    padding: 15px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
    cursor: pointer;
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
  }

  .ui-dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #fff;
    border: 2px solid #ccc;
    border-radius: 8px;
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    .search-container {
      position: relative;

      .ui-dropdown-search {
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
        top: 13px;
        transform: translateY(-50%, -50%);
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

    .ui-dropdown-item {
      padding: 10px;
      cursor: pointer;
      border-bottom: 1px solid #f0f0f0;

      &:hover {
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
}
</style>
