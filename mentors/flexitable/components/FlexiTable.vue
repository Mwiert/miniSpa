<template>
  <div class="flexi-table-c">
    {{ flexi.rows.length }}
    {{ flexi.options.totalPages }}
    {{ flexi.options.itemsPerPage }}

    <!-- {{ flexi.columns }}
    <br />
    <br />
    {{ flexi.options.columnSizes }} -->
    <FlexiTableControls />
    <FlexiTableHeader ref="flexiheader" />
    <FlexiTableBody ref="flexibody" />
    <FlexiTableFooter />
  </div>
</template>

<script lang="ts">
import FlexiTableControls from './FlexiTableControls.vue'
import FlexiTableHeader from './FlexiTableHeader.vue'
import FlexiTableBody from './FlexiTableBody.vue'
import FlexiTableFooter from './FlexiTableFooter.vue'
import flexiConfig from '../flexi.config.json'
export default {
  name: 'FlexiTable',
  inject: ['flexi'],
  created() {
    this.flexi.options = {
      ...flexiConfig,
      ...this.flexi.options
    }

    //sortable Control
    if (!this.flexi.options.disableSorting) {
      const sortableParamsExist = this.flexi.columns.some((column) => column.sortable == true)
      if (sortableParamsExist) {
        this.flexi.options.sortableColumns = this.flexi.columns
          .filter((column) => column.sortable)
          .map((column) => {
            return column.sortable ? column.label : ''
          })
      } else {
        this.flexi.options.sortableColumns = this.flexi.columns.map((column) => {
          return column.label
        })
      }
    }
    //Dropdown
    this.flexi.columns = this.flexi.columns.map((col, index) => {
      return {
        ...col,
        status: !this.flexi.options.hiddenColumns.includes(col.label),
        colSizes: this.flexi.options.columnSizes[index]
      }
    })
  },
  components: {
    FlexiTableControls,
    FlexiTableHeader,
    FlexiTableBody,
    FlexiTableFooter
  },

  watch: {
    'flexi.columns': {
      handler: function () {
        const hidden = []
        this.flexi.options.columnSizes = []
        // The hiddenColumns and columnSizes arrays change according to the changes in the flex.columns array.
        Object.keys(this.flexi.columns).forEach((column) => {
          if (this.flexi.columns[column].status === true) {
            this.flexi.options.columnSizes.push(this.flexi.columns[column].colSizes)
          } else {
            hidden.push(this.flexi.columns[column].label)
          }
        })

        this.flexi.options.hiddenColumns = hidden
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
