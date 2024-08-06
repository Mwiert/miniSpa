<template>
  <div class="flexi-table-footer-c">
    <SmartTablePagination />
  </div>
</template>
<script lang="ts">
import SmartTablePagination from '../../../src/components/SmartTable/SmartTablePagination.vue'
export default {
  name: 'FlexiTableFooter',
  inject: ['flexi'],
  components: {
    SmartTablePagination
  }
}
</script>

<style lang="scss" scoped>
.flexi-table-footer-c {
}
</style>
