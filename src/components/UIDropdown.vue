<template>
  <div class="dropdown-c">
    <div class="dropdown">
      <button
        @click="toggleDropdown"
        :class="{ 'dropdown-button-active': isOpen }"
        class="dropdown-button"
      >
        {{ selectedItem || placeHolder }}
        <span class="arrow" :class="{ 'arrow-up': isOpen }"></span>
      </button>
      <div v-if="isOpen" class="dropdown-menu">
        <input
          v-if="searchable"
          type="text"
          v-model="searchQuery"
          placeholder="Search..."
          class="dropdown-search"
        />
        <div
          v-for="item in filteredItems"
          :key="item"
          @click="selectAirline(item)"
          class="dropdown-item"
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
  
  data() {
    return {
      selectedItem: this.initialSelectedItem as string | null,
      isOpen: false,
      searchQuery: '',
      items: {
        type: Array
      }
    }
  },
  props: {
    initialSelectedAirline: {             
      type: String,
      default: null
    },
    placeHolder: {
      type: String,
      default: 'Select'
    },
    searchable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    filteredItems(): string[] {
      return this.items.filter((items: string) =>
        items.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    selectAirline(item: string) {
      this.selectedItem = item
      this.isOpen = false
      this.$emit('update:selectedAirline', item)
    }
  }
}
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  margin: 10px;
}

.dropdown-button {
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown-button-active {
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
}

.arrow-up {
  transform: rotate(-135deg);
}

.dropdown-menu {
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
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
}

.dropdown-item:hover {
  background-color: #f3f3f3;
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
</style>
