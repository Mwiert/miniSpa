<template>
    Smart Table Header
    <SearchBar v-on:search-value="handleSearchInput" /><!-- SearchBardan emit ettiğimiz değeri buraya alıyoruz ki daha sonra ihtiyacımız kolursa direk header içinden alalım -->
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
</style>