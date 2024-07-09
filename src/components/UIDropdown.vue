<template>
  <div class="UIDropdown-c">
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

<style>
.dropdown-select {
  position: relative;
  display: inline-block;
  background-color: #9ea2a5;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dropdown-select:hover {
  background-color: #b6b6bc;
}

.dropdown-menu {
  display: none;
  position: absolute;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  min-width: 200px;
  z-index: 1;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 5px;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-option {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.dropdown-option:hover {
  background-color: #f1f1f1;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-menu.show {
  animation: slideDown 0.3s ease;
}
.title.placeholder{
  color: black
}
</style>