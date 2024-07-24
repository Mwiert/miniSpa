<!-- <template>
  <form class="search-bar-c">
    <div class="input-wrapper">
      <SvgIcon :name="'search'" size="s" class="search" />
      <input
        type="text"
        v-model="searchInput"
        @input="handleSearch"
        placeholder="Search a reservation..." />
      <button type="button" class="clear-button" @click="clearSearch" v-if="searchInput">
        <SvgIcon :name="'x'" size="s" class="clear" />
      </button>
    </div>
  </form>
</template>

<script lang="ts">
export default {
  name: 'SmartTableSearchBar',
  data() {
    return {
      searchInput: ''
    }
  },
  methods: {
    handleSearch(event: Event) {
      const input = event.target as HTMLInputElement
      this.$emit('search-value', input.value) //Search ettiğimiz emit ediyoruz ki diğer componentlerde kullanabilelim.
    },
    clearSearch() {
      this.searchInput = ''
      this.$emit('search-value', this.searchInput) //Eğer clear yapıyorsak bunu emit ediyoruz
    }
  }
}
</script>

<style lang="scss">
.search-bar-c {
  display: flex;
  align-items: center;
  justify-content: center;

  .input-wrapper {
    height: 40px;
    width: 280px;
    position: relative;
    display: flex;
    align-items: center;
    background-color: #f7f8fa;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    input[type='text'] {
      padding: 10px 15px 10px 40px;
      font-size: 14px;
      border: none;
      border-radius: 5px;
      flex: 1;
      background-color: #f7f8fa;

      &:focus {
        outline: none;
      }
    }

    .clear-button {
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      font-size: 15px;
      cursor: pointer;
      color: #007bff;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }

    .search {
      position: absolute;
      left: 0px;
    }
  }
}
</style> -->
