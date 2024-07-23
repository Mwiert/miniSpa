<template>
  <div class="flexi-table-footer-c">
    {{ "Showing " + this.flexi.rows.length + " reservations" }}
    <SmartTablePagination/>
  </div>
</template>
<script>

import SmartTablePagination from '../../../src/components/SmartTable/SmartTablePagination.vue'
export default {
  name: 'FlexiTableFooter',
  inject: ['flexi'],
  components: {
    SmartTablePagination,
  },

}
</script>

<style lang="scss" scoped>
.flexi-table-footer-c {
  
}
</style>
