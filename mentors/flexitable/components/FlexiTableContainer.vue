<template>
  <div class="table-container" ref="table">
    <table class="custom-table">
      <FlexiTableHeader1 ref="head" />
      <FlexiTableBody1 ref="body" />
    </table>
  </div>
</template>

<script lang="ts">
import FlexiTableHeader1 from './FlexiTableHeader1.vue'
import FlexiTableBody1 from './FlexiTableBody1.vue'

export default {
  name: 'FlexiTable',
  inject: ['flexi'],

  components: {
    FlexiTableHeader1,
    FlexiTableBody1
  }
}
</script>
<style scoped>
.table-container {
  overflow: auto;

  .custom-table {
    overflow: auto;
    width: 100%;
    border-collapse: collapse;
  }

  .custom-table th,
  .custom-table td {
    padding: 8px;
    text-align: center;
  }

  .custom-table th {
    background-color: #f4f4f4;
  }
}
</style>
