<template>
  <div class="grid-container">
    <div v-for="(header, index) in headers" :key="index" class="grid-header">
      {{ header }}
    </div>

    <div v-for="(tableRow, rowIndex) in tableData" :key="rowIndex">
      <div v-for="(cell, cellIndex) in tableRow" :key="cellIndex" class="grid-item">
        {{ cell }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SmartTableBody',
  props: {
    tableData: Object
  },
  computed: {
    headers() {
      return this.tableData.length ? Object.keys(this.tableData[0]) : []
    },
    // gridTemplateColumns() {
    //   return {
    //     display: 'grid',
    //     'grid-template-columns': repeat(${this.headers.length}, ${colwidth})
    //   }
    // }
  }
}
</script>

<!-- <stlye lang="scss">
// .smart-table-body-c {
//   display: grid;
//   margin-top: 10px;
//   margin-bottom: 10px;
//   gap: 10px;
//   .grid-header,
//   .grid-item {
//     background-color: yellow;
//     padding: 20px;
//     border: 1px solid b;
//     text-align: center;
//   }

//   .grid-header {
//     font-weight: bold;
//     background-color: orange;
//   }
// }
</stlye> -->
