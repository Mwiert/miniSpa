<template>
  <div class="flexi-table-controls-c">
    <!-- Items Per Page -->
    <div class="ftc-select-wrapper">
      <select v-model="flexi.options.itemsPerPage" id="options">
        <option
          v-for="option in flexi.options.itemsPerPageOptions"
          :key="option.id"
          :value="option.name">
          {{ option.name }}
        </option>
      </select>
    </div>

    <!-- <button @click="toggleSelectAll">All</button> -->

    <!-- Search Table -->
    <div class="ftc-search-wrapper" v-if="!flexi.options.hideSearch">
      <input type="text" v-model="flexi.options.searchKeyWord" />
    </div>
  </div>
</template>

<script>
import flexiTableMixin from '../flexitableMixin'
export default {
  name: 'FlexiTableControls',
  inject: ['flexi'],
  mixins: [flexiTableMixin]
}
</script>

<style lang="scss" scoped>
.flexi-table-controls-c {
  display: flex;
  justify-content: space-between;
}
</style>
