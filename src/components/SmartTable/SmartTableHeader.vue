<template>
    <div class="smart-table-header-container">
        <SearchBar class="search-bar" v-on:search-value="handleSearchInput" /><!-- SearchBardan emit ettiğimiz değeri buraya alıyoruz ki daha sonra ihtiyacımız kolursa direk header içinden alalım -->
        <UIDropdown
    v-model="selectedItems"
    :items="options" 
    :fontSize="fontSize"
    :placeHolder="placeHolder"
    displayField="name"
    :dataSize="dataSize"
    primaryKey="id"
    
        />
    </div>
</template>

<script lang="ts">
import UIDropdown from '../Dropdown/UIDropdown.vue';
import SearchBar from './SmartTableSearchBar.vue'
export default {
    name: 'SmartTableHeader',
    components: {
        SearchBar,
        UIDropdown
    },
    methods: {
        handleSearchInput(value: string) {
            this.$emit('search-input', value); //Tekrardan emit ettik ki tablomuza alabilelim bu değeri
        }
    },
    data() {
        return {
      fontSize: 12,
      dataSize: 3,
      placeHolder:"Sort by Res. Status",
      selectedItems: {id:1,imageUrl:'',name:'5'}
            
        }
    },
    props:{
        options: Array,
    },
    watch:{
        selectedItems:{
            handler: function(val) {
                console.log('watcher:',val)
            this.$emit('per-page', val.name); //Tekrardan emit ettik ki tablomuza alabilelim bu değeri
        },
        immediate: true
        }
    },
}
</script>

<style lang="scss" scoped>
.smart-table-header-container {
    height: 80px;
    border-bottom: 2px solid #E0E1E7;
    .search-bar {
        display: flex;
        float: right;
        align-items: center;
        justify-content: center;
        background-color: white;
}
}
</style>