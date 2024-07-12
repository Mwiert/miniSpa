<template>
    <div class="smart-table-footer-container">
      Showing {{ tableCount }} reservations
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: 'SmartTableFooter',
    props: {
      tableCount: {
        type: Number,
        required: true,
      },
    },
  }
  </script>
  
  <style lang="scss" scoped>
  .smart-table-footer-container {
    height: 80px;
  }
  </style>