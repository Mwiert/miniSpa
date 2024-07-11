<template>
  
  <div class="ui-dropdown-c">

  <label class="label">{{ label }}</label>

      <button
        @click="toggleDropdown"
        :class="{ 'ui-dropdown-button-active': isOpen }"
        class="ui-dropdown-button">
        <span :class="{ 'placeholder-text-active': !selectedItem }" class= "placeholder-text"  >
           {{ selectedItem || placeHolder }}
        </span>
        <span class="arrow" :class="{ 'arrow-up': isOpen }"></span>  
      </button>

      <div v-if="isOpen" class="ui-dropdown-menu"  :style="{ fontSize: fontSize + 'px' }">
          <span class="ui-search" > 
            <input
          v-if="searchable"
          type="text"
          v-model="searchQuery"
          placeholder="Search..."
          class="ui-dropdown-search"
        />
          <img v-if="searchQuery" @click="clearSearch" class="clear-search-img" :src="photo">
          </span>

        <div class="dropdown-content">
      <div v-for="(item,index) in items" :key="index" @click="selectItem" >
        <div>{{ item.name }}</div>
      </div>
      </div>
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

import x from '../assets/icons/x.svg'

export default {
  name: 'DropdownComponent',
  
  data() {
    return {
      selectedItem: this.initialSelectedItem as string | null,  // represents the currently selected item.
      isOpen: false,      // checks if our dropdown open or not.
      searchQuery: '',     // when we search for an item this will fill up.
      photo: x
    }
  },
  props: {
    // dataSize: {       
    //   type: Number,  // how many data will shown in the dropdown.
    // },
    fontSize: {           // defined fontsize shown in the dropdown.
      type: Number,
      default: 12,
      required:false
   },
    label: {              // label on the dropdown to understand what the dropdown contents are.
      type:String,
      default:""
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
        type: Object

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
      console.log("target:" + target);
      console.log("contains:" +!this.$el.contains(target));
      if (!this.$el.contains(target)) {
        this.isOpen = false
      }
      
    },
    clearSearch(event) {
      this.searchQuery = ""
      event.stopPropagation(); // Prevent dropdown from closing
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
    },
    
    // created() {
    //   this.dataSize = this.items.length
    // }
  }
</script>

<style lang="scss" scoped>
.ui-dropdown-c {
  position: relative;
  display: inline-block;
  margin: 10px;
  display: flex;
  flex-direction: column;
  max-width: fit-content;

  .flag-img {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  object-fit: cover;
}

  .ui-dropdown-button {
    min-width: 150px;
    padding: 15px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 12px;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px; /* Optional: Adds space above the button */
 

    &-active {
      border: 1px solid #60acfe;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .placeholder-text{
      &-active{
        color: grey;
      }
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
    border-radius: 12px;
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    .ui-search {
        width: 90%;
        padding: 10px;
        box-sizing: border-box;
        margin: 7px;
        border-radius: 20px;
        border: 2px solid #ccc;
        outline: none;
        
        .ui-dropdown-search {
        position: absolute;
        right: 18px;
        top: 15px;
        right: 15px;
        top: 24px;
        transform: translateY(-50%, -50%);
        cursor: pointer;
        font-size: 20px;
        color: #cecaca;
        width: 20px;
        height: 20px;
        background-color: #000000;
        border-radius: 50%;
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
  .ui-dropdown-c-label{
    margin-bottom: 10px; /* Adds space below the label */
  }
  .label{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dropdown-content{
    display: flex;
    flex-direction: column;
  }

}
</style>