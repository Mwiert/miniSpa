<template>
  <div class="ui-action-c">
    <div class="ui-dropdown-wrapper">
      <UIDropdown
        v-for="n in Math.min(dropdownNumber, maxDropdownNumber)"
        :key="n"
        v-model="this.flexi.options.selectedStatus"
        :items="flexi.options.status" />
    </div>
    <div class="ui-button-wrapper">
      <UIButton
        v-for="n in buttonNumber"
        :key="n"
        @click="propFunction()"
        :text="label"
        :size="'medium'" />
    </div>
  </div>
</template>

<script lang="ts">
import UIDropdown from '../../../src/components/Dropdown/UIDropdown.vue'
import UIButton from '../../../src/components/UIButton.vue'
import flexiTableMixin from '../flexitableMixin'
export default {
  name: 'FlexiTableActionArea',
  inject: ['flexi'],
  mixins: [flexiTableMixin],
  components: {
    UIDropdown,
    UIButton
  },
  data() {
    return {
      maxDropdownNumber: 2
    }
  },
  props: {
    buttonNumber: {
      type: Number
    },
    dropdownNumber: {
      type: Number
    },
    propFunction: {
      type: Function,
      required: true
    },
    label: {
      type: String
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.ui-action-c {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 3rem;
  gap: 10px;

  .ui-dropdown-wrapper {
    display: flex;
    flex-direction: row;
    gap: 5px;

    width: 100%;
  }
  .ui-button-wrapper {
    display: flex;
    gap: 5px;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
