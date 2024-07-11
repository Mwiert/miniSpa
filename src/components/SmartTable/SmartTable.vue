<template>
  <div class="smart-table-c">
    <SmartTableHeader v-on:search-input="handleSearchInput" />
    <!-- Header kısmı filters ve searchbar'ı içerir v-on ile emit ettiğimiz değerleri alıyoruz-->

    <SmartTableBody
      :tableData="filteredData"
      :options="options"
      @cell-click="handleCellClick"
      :noItemsFound="filteredData.length === 0" />   <!--noItemsFound propunu smarttablebody içinde kullanmak için burada kontrol ediyoruz-->

    <SmartTableFooter />
    <!-- Footer kısmı pagination içerir -->
  </div>
</template>

<script lang="ts">
import SmartTableHeader from './SmartTableHeader.vue'
import SmartTableBody from './SmartTableBody.vue'
import SmartTableFooter from './SmartTableFooter.vue'
import dummies from './dummy.js'
export default {
  name: 'SmartTable',
  props: {
    options: Object,
  },
  components: {
    SmartTableHeader,
    SmartTableBody,
    SmartTableFooter
  },
  data() {
    return {
      dummies: dummies,
      searchTerm: '',
    }
  },
  computed: {
    filteredData() {
      if (!this.searchTerm) {
        return this.options.table.rows //search yoksa direk bütün verileri göster
      } 
      const searchInObject = (obj, searchTerm) => {
        return Object.values(obj).some(value => {
          if (value && typeof value === 'object') {
            return searchInObject(value, searchTerm);
          } else if (value !== null && value !== undefined) {
            return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
          }
          return false;
        });
      };
      return this.options.table.rows.filter(item => searchInObject(item, this.searchTerm));
    },
  },
  methods: {
    handleSearchInput(value: string) {
      this.searchTerm = value
    },
    handleCellClick(payload) {
      this.$emit('cell-click', payload)
    },
    wFilterData(){
      
    }
  }
}
</script>

<style lang="scss" scoped>
.smart-table-c {
  background-color: white;
  padding: 24px;
  border-radius: 15px;
  box-shadow: 0 4px 8px #F5F7FA;
}
</style>
