<template>
  <div class="table-container" ref="table">
    <table class="custom-table">
      <FlexiTableHeader ref="head" />
      <FlexiTableBody ref="body" />
    </table>
  </div>
</template>

<script lang="ts">
import FlexiTableHeader from './FlexiTableHeader.vue'
import FlexiTableBody from './FlexiTableBody.vue'

export default {
  name: 'FlexiTable',
  inject: ['flexi'],

  components: {
    FlexiTableHeader,
    FlexiTableBody
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
