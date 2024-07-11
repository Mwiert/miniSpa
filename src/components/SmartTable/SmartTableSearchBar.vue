<template>
    <form class="search-bar-c">
        <div class="search-bar-container">
            <SvgIcon :name="'search'" size="s" />
            <input type="text" v-model="searchInput" @input="handleSearch" placeholder="Search a reservation...">  
            <button type="button" class="clear-button" @click="clearSearch" v-show="searchInput">✕</button>  <!-- V-if ile arama yerimiz boşken clear butonumuzu gizliyoruz eğer herhangi bir yazı yazılırsa boş olmadığı için false döner ve butonumuz gözükür.-->
        </div>
    </form>
</template>

<script lang="ts">
export default {
    name: 'SmartTableSearchBar',
    data() {
        return {
            searchInput: ''
        };
    },
    methods: {
        handleSearch(event: Event) { 
            const input = event.target as HTMLInputElement; 
            this.$emit("search-value",input.value) //Search ettiğimiz emit ediyoruz ki diğer componentlerde kullanabilelim.
        },
        clearSearch(){
            this.searchInput = '';
            this.$emit("search-value", this.searchInput); //Eğer clear yapıyorsak bunu emit ediyoruz 
        }
    }
}
</script>

<style lang="scss">
.search-bar-c {
    display: flex;
    align-items: center;

    input[type="text"] {
        height: 100%;
        width: 100%;
        font-size: 16px;
        border: none;
        background: none;
        outline: none;
    }
}

.search-bar-container {
    height: 40px;
    width: 280px;
    background-color: #F7F8FA;
    position: relative;
    display: flex;
    align-items: center;
    border: 2px solid #DFE0E6;
    border-radius: 4px;
}

.clear-button {
    position: absolute;
    right: 5px;
    background: none;
    border: none;
    font-size: 15px;
    cursor: pointer;
    color: #007bff;
    align-self: center;
  
    &:hover {
        color: #ff0000;
    }
}
</style>

