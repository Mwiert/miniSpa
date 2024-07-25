<template>
  <div class="smart-table-c">
    <SmartTableHeader
      @search-input="handleSearchInput"
      :columnOp="options.table.columns"
      @column-hide="handleColumnhide"
      @per-page="handlerPerPage"
      :options="options.options.header.perPageOptions" />
    <!-- Header kısmı filters ve searchbar'ı içerir v-on ile emit ettiğimiz değerleri alıyoruz-->

    <SmartTableBody
      :tableData="filteredData"
      :options="options"
      :activePage="activePage"
      :hidecolumn="options.options.hiddencolumns"
      :deneme="hidecol"
      :perPage="perPage" />
    <!-- noItemsFound propunu smarttablebody içinde kullanmak için burada kontrol ediyoruz -->

    <SmartTableFooter
      @update:currentPage="handlerSetPage"
      @update:currentPerPage="handlerSetPerPage" />
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
    options: Object
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
      activePage: 1,
      perPage: 4,
      hidecol: []
    }
  },
  computed: {
    filteredData() {
      if (!this.searchTerm) {
        return this.options.table.rows //search yoksa direk bütün verileri göster
      }
      const searchInObject = (obj, searchTerm) => {
        return Object.values(obj).some((value) => {
          if (value && typeof value === 'object') {
            return searchInObject(value, searchTerm)
          } else if (value !== null && value !== undefined) {
            return value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          }
          return false
        })
      }
      return this.options.table.rows.filter((item) => searchInObject(item, this.searchTerm))
    }
  },
  methods: {
    handleSearchInput(value: string) {
      this.searchTerm = value
    },
    handlerSetPage(val) {
      this.activePage = val
    },
    handlerSetPerPage(val) {
      this.perPage = val
    },
    handlerPerPage(val) {
      if (val == 'All') {
        this.perPage = this.filteredData.length
      } else {
        this.perPage = Number(val)
      }
    },
    handleColumnhide(val) {
      this.hidecol = val
    }
  }
}
</script>

<style lang="scss" scoped>
.smart-table-c {
  background-color: white;
  padding: 24px;
  border-radius: 15px;
  box-shadow: 0 4px 8px #f5f7fa;
}
</style>
