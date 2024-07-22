<template>
  <div class="smart-table-footer-container">
    Showing {{ tableCount }} reservations
    <SmartTablePagination
      :totalPages="totalPage"
      @update:currentPage="handlerSetPage"
      @update:currentPerPage="handlerSetPerPage"
    />
  </div>
</template>

<script lang="ts">
import SmartTablePagination from './SmartTablePagination.vue'
export default {
  name: 'SmartTableFooter',
  props: {},
  data() {
    return {
      pagination: {
        enabled: true
      }
    }
  },
  components: {
    SmartTablePagination
  },
  computed: {
    tableCount() {
      return this.$parent.filteredData.length
    },
    totalPage() {
      const totalPageArr = []
      const totalPageNum = Math.ceil(this.tableCount / this.$parent.perPage)
      for (let i = 1; i <= totalPageNum; i++) {
        totalPageArr.push(i)
      }
      return totalPageArr
    } //calculates total number of pages.
  },
  methods: {
    handlerSetPage(val) {
      this.$emit('update:currentPage', val)
    },
    handlerSetPerPage(val) {
      this.$emit('update:currentPerPage', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.smart-table-footer-container {
  height: 80px;
}
</style>
