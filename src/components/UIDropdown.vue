<template>
<div class="dropdown-wrapper">
<div class="dropdown-selected-item">
  {{  selectedItem || 'Please select something' }}
</div>
<div class="items-wrapper">
  <div class="item" v-for="item in items " :key="index">
    {{ item }}
  </div>
</div>
</div>
</template>

<script lang="ts">

export default {
name: 'UIDropdown',
props: {
items: { type: Array },
selectedItem: {  },
selectedItem: {  },
placeHolder: {  }

},
data() {
return {
  isOpen: false,
  }
      
},
created() {},
mounted() {},
methods: {
toggleDropdown() {
  this.isOpen = !this.isOpen;
},
sendItem(items) {
  this.$emit('sendItem',items)
}
},
computed: {
airlineName() {
  return this.items.airlineLabel + " " + this.items.airlineBrand
}
}
}

</script>

<style>

.dropdown-wrapper {
  padding: 16px;
  cursor: pointer;
  max-width: 200px;
  margin: 0 auto;
}

.dropdown-selected-item {
  padding: 16px;
  border: solid 1px #313131;
  border-radius: 8px;
  box-sizing: border-box;
  margin-bottom: 4px;
}

.options-wrapper {
display: none;
position: absolute;
background-color: white;
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
min-width: 160px;
z-index: 1;
border-radius: 5px;
overflow: hidden;
}
.item:hover{
  background: #c5c5c5;
}
.item{
padding: 16px;
border: solid 1px #313131;
box-sizing: border-box;
}
.item:last-of-type{
border-bottom-left-radius: 8px;
border-bottom-right-radius: 8px;
}
.slide-fade-enter-active {
transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
slide-fade-leave-to {
transform: translate(-4px) ;
opacity: 0;
}

</style>