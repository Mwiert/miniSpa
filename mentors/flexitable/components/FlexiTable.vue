<template>
  <div class="flexi-table-c" v-if="isDataCorrect() === 'perfect'">
    <FlexiTableControls />
    <FlexiTableContainer ref="container" />
    <FlexiTableFooter />
  </div>
  <div v-else>
    <FlexiTableInfo />
  </div>
</template>

<script lang="ts">
import FlexiTableControls from './FlexiTableControls.vue'

import FlexiTableFooter from './FlexiTableFooter.vue'
import flexiConfig from '../flexi.config.json'
import FlexiTableInfo from './FlexiTableInfo.vue'
import FlexiTableContainer from './FlexiTableContainer.vue'
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
      const columnSizes = options?.columnSizes || flexiConfig.columnSizes
      const filledColumnSizes = [
        ...columnSizes,
        ...Array(Math.max(0, columns.length - columnSizes.length)).fill(1)
      ]
      this.flexiTableOptions = {
        columns,
        selectedRows,
        errors: { message: '' },
        rows: rows.map((item) => {
          let newRow = item.row ? item : { row: item }
          newRow.row = Object.entries(newRow.row).reduce((valToMap, [key, value]) => {
            valToMap[key] =
              typeof value === 'string' || typeof value === 'number'
                ? { value: value || null }
                : value
            return valToMap
          }, {})
          return newRow
        }),
        options: {
          ...flexiConfig,
          ...options,
          hasDetails,
          columnSizes: filledColumnSizes,
          itemsPerPage: options?.selected?.id ?? flexiConfig.selected.id
        }
      }
      //sortable Control
      if (!this.flexiTableOptions.options.disableSorting) {
        this.flexiTableOptions.options.sortableColumns = this.flexiTableOptions.columns
          .filter((column) => column.sortable !== false)
          .map((column) => {
            return column.sortable !== false ? column.label : ''
          })
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
    FlexiTableFooter,
    FlexiTableInfo,
    FlexiTableContainer
  },

  watch: {
    'flexiTableOptions.columns': {
      handler: function () {
        const hidden = []
        this.flexiTableOptions.options.columnSizes = []
        // The hiddenColumns and columnSizes arrays change according to the changes in the flex.columns array.
        Object.keys(this.flexiTableOptions.columns).forEach((column) => {
          this.flexiTableOptions.options.columnSizes.push(
            this.flexiTableOptions.columns[column].colSizes
          )
          if (!this.flexiTableOptions.columns[column].status) {
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
}
</style>
