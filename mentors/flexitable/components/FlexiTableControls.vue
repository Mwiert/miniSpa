<template>
  <div class="flexi-table-controls-c">
    <!-- Items Per Page -->
    <div class="ftc-select-wrapper">
      <UIDropdown
        v-model="selectedItems"
        :items="this.flexi.options.itemsPerPageOptions"
        :fontSize="fontSize"
        displayField="name"
        urlField=""
        :dataSize="dataSize"
        primaryKey="id"
        :placeHolder="placeHolder" />
      <UIMultiDropdown
        v-model="selectedColumns"
        :items="this.flexi.columns"
        :fontSize="fontSize"
        displayField="name"
        :dataSize="dataSize"
        maxVisibleItems="3"
        primaryKey="id"
        searchable />
    </div>

    <!-- Search Table -->
    <div class="ftc-search-wrapper" v-if="!flexi.options.hideSearch">
      <input type="text" v-model="flexi.options.searchKeyWord" />
    </div>
  </div>
</template>

<script>
import flexiTableMixin from '../flexitableMixin'
import UIDropdown from '../../../src/components/Dropdown/UIDropdown.vue'
import UIMultiDropdown from '../../../src/components/Dropdown/UIMultiDropdown.vue'
export default {
  name: 'FlexiTableControls',
  inject: ['flexi'],
  mixins: [flexiTableMixin],
  components: {
    UIMultiDropdown,
    UIDropdown
  },
  data() {
    return {
      selectedItems: this.flexi.options.itemsPerPageOptions[0],
      selectedColumns: this.flexi.options.dropdownHiddenColumns
    }
  },
  watch: {
    selectedColumns: {
      handler(val) {
        const labels = val.map((column) => column.label)
        this.flexi.options.hiddenColumns = labels
      },
      deep: true
    },
    selectedItems: {
      handler: function (val) {
        console.log(val)
        this.flexi.options.itemsPerPage = val.name
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.flexi-table-controls-c {
  display: flex;
  justify-content: space-between;
}
</style>
