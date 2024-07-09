<template>
  <div>
    <label for="airlines">
      <div class="dropdown-select" @click="toggleDropdown">
        <span :class="['title', { 'placeholder': !selectedAirline }]">{{ selectedAirlineName || placeHolder }}</span>
        <span v-if="isOpen">&#9650;</span> <!-- Up arrow -->
        <span v-else>&#9660;</span> <!-- Down arrow -->
    </div>
    </label>
    
    <div :class="['dropdown-menu', { show: isOpen }]">
      <div v-for="(item, index) in items" :key="index" class="dropdown-option" @click="sendItem(item)">
        <span class="airlineName">{{ item.airlineLabel }} {{ item.airlineBrand }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UIDropdown',
  data() {
    return {
      isOpen: false
    }
  },
  props: {
    items: { type: Array, required: true },
    selectedItem: { type: Object, default: null },
    selectedItems: { type: Array, default: () => [] },
    placeHolder: { type: String, default: 'Select an airline' },
    searchable: { type: Boolean, default: false }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    sendItem(item) {
      this.$emit('sendItem', item);
      this.isOpen = false;
    }
  }
}
</script>

<style scoped>
.dropdown-select {
  position: relative;
  display: inline-block;
  margin: 10px;
  
}
.dropdown-select:hover {
  background-color: #b6b6bc;
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
</style>
