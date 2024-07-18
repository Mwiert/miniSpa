<template>
  <div class="smart-table-body-c">
    <div class="smart-table-main-grid">
      <div class="grid-header" v-for="(header, index) in Columns" :key="index">
        <span>{{ header.name }}</span>
        <span v-if="header.sortable">
          <SvgIcon
            class="sort-button"
            :name="'arrow-selector-v'"
            size="s"
            @click="header.sortable ? sort(header.label) : null"
          />
        </span>
      </div>
    </div>

    <div v-if="$parent.filteredData.length === 0" class="grid-row no-items-found">
      <!-- V-if ile noItemFound propumuza göre true veya false alıyoruz bunun aramasını smarttable componentimizde yapıyoruz eğer true ise alttaki satırlar render edilir false ise bu satırlar görmezden gelinip normal tablomuz oluşur-->
      <div :colspan="Columns.length" class="no-grid-item">No Item Found</div>
    </div>

    <div
      class="grid-row"
      :class="{ rowIndex }"
      v-for="(tableRow, rowIndex) in denemeRow"
      :key="rowIndex"
    >
      <div
        v-for="(cell, cellIndex) in tableRow"
        :key="cellIndex"
        :class="[getCellClass(cell, tableRow[cellIndex]), 'grid-item']"
      >
        <!-- getcellclass methodumuz class name belirlemeye yarıyor ki bu classlara göre status veya price gibi bilgileri alalım. -->
        <template v-if="typeof cell == 'object'">
          <span :class="cell?.class" @click="handlerUrl(cell?.url)">
            {{ cell?.text ?? '' }}
          </span>
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
    activePage: Number,

    noItemsFound: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      tableRowData: [],
      lastSortedColumn: null,
      lastSortOrder: null
    }
  },
  computed: {
    gridTemplateColumns() {
      return `repeat(${this.Columns.length}, 1fr)`
    },

    Columns() {
      return this.options.table.columns
    },
    denemeRow() {
      const currentPage = this.activePage
      const perPage = 5
      const start = (currentPage - 1) * perPage
      const end = perPage + start
      return this.tableRowData.slice(start, end)
    }
  },

  watch: {
    tableData: {
      handler(newData) {
        this.tableRowData = newData
        if (this.lastSortedColumn) {
          this.sort(this.lastSortedColumn)
        }
      },
      deep: true
    }
  },

  created() {
    //compu çağırdığımızda props olarak gelen tableData doğrudan tableRowDataya atıyoruz bu sayede tablonun verileri sayfa açıldığında direk hazır oluyor
    this.tableRowData = this.tableData
  },

  methods: {
    sort(column: string) {
      let sortedRows = [...this.tableRowData]

      let sortOrder = 'desc'

      if (this.lastSortedColumn === column) {
        sortOrder = this.lastSortOrder === 'desc' ? 'asc' : 'desc'
      }

      const multiplier = sortOrder === 'asc' ? 1 : -1

      sortedRows.sort((a, b) => {
        const valueA = this.getValueForSorting(a[column])
        const valueB = this.getValueForSorting(b[column])

        if (valueA < valueB) return -1 * multiplier
        if (valueA > valueB) return 1 * multiplier
        return 0
      })

      this.tableRowData = sortedRows

      this.lastSortedColumn = column
      this.lastSortOrder = sortOrder
    },
    getValueForSorting(cellData: any) {
      if (typeof cellData === 'object' && 'text' in cellData) {
        return cellData.text
      } else {
        return cellData
      }
    },

    handlerUrl(url) {
      if (url == null) {
        window.open(url, '_blank')
      }
    },

    getCellClass(cellData: any) {
      if (cellData.class === 'status') {
        return `${cellData.class}-${cellData.text}`
      } else if (cellData.class === 'price' || cellData.class === 'promoCode') {
        return `${cellData.class}`
      }
      return 'default-class'
    }
  }
}
</script>

<style lang="scss" scoped>
.smart-table-body-c {
  display: block;
  margin: 20px 0;

  .smart-table-main-grid {
    display: grid;
    grid-template-columns: v-bind(
      'gridTemplateColumns'
    ); //computed içerisinde column sayısını dinamik olarak alıp vbind ile css içine geç
    width: 100%;
    gap: 10px;

    .grid-header {
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      color: black;
      padding: 15px;
      border-radius: 10px;
      border: none;

      .sort-button {
        cursor: pointer;
        background: none;
        border: none;
      }
    }
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
    animation: fadeIn 0.5s ease-in-out;

    &:nth-child(even) {
      background-color: white;
    }
    &:nth-child(odd) {
      background-color: #f5f7fa;
    }

    .no-grid-item {
      padding: 28px;
      border: 1px solid #ccc;
      text-align: center;
      font-weight: bold;
      border-radius: 40px;
      background-color: #ffffff;
      border: none;
      grid-column: 1 / -1;
      animation: fadeIn 0.1s ease-in-out;
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
      animation: fadeIn 0.3s ease-in-out;
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
      background-color: #ccffdd;
      color: #1f9947;
      border-color: #4deb81;
    }

    .status-Pending {
      background-color: #ffe6cc;
      color: #e87807;
      border-color: #ee9c4b;
    }

    .status-Cancelled {
      background-color: #ff6b6b;
      color: #7e2323;
      border-color: #ee3535;
    }

    .price,
    .promoCode {
      font-weight: bold;
    }
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
      overflow-x: auto;
    }
  }
}
</style>
