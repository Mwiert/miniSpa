<template>
  <div class="flexi-table-c" v-if="isDataCorrect() === 'perfect'">
    <FlexiTableControls />
    <FlexiTableHeader ref="flexiheader" />
    <FlexiTableBody ref="flexibody" />
    <FlexiTableFooter />
  </div>
  <div v-else>
    <FlexiTableInfo />
  </div>
</template>

<script lang="ts">
import FlexiTableControls from './FlexiTableControls.vue'
import FlexiTableHeader from './FlexiTableHeader.vue'
import FlexiTableBody from './FlexiTableBody.vue'
import FlexiTableFooter from './FlexiTableFooter.vue'
import flexiConfig from '../flexi.config.json'
import FlexiTableInfo from './FlexiTableInfo.vue'
import { computed } from 'vue'
import flexitableExceptionHandler from '../flexitableExceptionHandler'
export default {
  name: 'FlexiTable',
  provide() {
    return {
      flexi: computed(() => this.flexiTableOptions)
    }
  },
  mixins: [flexitableExceptionHandler],
  data() {
    return {
      flexiTableOptions: {}
    }
  },
  created() {
    this.flexiTableOptions.errors = { message: '' }

    if (
      Object.values(this.$attrs)[0]?.columns &&
      Object.values(this.$attrs)[0]?.rows &&
      Object.values(this.$attrs)[0]?.selectedRows
    ) {
      const tableOptions = Object.values(this.$attrs)[0]
      const { columns, selectedRows, rows, options } = tableOptions
      const hasDetails = rows[0]?.details ? true : false
      this.flexiTableOptions = {
        columns,
        selectedRows,
        errors: { message: '' },
        rows: rows[0]?.row ? rows : rows.map((item) => ({ row: item })),
        options: {
          ...flexiConfig,
          ...options,
          hasDetails,
          columnSizes: [
            ...flexiConfig.columnSizes,
            ...Array(Math.max(0, columns.length - flexiConfig.columnSizes.length)).fill(1)
          ]
        }
      }

      // if (
      //   this.flexiTableOptions.options.columnSizes.length < this.flexiTableOptions.columns.length
      // ) {
      //   const missingCount =
      //     this.flexiTableOptions.columns.length - this.flexiTableOptions.options.columnSizes.length
      //   for (let i = 0; i < missingCount; i++) {
      //     this.flexiTableOptions.options.columnSizes.push(1)
      //   }
      // }

      // console.log(Object.values(Object.values(this.$attrs)[0].rows[0].row))
      //console.log(Object.values(Object.values(this.$attrs)[0].rows[0].row).length)

      //sortable Control
      if (!this.flexiTableOptions.options.disableSorting) {
        const sortableParamsExist = this.flexiTableOptions.columns.some(
          (column) => column.sortable == true
        )
        if (sortableParamsExist) {
          this.flexiTableOptions.options.sortableColumns = this.flexiTableOptions.columns
            .filter((column) => column.sortable)
            .map((column) => {
              return column.sortable ? column.label : ''
            })
        } else {
          this.flexiTableOptions.options.sortableColumns = this.flexiTableOptions.columns.map(
            (column) => {
              return column.label
            }
          )
        }
      }
      //Dropdown
      this.flexiTableOptions.columns = this.flexiTableOptions.columns.map((col, index) => {
        return {
          ...col,
          status: !this.flexiTableOptions.options.hiddenColumns.includes(col.label),
          colSizes: this.flexiTableOptions.options.columnSizes[index]
        }
      })
    }
  },
  components: {
    FlexiTableControls,
    FlexiTableHeader,
    FlexiTableBody,
    FlexiTableFooter,
    FlexiTableInfo
  },

  watch: {
    'flexiTableOptions.columns': {
      handler: function () {
        const hidden = []
        this.flexiTableOptions.options.columnSizes = []
        // The hiddenColumns and columnSizes arrays change according to the changes in the flex.columns array.
        Object.keys(this.flexiTableOptions.columns).forEach((column) => {
          if (this.flexiTableOptions.columns[column].status === true) {
            this.flexiTableOptions.options.columnSizes.push(
              this.flexiTableOptions.columns[column].colSizes
            )
          } else {
            hidden.push(this.flexiTableOptions.columns[column].label)
          }
        })

        this.flexiTableOptions.options.hiddenColumns = hidden
      },

      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.flexi-table-c {
  color: #363636;

  ::v-deep {
    div {
    }

    .flexi-table-header-c,
    .flexi-table-body-row {
      display: grid;

      // border: 1px solid #ccc;
      padding: 0.5rem;
    }

    .flexi-table-header-col-wrapper,
    .flexi-table-body-col {
      // border: 1px solid #ccc;
      // border-right: 1px solid #eeeeee;
      // border-radius: 0 !important;
    }

    .flexi-table-header-col-value,
    .flexi-table-body-col-value {
      padding: 0.25rem 1rem;
      // // border: 1px solid #eee;
      // background-color: #ccc;
    }
  }
}
</style>
