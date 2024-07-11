<template>
    <div class="smart-table-header-container">
        <SearchBar class="search-bar" v-on:search-value="handleSearchInput" /><!-- SearchBardan emit ettiğimiz değeri buraya alıyoruz ki daha sonra ihtiyacımız kolursa direk header içinden alalım -->
    </div>
</template>

<script lang="ts">
import SearchBar from './SmartTableSearchBar.vue'
export default {
    name: 'SmartTableHeader',
    components: {
        SearchBar
    },
    methods: {
        handleSearchInput(value: string) {
            this.$emit('search-input', value); //Tekrardan emit ettik ki tablomuza alabilelim bu değeri
        }
    }
}
</script>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  float: right;
  align-items: center;
  justify-content: center;
  background-color: white;
}

.smart-table-header-container {
    height: 80px;
    border-bottom: 2px solid #E0E1E7;
}
</style>