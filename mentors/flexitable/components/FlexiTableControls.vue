<template>
  <div class="flexi-table-controls-c">
    <!-- Items Per Page -->
    <div v-if="showSpinner" class="loading-overlay">
      <div class="spinner"></div>
    </div>
    <div class="ftc-select-wrapper">
      <UIEnumDropdown
        v-model="flexi.options.selected"
        :enumObj="updatedPageOrder"
        :dataSize="flexi.options.UIDropdownOrderProp.dataSize"
        :fontSize="flexi.options.UIDropdownOrderProp.fontSize"
        :showAll="flexi.options.UIDropdownOrderProp.showAll" />
      <!--Custom Dropdown-->

      <div class="export-buttons">
        <div
          class="excel-selector"
          @mouseover="openComponent = true"
          @mouseleave="openComponent = false">
          <SvgIcon name="excel" size="xs" class="excel-button" />
          <div class="excel-wrapper" v-if="openComponent">
            <div class="excel-text" @click="downloadExcel()">Download Excel</div>
            <div class="excel-text" @click="downloadAllExcel()">Download All Excel</div>
          </div>
        </div>
        <SvgIcon name="pdf" size="xs" class="pdf-button" @click="downloadPdf()"></SvgIcon>
        <SvgIcon
          name="print"
          size="xs"
          class="print-button"
          @click="triggerExportPrint()"></SvgIcon>
        <div class="dropdown">
          <div class="dropdown-icon" @click="Toggle()">
            <SvgIcon class="dropdown-icon" name="columns" size="xs" />
          </div>

          <div class="multi" v-if="flexi.options.show">
            <div
              class="option"
              :class="col.status === false ? 'notselected' : 'selected'"
              v-for="(col, index) in flexi.columns"
              :key="index"
              @click="selectHidden(index)">
              <div class="option-text" :class="col.status === false ? 'notselected' : 'selected'">
                {{ col.name }}
              </div>
              <div class="tick-wrapper" :class="col.status === false ? 'notselected' : 'selected'">
                <SvgIcon name="tick" size="xs" />
              </div>
            </div>
            <button class="clear-button" @click="selectClear">Clear/Select All</button>
          </div>
        </div>
        <SvgIcon name="freeze" size="xs" class="freeze-button"></SvgIcon>
        <SvgIcon name="refresh" size="xs" class="refresh-button"></SvgIcon>
        <div v-if="flexi.options.selected.id === -1" class="show">
          <p class="show" v-html="paginationText()"></p>
        </div>
      </div>
    </div>

    <!-- <button @click="toggleSelectAll">All</button> -->

    <!-- Search Table -->
    <div class="ftc-right-side-wrapper">
      <div class="mark-sign-wrapper">
        <FlexiTableActionArea
          :buttonNumber="1"
          :dropdownNumber="1"
          :propFunction="changeStatus"
          :label="'Mark'" />
      </div>

      <div class="ftc-search-wrapper" v-if="!flexi.options.hideSearch">
        <SvgIcon :name="'search'" size="s" class="search" />
        <input
          type="text"
          v-model="flexi.options.searchWord"
          @input="
            debounce(() => {
              state.filterText = flexi.options.searchWord
            })
          " />
        <button
          type="button"
          class="clear-button"
          @click="clearSearch"
          v-if="flexi.options.searchWord">
          <SvgIcon :name="'x'" size="s" class="clear" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import the necessary libraries
//import { jsPDF } from 'jspdf';
//import html2canvas from 'html2canvas';
import flexiTableMixin from '../flexitableMixin'
import FlexiTableActionArea from './FlexiTableActionArea.vue'
import UIEnumDropdown from '../../../src/components/Dropdown/UIEnumDropdown.vue'
import html2pdf from 'html2pdf.js'
import dayjs from 'dayjs'
import { reactive } from 'vue'

export default {
  name: 'FlexiTableControls',
  inject: ['flexi'],
  mixins: [flexiTableMixin],
  components: {
    UIEnumDropdown,
    FlexiTableActionArea
  },
  data() {
    return {
      openComponent: false,
      showSpinner: false,
      dayjs: dayjs(),
      updatedPageOrder: []
    }
  },
  setup() {
    const state = reactive({
      filterText: ''
    })

    return {
      state
    }
  },
  created() {
    this.debounce = this.createDebounce()
    this.updatedPageOrder = this.updatePageOrder()
  },
  methods: {
    changeStatus() {
      this.flexi.selectedRows.forEach((element) => {
        element.row.status.value = this.flexi.options.selectedStatus.name.toLowerCase()
        element.row.status.class = 'item-' + this.flexi.options.selectedStatus.name.toLowerCase()
      })
    },
    updatePageOrder() {
      let updatedPageOrder = this.flexi.options.pageOrder
      let name = this.flexi.options.pageOrder['-1']
      updatedPageOrder['-1'] = name + ` (${this.flexi.rows.length} Data)`

      return updatedPageOrder
    },
    paginationText() {
      return `Showing <strong> ${this.flexi.options.totalPages} </strong> of <strong> ${this.flexi.options.totalPages} </strong> data`
    },
    createDebounce() {
      let timeout = null
      return (fnc, delayMs) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          fnc()
          this.flexi.options.searchKeyWord = this.flexi.options.searchWord
        }, delayMs || 500)
      }
    },
    async downloadPdf() {
      this.showSpinner = true
      try {
        //const headerElement = this.$parent.$refs.flexiheader.$refs.print2
        //const bodyElement = this.$parent.$refs.flexibody.$refs.tableContainer
        const bodyElement = this.$parent.$refs.container.$refs.body.$refs.print1
        const headerElement = this.$parent.$refs.container.$refs.head.$refs.print3
        const connectedElement = document.createElement('div')
        ;[headerElement, bodyElement].forEach((element) => {
          connectedElement.appendChild(element.cloneNode(true))
        })

        const options = {
          margin: [10, 10, 10, 10], // location
          filename: this.flexi.options.tableTitle + '.pdf',
          image: { type: 'jpeg', quality: 1 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        }

        // use html2pdf.js to convert the combinedDiv to pdf
        await html2pdf().from(connectedElement).set(options).save()
      } catch (e) {
        console.log(e)
      } finally {
        this.showSpinner = false
      }
    },

    cleanColumnWithRegex(name) {
      if (typeof name === 'string') {
        return name.replace(/[^a-zA-Z0-9öÖıİşŞçÇğĞüÜ\s.,/:\-\\]/g, '')
      } else {
        return name !== undefined && name !== null ? String(name) : ''
      }
    },
    cleanRowsWithRegex(name) {
      if (typeof name === 'string') {
        return name.replace(/[^a-zA-Z0-9öÖıİşŞçÇğĞüÜ\s.,/:\-\\]/g, '')
      } else {
        return name !== undefined && name !== null ? String(name) : ''
      }
    },

    isValidDate(date) {
      const formats = [
        'YYYY/MM/DD',
        'YYYY/MM/DD HH:mm:ss',
        'DD/MM/YYYY',
        'DD/MM/YYYY HH:mm:ss',
        'DD/MM/YYYY HH:mm',
        'YYYY.MM.DD',
        'YYYY.MM.DD HH:mm:ss',
        'DD.MM.YYYY',
        'DD.MM.YYYY HH:mm:ss',
        'DD.MM.YYYY HH:mm',
        'YYYY-MM-DD',
        'YYYY-MM-DD HH:mm:ss',
        'DD-MM-YYYY',
        'DD-MM-YYYY HH:mm:ss',
        'DD-MM-YYYY HH:mm',
        'HH:mm'
      ]
      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/

      return formats.some((format) => dayjs(date, format, true).isValid()) || timeRegex.test(date)
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
      try {
        const self = this
        const tableTitle = this.flexi.options.tableTitle
        const divToPrint = this.$parent.$refs.container.$refs.body.$refs.print1
        const headersContainer = this.$parent.$refs.container.$refs.head.$refs.print3
        //const divToPrint = this.$parent.$refs.flexibody.$refs.tableContainer
        //const headersContainer = this.$parent.$refs.flexiheader.$refs.print2

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
            let cleanedRows = self.cleanRowsWithRegex(bodyCell.innerText)
            if (!isNaN(cleanedRows) && cleanedRows.trim() !== '') {
              const floatingPoint = cleanedRows.split('.')[1]?.length || 0
              let numberFormat = ''
              if (floatingPoint > 0) {
                numberFormat = `0.${'0'.repeat(floatingPoint) || ''}`
              } else {
                numberFormat = '0'
              }

              excelContent += `<td style="mso-number-format:'${numberFormat}'">${cleanedRows}</td>`
            } else if (isNaN(cleanedRows) && this.isValidDate(cleanedRows)) {
              if (cleanedRows.includes(':')) {
                if (cleanedRows.length === 5) {
                  cleanedRows += ':00'
                  excelContent += `<td style="mso-number-format:'HH:mm:ss'">${cleanedRows}</td>`
                } else if (cleanedRows.length === 8) {
                  excelContent += `<td style="mso-number-format:'HH:mm:ss'">${cleanedRows}</td>`
                } else {
                  excelContent += `<td style="mso-number-format:'dd/MM/yyyy HH:mm:ss'">${cleanedRows}</td>`
                }
              } else {
                excelContent += `<td style="mso-number-format:'dd/MM/yyyy'">${cleanedRows}</td>`
              }
            } else {
              excelContent += `<td style="mso-number-format:'\\@''">${cleanedRows}</td>`
            }
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
      } catch (e) {
        console.log(e)
      }
    },
    cleanTableElements(table) {
      table.querySelectorAll('script, style, link, meta').forEach((element) => element.remove())
      return table
    },

    // print method style not working
    triggerExportPrint() {
      const divToPrint = this.$parent.$refs.container.$refs.body.$refs.print1
      const divToPrint2 = this.$parent.$refs.container.$refs.head.$refs.print3

      //const divToPrint = this.$parent.$refs.flexibody.$refs.tableContainer //bodyi kapsıyor
      //const divToPrint2 = this.$parent.$refs.flexiheader.$refs.print2 ///columları
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
      } else {
        for (let i = 0; i < this.flexi.columns.length; i++) {
          this.flexi.columns[i].status = false
        }
      }
    },
    // hide selected column
    selectHidden(index) {
      this.flexi.columns[index].status = !this.flexi.columns[index].status
    },
    Toggle() {
      this.flexi.options.show = !this.flexi.options.show
      this.$nextTick(() => {
        if (this.flexi.options.show) {
          document.addEventListener('click', this.handleClickOutside)
        } else {
          document.removeEventListener('click', this.handleClickOutside)
        }
      })
    },
    handleClickOutside(event) {
      const dropdown = this.$el.querySelector('.dropdown')

      if (!dropdown.contains(event.target)) {
        this.flexi.options.show = false
        document.removeEventListener('click', this.handleClickOutside)
      }
    },
    clearSearch() {
      this.flexi.options.searchKeyWord = ''
      this.flexi.options.searchWord = ''
      this.state.filterText = ''
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
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    .spinner {
      border: 16px solid #f3f3f3;
      border-top: 16px solid #2feb9c;
      border-radius: 50%;
      width: 80px;
      height: 80px;
      animation: spin 2s linear infinite;
    }
  }
  .ftc-right-side-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-end;
    gap: 40px;
    .mark-sign-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;
      .sign-status-container {
        display: flex;
        align-items: center;
      }

      .mark-container {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        width: 88px;
        background-color: #4da6ff;
        border-radius: 8px;
        .mark-container-text {
          font-size: 14px;
          font-weight: 500;
          color: white;
          font: normal normal medium 16px/20px Inter;
          letter-spacing: 0px;
          color: #ffffff;
          text-transform: capitalize;
          opacity: 1;
        }
      }
    }
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
  }
  .ftc-select-wrapper {
    display: inline-flex;
    align-items: center;

    .export-buttons {
      display: flex;
      align-items: center;
      gap: 10px;
      .show {
        margin-right: auto;
        min-width: fit-content;
      }
      .excel-selector {
        display: flex;
        flex-direction: column;
        position: relative;

        .excel-wrapper {
          width: max-content;
          position: absolute;
          top: 100%;
          left: 0;
          gap: 10px;

          background-color: white;
          border: 1px solid black;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          padding: 10px;
          z-index: 999;
          .excel-text {
            width: 100%;
            cursor: pointer;
            &:hover {
              color: #2feb9c;
            }
          }
        }
      }
      .dropdown {
        display: flex;
        flex-direction: column;

        .dropdown-icon {
          cursor: pointer;
        }
        .multi {
          position: absolute;
          background-color: white;
          margin-top: 3rem;
          border-radius: 1rem;
          padding: 12px 8px;
          box-shadow: 0 0 2px rgb(0, 0, 0);
          width: fit-content;
          overflow-x: hidden;
          overflow-y: auto;
          z-index: 99999;

          .clear-button {
            cursor: pointer;
            margin-top: 4px;

            border-radius: 8px;
            grid-column: 4;
            padding: 10px;
            border: none;
            &:hover {
              background-color: #ecfcca;
            }
          }

          .option {
            display: flex;
            height: 24px;
            width: 136px;
            margin-top: 4px;
            justify-content: space-between;
            align-items: center;
            background: #f7f7f7 0% 0% no-repeat padding-box;
            border-radius: 8px;
            padding: 5px;

            cursor: pointer;
            .tick-wrapper {
              display: flex;
              justify-content: center;
              align-items: center;

              &.selected {
                display: flex;
                justify-content: center;
                align-items: center;
              }
              &.notselected {
                display: none;
              }

              :hover {
                background-color: #ecfcca;
              }
            }

            .option-text {
              &.selected {
                text-align: left;
                font: normal normal normal 13px/20px Inter;
                letter-spacing: 0px;
                opacity: 1;
                font-weight: 500;
              }

              &.notselected {
                text-align: left;
                font: normal normal normal 13px/20px Inter;
                letter-spacing: 0px;
                opacity: 0.5;
              }
            }

            &.selected {
              background-color: #ecfcca;
            }

            &.notselected {
              background-color: #f7f7f7;
            }
          }
        }
      }
    }
  }
}
</style>
