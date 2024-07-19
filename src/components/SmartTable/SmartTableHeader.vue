<template>
    <div class="smart-table-header-container">
        <SearchBar class="search-bar" v-on:search-value="handleSearchInput" /><!-- SearchBardan emit ettiğimiz değeri buraya alıyoruz ki daha sonra ihtiyacımız kolursa direk header içinden alalım -->
        <UIDropdown
    v-model="selectedItems"
    :items="pets"
    :fontSize="fontSize"
    displayField="name"
    urlField="imageUrl"
    :dataSize="dataSize"
    maxVisibleItems="3"
    primaryKey="id"
    :placeHolder="placeHolder"
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
      placeHolder:"Sort by Res. Status"
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