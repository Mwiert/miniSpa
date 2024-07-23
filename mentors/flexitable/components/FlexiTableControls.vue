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

      <ul class="multi">
        <li v-for="(col, index) in flexi.columns" :key="index" @click="selectHidden(index)">
          {{ col }}
        </li>
      </ul>
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
export default {
  name: 'FlexiTableControls',
  inject: ['flexi'],
  mixins: [flexiTableMixin],
  components: {
    UIDropdown
  },
  methods: {
    selectHidden(index) {
      this.flexi.columns[index].status = !this.flexi.columns[index].status
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
