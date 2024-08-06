<template>
  <div class="flexi-table-footer-c">
    <FlexiTablePagination />
  </div>
</template>
<script lang="ts">
import FlexiTablePagination from './FlexiTablePagination.vue'
export default {
  name: 'FlexiTableFooter',
  inject: ['flexi'],
  components: {
    FlexiTablePagination
  }
}
</script>

<style lang="scss" scoped>
.flexi-table-footer-c {
}
</style>
