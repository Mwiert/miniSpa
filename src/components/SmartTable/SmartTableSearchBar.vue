<template>
    <form class="search-bar-c">
        <div>
            <input type="text" v-on:input="searchInput" @input="handleSearch" placeholder="Search">  
            <button type="button" class="clear-button" @click="clearSearch" v-if="searchInput">✕</button> <!-- V-if ile arama yerimiz boşken clear butonumuzu gizliyoruz eğer herhangi bir yazı yazılırsa boş olmadığı için false döner ve butonumuz gözükür.-->
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

.clear-button {
  position: relative;
  right: 25px; 
  padding: 5px; 
  background: none;
  border:none;
  font-size: 15px;
  cursor: pointer;
  color: #007bff;
  align-self: center;
  
  &:hover{
    color: #ff0000;
  }
}
</style>
