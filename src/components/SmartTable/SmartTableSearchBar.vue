<template>
    <form class="search-bar-c">
        <div>
            <input type="text" v-on:input="handleSearch" placeholder="Search">
        </div>
    </form>
</template>

<script lang="ts">
export default {
    name: 'SmartTableSearchBar',
    data() {
        return {};
    },
    methods: {
        handleSearch(event: Event) { 
            const input = event.target as HTMLInputElement; 
            this.$emit("search-value",input.value) //Search ettiğimiz emit ediyoruz ki diğer componentlerde kullanabilelim.
        }
    }
}
</script>

<style lang="scss">
.search-bar-c {
    margin: 5px;
    display: flex;
    align-items: center;

    input[type="text"] {
        padding: 5px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-left: 10px;
    }

    input[type="text"]:focus {
        outline: none;
        border-color: #007bff;
    }
}
</style>
