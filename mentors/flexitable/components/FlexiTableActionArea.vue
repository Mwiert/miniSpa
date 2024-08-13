<template>
  <div class="ui-action-c">
    <div class="ui-dropdown-wrapper">
      <!-- Render dropdowns -->
      <div v-for="(dropdown, index) in limitedDropdowns" :key="index">
        <UIDropdown v-model="dropdown.selected" :items="dropdown.options" />
      </div>
    </div>
    <div class="ui-button-wrapper">
      <!-- Render buttons -->
      <UIButton
        v-for="(button, index) in buttons"
        :key="index"
        :text="button.label"
        @click="button.function" />
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
  props: {
    buttons: {
      type: Array,
      default: () => []
    },
    dropdowns: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    limitedDropdowns() {
      return this.dropdowns.slice(0, Math.min(this.dropdowns.length, 2))
    }
  }
}
</script>

<style lang="scss">
.ui-action-c {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  // padding: 0 3rem;
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
