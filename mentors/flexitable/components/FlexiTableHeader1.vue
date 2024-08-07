<template>
  <div class="a" :class="StickyHeaderClass">
    <th class="table-head-c" v-for="column in flexi.columns" :key="column.name">
      <div class="flexi-table-header-col-wrapper" v-if="HideColumn(column.label)">
        <div
          class="flexi-table-header-col"
          :class="column.class"
          @click="handlerSortingColumn(column)">
          <span class="flexi-table-header-col-value"> {{ column.name }} </span>

          <input
            v-if="column.label === 'id'"
            type="checkbox"
            v-model="masterCheckbox"
            @change="handleMasterCheckboxChange"
            @click.stop="innerClick" />

          <template v-if="flexi.options.sortableColumns.includes(column.label)">
            <div class="icon-c">
              <SvgIcon name="filter-sortable" size="xs" v-if="column.label != sortedColumn" />
              <SvgIcon name="filter-asc" size="xs" v-else-if="sortOrder == 1" />
              <SvgIcon name="filter-desc" size="xs" v-else />
            </div>
          </template>
        </div>
      </div>
    </th>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat' // dd/mm/yyyy dd.mm.yyyy
import flexiTableMixin from '../flexitableMixin'
export default {
  name: 'FlexiTableHeader',
  inject: ['flexi'],
  mixins: [flexiTableMixin],
  data() {
    return {
      sortOrder: 1, // 1 for ascending, -1 for descending
      sortedColumn: null,
      masterCheckbox: false
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
    handleMasterCheckboxChange() {
      this.flexi.rows.forEach((row) => {
        row.row.id.value = this.masterCheckbox
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.flexi-table-header-c {
  border-radius: 12px;
  display: flex;

  &.sticky-header {
    background-color: #faf4d9;
    position: sticky;
    top: 0;
    height: 40px;
  }
  .table-head-c {
    display: flex;
  }
}
</style>
