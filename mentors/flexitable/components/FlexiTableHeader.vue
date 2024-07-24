<template>
  <div
    class="flexi-table-header-c"
    :class="StickyHeaderClass"
    :style="[gridTemplateColumns, ColumnGap]">
    <template v-for="column in flexi.columns" :key="column.name">
      <div class="flexi-table-header-col-wrapper" v-if="HideColumn(column.label)">
        <div
          class="flexi-table-header-col"
          :class="column.class"
          @click="handlerSortingColumn(column)">
          <span class="flexi-table-header-col-value"> {{ column.name }} </span>

          <template v-if="flexi.options.sortableColumns.includes(column.label)">
            <SvgIcon name="filter-sortable" size="xs" v-if="column.label != sortedColumn" />
            <SvgIcon name="filter-asc" size="xs" v-else-if="sortOrder == 1" />
            <SvgIcon name="filter-desc" size="xs" v-else />
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import flexiTableMixin from '../flexitableMixin'
export default {
  name: 'FlexiTableHeader',
  inject: ['flexi'],
  mixins: [flexiTableMixin],
  data() {
    return {
      sortOrder: 1, // 1 for ascending, -1 for descending
      sortedColumn: null
    }
  },
  computed: {
    StickyHeaderClass() {
      return {
        'sticky-header': this.flexi.options.stickyHeader
      }
    }
  },
  methods: {
    handlerSortingColumn(column) {
      if (!this.flexi.options.sortableColumns.includes(column.label)) {
        return
      }
      if (this.sortedColumn === column.label) {
        this.sortOrder *= -1
      } else {
        this.sortOrder = 1
      }
      this.sortedColumn = column.label

      this.flexi.rows.sort((a, b) => {
        let aValue = a.row[column.label].value ?? a.row[column.label]
        let bValue = b.row[column.label].value ?? b.row[column.label]

        if (column.type === 'date') {
          dayjs.extend(customParseFormat)
          const dateFormat = 'DD.MM.YYYY'
          aValue = dayjs(aValue, dateFormat)
          bValue = dayjs(bValue, dateFormat)
        }

        if (aValue < bValue) {
          return -1 * this.sortOrder
        } else if (aValue > bValue) {
          return 1 * this.sortOrder
        } else {
          return 0
        }
      })
    },
    triggerExportPrint() {
      const divToPrint = this.$parent.$refs.pinkpanthers.$refs.print
      console.log(divToPrint)
      const newPrintWindow = window.open('', 'Print')
      newPrintWindow.document.write(
        `<html>
          <head>
            <style>
              .smart-table-body-c {
                display: block;
                margin: 20px 0;
              }
              .smart-table-main-grid {
                display: grid;
                grid-template-columns: repeat(${this.Columns.length}, 1fr);
                width: 100%;
                gap: 10px;
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
              }
              .grid-row {
                display: grid;
                grid-template-columns: repeat(${this.Columns.length}, 1fr);
                width: 100%;
                gap: 5px;
                margin-bottom: 10px;
                border: 1px solid #ccc;
                border-radius: 40px;
                padding: 0.5px;
              }
              .no-grid-item {
                padding: 28px;
                border: 1px solid #ccc;
                text-align: center;
                font-weight: bold;
                border-radius: 40px;
                background-color: #ffffff;
                grid-column: 1 / -1;
              }
              .grid-item {
                padding: 15px;
                border: 1px solid #ccc;
                text-align: center;
                justify-content: center;
                align-items: center;
                display: flex;
                border-radius: 30px;
              }
              .grid-item.confirmed {
                background-color: #ccffdd;
                color: #1f9947;
                border-color: #4deb81;
              }
              .grid-item.pending {
                background-color: #ffe6cc;
                color: #e87807;
                border-color: #ee9c4b;
              }
              .grid-item.cancelled {
                background-color: #ff6b6b;
                color: #7e2323;
                border-color: #ee3535;
              }
            </style>
          </head>
          <body>
            ${divToPrint.outerHTML}
          </body>
        </html>`
      )

      newPrintWindow.print()
      //newPrintWindow.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.flexi-table-header-c {
  &.sticky-header {
    background-color: #fff;
    position: sticky;
    top: 0;
  }
}
.flexi-table-header-col-wrapper {
  // width: fit-content;
  cursor: pointer;
  font-weight: 500;

  // border: 1px solid #eee;

  &:hover {
    background-color: #f4f4f4;
    border-radius: 1rem;
  }

  .flexi-table-header-col {
    display: flex;
    align-items: center;
  }
}
.txt-right {
  justify-content: flex-end;
}
</style>
