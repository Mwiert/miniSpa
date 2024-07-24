<template>
  <div class="flexi-table-controls-c">
    <!-- Items Per Page -->
    <div class="ftc-select-wrapper">
        -nazli-{{ flexi.options.selected }}
        <UIEnumDropdown
        v-model="flexi.options.selected"
        :items="[flexi.options.EInternSingleComponentType]"
        :enumObj="flexi.options.EInternSingleComponentType"
        :label ="flexi.options.UIDropdownOrderProp.label"
        :dataSize="flexi.options.UIDropdownOrderProp.dataSize"
        :fontSize="flexi.options.UIDropdownOrderProp.fontSize"
        :placeHolder="flexi.options.UIDropdownOrderProp.placeHolder"        
       />

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
import UIEnumDropdown from '../../../src/components/Dropdown/UIEnumDropdown.vue'
export default {
  name: 'FlexiTableControls',
  inject: ['flexi'],
  mixins: [flexiTableMixin],
  components: {
    UIEnumDropdown
  },
  methods: {
    selectHidden(index) {
      this.flexi.columns[index].status = !this.flexi.columns[index].status
    }
  },
  watch:{
    'flexi.options.selected': {
      handler: function (val) {
        this.flexi.options.pages = []
        this.flexi.options.itemsPerPage = val.id
        
      },
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
