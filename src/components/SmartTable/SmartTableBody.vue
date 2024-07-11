<template>
  <div class="smart-table-body-c">
    <div class="smart-table-main-grid">
      <div class="grid-header" v-for="(header, index) in Columns" :key="index">
      {{ header }}
      <button v-if="this.sortableColumns.includes(header)" @click="sort(header)" class="sort-button">
        {{ sortedColumns[index] == true ? "▲" : "▼" }}
      </button>
    </div>
    </div>
    
    <div v-if="noItemsFound" class="grid-row no-items-found"> <!-- V-if ile noItemFound propumuza göre true veya false alıyoruz bunun aramasını smarttable componentimizde yapıyoruz eğer true ise alttaki satırlar render edilir false ise bu satırlar görmezden gelinip normal tablomuz oluşur-->
      <div :colspan="headers.length" class="no-grid-item">
        No Item Found
      </div>
    </div>
    <div class="grid-row" v-for="(tableRow, rowIndex) in Rows" :key="rowIndex">
      <div v-for="(cell, cellIndex) in tableRow" :key="cellIndex" class="grid-item" :class="{clickable : options.clickable}" 
      
      @click="handleClick(cell, rowIndex, cellIndex, tableRow[cell])" >
        <template v-if="typeof cell == 'object'">
          <span :class="cell?.class" @click="cell?.url ? handlerUrl(cell.url):undefined">
            {{ cell?.text == "null" ? "" : cell?.text }}</span>
        </template>
        <template v-else>{{ cell }}</template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SmartTableBody',
  props: {
    tableData: Array,
    options: Object,
    sortableColumns: Array,
    noItemsFound: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      sortedTableData: [] as Array<Record<string, any>>,
      // To keep track of the sorting status of columns
      sortedColumns: [] as Array<boolean>
    }
  },
  computed: {
    headers() {
      return this.tableData.length ? Object.keys(this.tableData[0]) : []
    },
    gridTemplateColumns() {
      return `repeat(${this.Columns.length}, 1fr)`
    },
    Columns(){
      const labels = [];
      
      this.options.table.columns.forEach(element => {
        if( element.status ){
          labels.push(element.label)
        }
      });
      return labels
    },
    Rows() {
      return this.options.table.rows;
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
      if (typeof this.sortedTableData[0][header] === 'string') {
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
    },
    handleClick(cell, rowIndex, cellIndex, cellData) {
      const columnName = this.headers[cellIndex];
      console.log(columnName)
      const clickableColumns = this.options.clickableColumns;
      if(clickableColumns.includes(columnName)){
        //gerekli yönlendirme işlemleri burada yapılabilir.
        window.location.href=`https://www.google.com/search?q=${cellData}`;
        this.$emit('cell-click', { cell, rowIndex, cellIndex })
      }
      
    },
    //check
    handlerUrl(url) {
      this.window.location(url,"_blank")
    }
    
  },
 
}
</script>

<style lang="scss" scoped>
.smart-table-body-c {
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 10px;

  &.fadeIn {
    animation: fadeIn 1s ease-in-out;
  }

  .grid-header {
    font-weight: bold;
    color: black;
    padding: 15px;
    border: 1px solid #ccc;
    text-align: center;
    border-radius: 10px;
    transition:
      transform 0.2s,
      background-color 0.3s;

    &:hover {
      background-color: #ffffff;
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
.no-grid-item {
  padding: 15px;
  border: 1px solid #ccc;
  text-align: center;
  font-weight: bold;
  border-radius: 10px;
  transition: transform 0.2s, background-color 0.3s;
  background-color: #ff0000;
}
}

.grid-row {
  display: contents;
}

  .sort-button {
    float: right;
    cursor: pointer;
    background: none;
    border: none;
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
