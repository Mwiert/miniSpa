<template>
  <div class="flexi-table-controls-c">
    <!-- Items Per Page -->
    <div class="ftc-select-wrapper">
      <UIEnumDropdown v-model="flexi.options.selected" :enumObj="flexi.options.pageOrder"
        :label="flexi.options.UIDropdownOrderProp.label" :dataSize="flexi.options.UIDropdownOrderProp.dataSize"
        :fontSize="flexi.options.UIDropdownOrderProp.fontSize" :showAll="flexi.options.UIDropdownOrderProp.showAll" />
      <!--Custom Dropdown-->
      <div class="dropdown">
        <div class="dropdown-icon" @click="Toggle">
          <SvgIcon name="eye" size="xs" />
        </div>
        <div class="multi" v-if="flexi.options.show">
          <div class="option" :class="col.status === false ? 'notselected' : 'selected'"
            v-for="(col, index) in flexi.columns" :key="index" @click="selectHidden(index)">
            {{ col.name }}
          </div>
          <button class="clear-button" @click="selectClear">Clear/Select All</button>
        </div>
      </div>
      <div class="export-buttons">
        <button class="pdf-button" @click="triggerExportPrint()">Print</button>

        <button class="excel-button" @click="downloadAllExcel()">Excel All</button>
        <button class="pdf-button" @click="downloadExcel()">Excel</button>

        <button class="pdf-button" @click="downloadPdf()">create pdf</button>
      </div>
    </div>

    <!-- <button @click="toggleSelectAll">All</button> -->

    <!-- Search Table -->
    <div class="ftc-search-wrapper" v-if="!flexi.options.hideSearch">
      <SvgIcon :name="'search'" size="s" class="search" />
      <input type="text" v-model="flexi.options.searchKeyWord" />
      <button type="button" class="clear-button" @click="clearSearch" v-if="flexi.options.searchKeyWord">
        <SvgIcon :name="'x'" size="s" class="clear" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
// import the necessary libraries
//import { jsPDF } from 'jspdf';
//import html2canvas from 'html2canvas';
import flexiTableMixin from '../flexitableMixin'
import UIEnumDropdown from '../../../src/components/Dropdown/UIEnumDropdown.vue'
import html2pdf from 'html2pdf.js'
export default {
  name: 'FlexiTableControls',
  inject: ['flexi'],
  mixins: [flexiTableMixin],
  components: {
    UIEnumDropdown
  },
  methods: {
    async downloadPdf() {
      const headerElement = this.$parent.$refs.flexiheader.$refs.print2
      const bodyElement = this.$parent.$refs.flexibody.$refs.tableContainer

      const connectedElement = document.createElement('div')
        ;[headerElement, bodyElement].forEach((element) => {
          connectedElement.appendChild(element.cloneNode(true))
        })

      const options = {
        margin: [10, 10, 10, 10], // location
        filename: 'download.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }


      // use html2pdf.js to convert the combinedDiv to pdf
      await html2pdf().from(connectedElement).set(options).save()


    },

    cleanColumnWithRegex(name) { 
      if (typeof name === 'string') {
        return name.replace(/[^a-zA-ZöÖıİşŞçÇğĞüÜ\s]/g, '')
      } else {
        return name !== undefined && name !== null ? String(name) : ''
      }
    },
    cleanRowsWithRegex(name) {
      if (typeof name === 'string') {
        return name.replace(/[^a-zA-Z0-9öÖıİşŞçÇğĞüÜ\s.,]/g, '')
      } else {
        return name !== undefined && name !== null ? String(name) : ''
      }
    },

    downloadAllExcel() {
      const initialItemsPerPage = this.flexi.options.itemsPerPage

      this.flexi.options.itemsPerPage = -1
      this.$nextTick(() => {
        this.downloadExcel()
        this.flexi.options.itemsPerPage = initialItemsPerPage
      })
    },

    downloadExcel() {
      const self = this
      const tableTitle = 'flexitable'
      const divToPrint = this.$parent.$refs.flexibody.$refs.tableContainer
      const headersContainer = this.$parent.$refs.flexiheader.$refs.print2

      let excelContent = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">`
      excelContent += `<head>`
      excelContent += `<!--[if gte mso 9]>`
      excelContent += `<xml>`
      excelContent += `<x:ExcelWorkbook>`
      excelContent += `<x:ExcelWorksheets>`
      excelContent += `<x:ExcelWorksheet>`
      excelContent += `<x:Name>${tableTitle}</x:Name>`
      excelContent += `<x:WorksheetOptions>`
      excelContent += `<x:DisplayGridlines/>`
      excelContent += `</x:WorksheetOptions>`
      excelContent += `</x:ExcelWorksheet>`
      excelContent += `</x:ExcelWorksheets>`
      excelContent += `</x:ExcelWorkbook>`
      excelContent += `</xml>`
      excelContent += `<![endif]-->`
      excelContent += `<meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>`
      excelContent += `</head>`
      excelContent += `<body>`
      excelContent += '<table>'

      //header start
      excelContent += '<thead>'
      excelContent += '<tr>'

      const headerCells = headersContainer.querySelectorAll('.flexi-table-header-col-wrapper')

      headerCells.forEach((headerCell) => {
        const cleanedColumns = self.cleanColumnWithRegex(headerCell.innerText)
        excelContent += `<th>${cleanedColumns}</th>`
      })

      excelContent += '</tr>'
      excelContent += '</thead>'

      //body start
      excelContent += '<tbody>'
      const rows = divToPrint.querySelectorAll('.flexi-table-body-row-wrapper')
      rows.forEach((row) => {
        excelContent += '<tr>'
        const bodyCells = row.querySelectorAll('.flexi-table-body-col')

        bodyCells.forEach((bodyCell) => {
          const cleanedRows = self.cleanRowsWithRegex(bodyCell.innerText)
          //it forces the row content to be text to prevent problems previewing in excel
          excelContent += `<td style="mso-number-format:'\\@'">${cleanedRows}</td>`
        })
        excelContent += '</tr>'
      })

      excelContent += '</tbody>'
      excelContent += '</table>'
      excelContent += `</body>`
      excelContent += `</html>`

      let csvContent = 'data:application/vnd.ms-excel,' + excelContent

      var encodedUri = encodeURI(csvContent)
      var link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      link.setAttribute('download', `${tableTitle}`)
      document.body.appendChild(link)
      link.click()
    },

    cleanTableElements(table) {
      table.querySelectorAll('script, style, link, meta').forEach((element) => element.remove())
      return table
    },

    // print method style not working
    triggerExportPrint() {
      const divToPrint = this.$parent.$refs.flexibody.$refs.tableContainer //bodyi kapsıyor
      const divToPrint2 = this.$parent.$refs.flexiheader.$refs.print2 ///columları
      const newPrintWindow = window.open('', 'Print')
      newPrintWindow.document.write(
        `<html>
      <head>
        <link rel="stylesheet" type="text/css" href="../src/assets/css/FlexiTablePrint.css">
      </head>
      <body>
        ${divToPrint2.outerHTML}
        ${divToPrint.outerHTML}
      </body>
    </html>`
      )

      newPrintWindow.print()
      //newPrintWindow.close()
    },
    // status true for every column
    selectClear() {
      if (this.flexi.options.hiddenColumns.length != 0) {
        for (let i = 0; i < this.flexi.columns.length; i++) {
          this.flexi.columns[i].status = true
        }
      }
    },
    // hide selected column
    selectHidden(index) {
      this.flexi.columns[index].status = !this.flexi.columns[index].status
    },
    Toggle() {
      this.flexi.options.show = !this.flexi.options.show
      if (this.flexi.options.show) {
        document.addEventListener('click', this.closeDropdown)
      } else {
        document.removeEventListener('click', this.closeDropdown)
      }
    },
    closeDropdown(event) {
      if (!event.target.closest('.dropdown')) {
        this.flexi.options.show = false
      }
    },

    clearSearch() {
      this.flexi.options.searchKeyWord = ''
    }
  },
  watch: {
    'flexi.options.selected': {
      handler: function (val) {
        this.flexi.options.pages = []
        this.flexi.options.itemsPerPage = val.id
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.flexi-table-controls-c {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .ftc-search-wrapper {
    height: 40px;
    width: 280px;
    position: relative;
    display: flex;
    align-items: center;
    background-color: #f7f8fa;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    input[type='text'] {
      padding: 10px 15px 10px 40px;
      margin-right: 20px;
      font-size: 14px;
      border: none;
      border-radius: 5px;
      flex: 1;
      background-color: #f7f8fa;

      &:focus {
        outline: none;
      }
    }

    .clear-button {
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      font-size: 15px;
      cursor: pointer;
      color: #007bff;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }

    .search {
      position: absolute;
      left: 0px;
    }
  }

  .ftc-select-wrapper,
  .dropdown {
    display: inline-flex;
    align-items: center;
  }

  .dropdown {
    display: flex;
    flex-direction: column;

    .dropdown-icon {
      cursor: pointer;
    }

    .multi {
      border: 2px solid black;
      border-radius: 25px;
      background-color: rgb(255, 255, 255);
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(3, auto);
      gap: 10px;
      padding: 10px;
      position: absolute;
      z-index: 999;
      left: 2%;
      top: 25%;

      .clear-button {
        cursor: pointer;
        border: 2px solid black;
        border-radius: 25px;
        grid-column: 4;
        padding: 10px;
        background-color: aqua;
      }

      .option {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid black;
        border-radius: 25px;
        padding: 5px;

        cursor: pointer;

        &.selected {
          background-color: #2feb9c;
        }

        &.notselected {
          background-color: #ff5959;
        }
      }
    }
  }
}
</style>
