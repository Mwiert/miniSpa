<template>
  <div class="smart-table-c">
    <SmartTableHeader @search-input="handleSearchInput" />
    <!-- Header for filters and search bar -->

    <SmartTableBody :tableData="paginatedData" :columns="options.table.columns" />
    <!-- Body displaying paginated data -->

    <SmartTableFooter
      :currentPage="currentPage"
      :totalPages="totalPages"
      @update:currentPage="updatePage"
    />
    <!-- Footer for pagination controls -->
  </div>
</template>

<script lang="ts">
import SmartTableHeader from './SmartTableHeader.vue'
import SmartTableBody from './SmartTableBody.vue'
import SmartTableFooter from './SmartTableFooter.vue'
import SmartTablePagination from './SmartTablePagination.vue'

export default {
  name: 'SmartTable',
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  components: {
    SmartTableHeader,
    SmartTableBody,
    SmartTableFooter
  },
  data() {
    return {
      searchTerm: '',
      currentPage: 1,
      itemsPerPage: 10
    }
  },
  computed: {
    filteredData() {
      if (!this.searchTerm) {
        return this.options.table.rows // Show all data if no search term
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
    },

    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredData.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage)
    }
  },

  methods: {
    handleSearchInput(value: string) {
      this.searchTerm = value
      this.currentPage = 1 // Reset to the first page on new search
    },
    updatePage(page) {
      this.currentPage = page
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
