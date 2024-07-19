<template>
  <div class="smart-table-footer-container"  >
    Showing {{ tableCount }} reservations
    <SmartTablePagination :totalPages="totalPage" @update:currentPage= "handlerSetPage"  />
  </div>
</template>

<script lang="ts">
import SmartTablePagination from './SmartTablePagination.vue';
export default {
  name: 'SmartTableFooter',
  props: {
    
  },
  data() {
    return {
      pagination:{
        enabled: true,
        perPage:5,
        pages:  [],
        options: [],
        activePage: 1
      }
    }
  },
  components:{
    SmartTablePagination
  },
  computed:{
    tableCount(){
      return this.$parent.filteredData.length
    },
    totalPage() {
       const totalPageArr = []
       const totalPageNum = Math.ceil(this.tableCount / this.pagination.perPage);
       for (let i=1; i <= totalPageNum ; i++) {
        totalPageArr.push(i)
       }
       return totalPageArr
    } //calculates total number of pages.
  },
  methods: {
    handlerSetPage(val){
        this.$emit('update:currentPage', val);
    }
  },
}
</script>

<style lang="scss" scoped>
.smart-table-footer-container {
  height: 80px;
}
</style>