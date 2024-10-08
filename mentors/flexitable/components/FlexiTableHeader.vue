<template>
  <thead class="flexi-table-header-c" :class="StickyHeaderClass" ref="printHeader">
    <tr>
      <template v-for="(column, index) in flexi.columns" :key="column.name">
        <th
          class="table-head-c"
          :style="{ width: gridTemplateColumns1[index] }"
          v-if="HideColumn(column.label)">
          <div class="flexi-table-header-col-wrapper">
            <div
              class="flexi-table-header-col"
              :class="[column.class, { 'flexi-table-header-col-id': column.label === 'id' }]"
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
      </template>
    </tr>
  </thead>
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
      this.FlexiBodyItemsPerPage.forEach((row) => {
        row.row.id.value = this.masterCheckbox
      })
      const selected = this.flexi.rows.filter((row) => {
        return Object.values(row.row).some((col) => col.checkbox && col.value)
      })
      this.pushelements = !this.pushelements
      this.flexi.selectedRows.length = 0
      this.flexi.selectedRows.push(...selected)
    }
  }
}
</script>

<style lang="scss" scoped>
.flexi-table-header-c {
  background-color: #faf4d9;
  height: 40px;

  &.sticky-header {
    position: sticky;
    top: 0;
  }

  .table-head-c {
    padding: 0;
    height: 40px;

    .flexi-table-header-col-wrapper {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-weight: 500;
      height: 40px;

      .flexi-table-header-col {
        border-right: 1px solid rgba(112, 112, 112, 0.14);
        display: flex;
        align-items: center;
        height: 40px;
        justify-content: space-between;
        width: 100%;

        &-value {
          margin-left: 8px;
        }

        &-id {
          justify-content: center;
        }

        .icon-c {
          background-color: rgba(36, 55, 89, 0.06);
          width: 16px;
          height: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 8px;

          .svg-icon-c {
            padding: 0;

            &:hover {
              background: rgba(36, 55, 89, 0.06);
            }
          }
        }
      }
    }
  }
}
</style>
