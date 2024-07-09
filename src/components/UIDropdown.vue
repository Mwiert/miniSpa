<template>
  <div class="dropdown-c" >
    <label for="airlines">
      <div class="dropdown-select" @click="toggleDropdown">
        <span :class="['title', { 'placeholder': !selectedAirline }]">{{ selectedAirlineName || placeHolder }}</span>
        <span class="arrow" :class="{'arrow-up': isOpen}"></span>
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
    placeHolder: { type: String, default: ' Select' },
    searchable: { type: Boolean, default: false },

  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
      selectedAirline = selectedAirlineName;
    },
    sendItem(item) {
      this.$emit('sendItem', item);
      this.isOpen = false;
    }
  }
}
</script>

<style>

.dropdown-c{
  border: #b1b1b1;
}

.dropdown-select {
  position: relative;
  display: inline-block;
  color: rgba(255, 255, 255, 0.816);
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: rgba(217, 217, 217, 0.729);
  border: 1px solid rgba(80, 79, 79, 0.234); /* This is the inner border */
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
  background-color: #363636;
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
  color: #363636;
}

.arrow {
  margin-left: 15px;
  border: solid black;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 5px;
  transform: rotate(45deg);
  justify-content: center;
}

.arrow-up {
  transform: rotate(-135deg);
}

</style>