<template>
  <div class="smart-table-footer-container"  >
    Showing {{ tableCount }} reservations
    <SmartTablePagination/>
  </div>
</template>

<script lang="ts">
import SmartTablePagination from './SmartTablePagination.vue';
export default {
  name: 'SmartTableFooter',
  props: {
  },
  components:{
    SmartTablePagination
  },
  computed:{
    tableCount(){
      return this.$parent.filteredData.length
    }
  }
}
</script>

<style lang="scss" scoped>
.smart-table-footer-container {
  height: 80px;
}
</style>