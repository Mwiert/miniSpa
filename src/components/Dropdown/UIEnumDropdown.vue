<template>
  <UIMultiDropdown
    v-if="isMulti"
    v-model="selectedItems"
    :items="dropdownItems"
    :className="className"
    :placeHolder="placeHolder"
    :displayField="displayField"
    :fontSize="fontSize"
    :label="label"
    :dataSize="dataSize"
    :searchable="searchable"
    :maxVisibleItems="maxVisibleItems"
    :hasActionBox="hasActionBox"
    :sortField="sortField"
    :sortByAscending="sortByAscending"
    :maxItemThreshold="maxItemThreshold"
    :disabled="disabled"
    @update:modelValue="($event) => $emit('update:modelValue', $event)" />
  <UIDropdown
    v-else
    v-model="selectedItem"
    :items="dropdownItems"
    :label="label"
    :placeHolder="placeHolder"
    :displayField="displayField"
    :fontSize="fontSize"
    :searchable="searchable"
    :dataSize="dataSize"
    :sortField="sortField"
    :sortByAscending="sortByAscending"
    :maxItemThreshold="maxItemThreshold"
    :unselectable="unselectable"
    :disabled="disabled"
    @update:modelValue="($event) => $emit('update:modelValue', $event)" />
</template>

<script lang="ts">
import UIDropdown from '../Dropdown/UIDropdown.vue'
import UIMultiDropdown from '../Dropdown/UIMultiDropdown.vue'

export default {
  name: 'UIEnumDropdown',
  components: {
    UIDropdown,
    UIMultiDropdown
  },
  props: {
    enumObj: { type: Object, default: () => {}, required: true },

    dataSize: {
      // how many data will shown in the dropdown.
      type: Number
    },
    maxVisibleItems: {
      type: Number,
      default: 1
    },

    hasActionBox: {
      type: Boolean
    },
    className: {
      type: String,
      default: 'flight'
    },
    modelValue: {
      type: [Array, Object],
      default: () => []
    },

    label: {
      type: String
    },

    fontSize: {
      type: Number,
      default: 14
    },
    placeHolder: {
      type: String,
      default: 'Select an item'
    },
    searchable: {
      type: Boolean,
      default: false
    },

    displayField: {
      // takes the name of the chosen id
      type: String,
      default: 'name'
    },
    unselectable: {
      type: Boolean,
      default: false
    },

    isMulti: { type: Boolean, default: false },
    showAll: { type: Boolean, default: false },
    showUnknown: { type: Boolean, default: false },
    sortField: { type: String },
    sortByAscending: { type: Boolean, default: false },
    maxItemThreshold: { type: Number, default: 15 },
    disabled: { type: Boolean, default: false }
  },
  data() {
    return {
      selectedItems: this.modelValue as Array<Object>,
      dropdownItems: this.getEnumFile(),
      selectedItem: this.modelValue
    }
  },
  methods: {
    //takes enum object and sorts it.
    getEnumFile(): Array<{ id: number; name: string }> {
      let sortedEnumArray = Object.keys(this.enumObj)
        .map(Number)
        .filter(
          (key) => !isNaN(key) && (this.showAll || key !== -1) && (this.showUnknown || key !== 0)
        )
        .map((key) => ({
          id: key,
          name: this.enumObj[key]
        }))

      return sortedEnumArray
    }
  }
}
</script>

<style lang="scss" scoped></style>
