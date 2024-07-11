<template>
  <div class="smart-table-body-c">
    <div class="smart-table-main-grid">
      <div class="grid-header" v-for="(header, index) in Columns" :key="index"
      @click="header.sortable ? sort(header.label) : null">
        <span>{{ header.name }}</span>
        <span v-if="header.sortable">
          <SvgIcon :name="'arrow-selector-v'" size="s" />

        </span>
      </div>
    </div>
    
    <div v-if="noItemsFound" class="grid-row no-items-found"> <!-- V-if ile noItemFound propumuza göre true veya false alıyoruz bunun aramasını smarttable componentimizde yapıyoruz eğer true ise alttaki satırlar render edilir false ise bu satırlar görmezden gelinip normal tablomuz oluşur-->
      <div :colspan="Columns.length" class="no-grid-item">
        No Item Found
      </div>
    </div>
    <div class="smart-table-row-grid">
    <div :class="['grid-row', rowClass(rowIndex)]" v-for="(tableRow, rowIndex) in tableRowData" :key="rowIndex">
      <div v-for="(cell, cellIndex) in tableRow" :key="cellIndex" :class="[getCellClass(cell, tableRow[cellIndex]), 'grid-item']" 
      
      @click="handleClick(cell, rowIndex, cellIndex, tableRow[cell])" >
        <template v-if="typeof cell == 'object'">
          <span :class="cell?.class" @click="cell?.url ? handlerUrl(cell.url):undefined">
            {{ cell?.text == "null" ? "" : cell?.text }}</span>
        </template>
        <template v-else>{{ cell }}</template>
      </div>
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
    noItemsFound: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      tableRowData: this.tableData,
      lastSortedColumn: null, 
      lastSortOrder: null 
    }
  },
  computed: {
    gridTemplateColumns() {
      return `repeat(${this.Columns.length}, 1fr)`
    },
    Columns(){
      return this.options.table.columns
    },
  },
  
  watch: {
    tableData: {
      handler(newData) {
        this.tableRowData = newData;
        if (this.lastSortedColumn) {
          this.sort(this.lastSortedColumn);
        }
      },
      deep: true,
    }
  },

  methods: {
    sort(header: string) {
      let sortedRows = [...this.tableData]
      
      let sortOrder = 'desc'

      if(this.lastSortedColumn === header) {
        sortOrder = this.lastSortOrder === 'desc' ? 'asc' : 'desc';
      }

      const multiplier = sortOrder === 'asc' ? 1 : -1;

      sortedRows.sort((a,b) => {
        if (a[header].text.toString() < b[header].text.toString()) return -1 * multiplier;
        if (a[header].text.toString() > b[header].text.toString()) return 1 * multiplier;
        return 0;
      })

      this.tableRowData = sortedRows;

      this.lastSortedColumn = header;
      this.lastSortOrder = sortOrder;
    },
    handleClick(cell, rowIndex, cellIndex, cellData) {
      const columnName = this.headers[cellIndex];
      
      const clickableColumns = this.options.clickableColumns;
      if(clickableColumns.includes(columnName)){
        window.location.href=`https://www.google.com/search?q=${cellData}`;
        this.$emit('cell-click', { cell, rowIndex, cellIndex })
      }
    },
    handlerUrl(url) {
      this.window.location(url,"_blank")
    },
    rowClass(rowIndex: number) {
      return rowIndex % 2 === 0 ? 'even-row' : 'odd-row';
    },
    getCellClass(cellData: any) {
      if (typeof cellData.text === 'string' || typeof cellData.text === 'number') {
        return `${cellData.class}-${cellData.text}`;
      }
      return 'default-class'; 
    }    
  } 
}
</script>


<style lang="scss" scoped>
.smart-table-body-c {
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
}

.smart-table-main-grid {
  display: grid;
  grid-template-columns: v-bind('gridTemplateColumns');//computed içerisinde column sayısını dinamik olarak alıp vbind ile css içine geç
  width: 100%;
  gap: 10px;
}

.grid-row {
  display: grid;
  grid-template-columns: v-bind('gridTemplateColumns');
  width: 100%;
  gap: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 40px; 
  padding: 0.5px; 
}

.grid-row.even-row {
  background-color: #FFF;
}

.grid-row.odd-row {
  background-color: #F5F7FA;
}

.grid-header {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: black;
  padding: 15px;
  border-radius: 10px;
  border: none;
  transition: transform 0.2s, background-color 0.3s;
}

.grid-item {
  padding: 15px;
  border: 1px solid #ccc;
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 30px;
  border: none;
}
.status-Confirmed,
.status-Pending,
.status-Cancelled {
  padding: 5px 10px;
  border-radius: 30px;
  border: 3px solid;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 40px; 
  margin: 10px auto; 
}

.status-Confirmed {
  background-color: #CCFFDD; 
  color: #1F9947;
  border-color: #4deb81;
}

.status-Pending {
  background-color: #FFE6CC; 
  color: #E87807;
  border-color: #ee9c4b;
}

.status-Cancelled {
  background-color: #ff6b6b;
  color: #7e2323;
  border-color: #ee3535;
}


[class*="price-"] {
    font-weight: bold;
  }

  [class*="promoCode-"] {
    font-weight: bold;
  }

.no-grid-item {
  padding: 15px;
  border: 1px solid #ccc;
  text-align: center;
  font-weight: bold;
  border-radius: 30px;
  transition: transform 0.2s, background-color 0.3s;
  background-color: #ff00009d;
  grid-column: 1 / -1; 
}

.sort-button {
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

@media (max-width: 1000px) {
  .smart-table-body-c {
    overflow-x: auto; 
  }

  .smart-table-main-grid,
  .grid-row {
    overflow-x: auto
  }
}
</style>

