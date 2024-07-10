<template>
  <div class="smart-table-body-c">
    <div class="grid-header" v-for="(header, index) in headers" :key="index">
      {{ header }}
      <button v-if="sortedColumns[index] == true" @click="sort(header)" class="sort-button">
        ▲
      </button>
      <button v-else @click="sort(header)" class="sort-button">▼</button>
    </div>
    <div class="grid-row" v-for="(tableRow, rowIndex) in tableData" :key="rowIndex">
      <div v-for="(cell, cellIndex) in headers" :key="cellIndex" class="grid-item">
        {{ tableRow[cell] }}
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
  data() {
    return {
      sortedTableData: Object,

      // To keep track of the sorting status of columns
      sortedColumns: [] as Array<boolean>
    }
  },
  computed: {
    headers() {
      return this.tableData.length ? Object.keys(this.tableData[0]) : []
    },
    gridTemplateColumns() {
      return `repeat(${this.headers.length}, 1fr)`
    }
  },
  created() {
    this.sortedTableData = this.tableData
    this.sortedColumns = this.headers.map(() => false)
  },
  methods: {
    sort(header: string) {
      console.log('Sort: ', header)

      // Get the index of the column and change its previous sort state
      const index = this.headers.indexOf(header)
      this.sortedColumns[index] = !this.sortedColumns[index]

      // Sort by column data type
      if (typeof this.sortedTableData[0][header] == 'string') {
        this.sortedTableData.sort((a, b) => {
          return this.sortedColumns[index]
            ? a[header].localeCompare(b[header])
            : b[header].localeCompare(a[header])
        })
      } else {
        this.sortedTableData.sort((a, b) => {
          return this.sortedColumns[index] ? a[header] - b[header] : b[header] - a[header]
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.smart-table-body-c {
  display: grid;
  margin-top: 20px;
  margin-bottom: 20px;
  grid-template-columns: v-bind(
    'gridTemplateColumns'
  ); //computed içerisinde column sayısını dinamik olarak alıp vbind ile css içine geç
  gap: 10px;

  &.fadeIn {
    animation: fadeIn 1s ease-in-out;
  }

  .grid-header {
    font-weight: bold;
    background-color: orange;
    color: black;
    padding: 15px;
    border: 1px solid #ccc;
    text-align: center;
    border-radius: 10px;
    transition:
      transform 0.2s,
      background-color 0.3s;

    &:hover {
      background-color: #ffd900;
    }
  }

  .grid-item {
    padding: 15px;
    border: 1px solid #ccc;
    text-align: center;
    border-radius: 10px;
    transition:
      transform 0.2s,
      background-color 0.3s;
    background-color: #f5f5f5;

    &:hover {
      background-color: #ff4949;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }
}

.grid-row {
  display: contents;
}

.sort-button {
  float: right;
  cursor: pointer;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
