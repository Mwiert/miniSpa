<template>
  <div>
    <UIMultiDropdown
      v-if="isMulti"
      v-model="selectedItems"
      :items="dropdownItems"
      :fontSize="fontSize"
      :displayField="displayField"
      :urlField="urlField"
      :label="label"
      :dataSize="dataSize"
      searchable
      :maxVisibleItems="maxVisibleItems"
      :primaryKey="primaryKey"
      :hasActionBox="hasActionBox"
      :sortField="sortField"
      :sortByAscending="sortByAscending"
      @update:modelValue="($event) => $emit('update:modelValue', $event)" />
    <UIDropdown
      v-else
      v-model="selectedItem"
      :items="dropdownItems"
      :label="label"
      :fontSize="fontSize"
      :displayField="displayField"
      :urlField="urlField"
      searchable
      :dataSize="dataSize"
      :primaryKey="primaryKey"
      :sortField="sortField"
      :sortByAscending="sortByAscending"
      @update:modelValue="($event) => $emit('update:modelValue', $event)" />
  </div>
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
    items: {
      // items in the database.
      type: Array,
      required: true,
      default: () => []
    },
    primaryKey: {
      type: String,
      required: true,
      default: 'id'
    },
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
      // label on the dropdown to understand what the dropdown contents are.
      type: String
    },

    fontSize: {
      // defined fontsize shown in the dropdown.
      type: Number,
      default: 14
    },
    placeHolder: {
      // placeHolder before the selection.
      type: Array,
      default: () => ['Select an item']
    },
    searchable: {
      // in many results user can find what he/she looks for.
      type: Boolean,
      default: false
    },

    displayField: {
      // takes the name of the chosen id
      type: String,
      default: 'name'
    },

    urlField: {
      // picture of the object taken here
      type: String,
      default: ''
    },
    isMulti: { type: Boolean, default: false },
    enumObj: { type: Object, default: () => {} },
    showAll: { type: Boolean, default: false },
    showUnknown: { type: Boolean, default: false },
    sortField: { type: String },
    sortByAscending: { type: Boolean, default: false }
  },
  data() {
    return {
      selectedItems: this.modelValue,
      dropdownItems: this.getEnumFile(),
      selectedItem: this.modelValue
    }
  },
  methods: {
    getEnumFile() {
      let sortedEnumArray = Object.keys(this.enumObj)
        .map(Number)
        .filter(
          (key) =>
            !isNaN(key) &&
            (!isNaN(key) || (this.showAll && key == -1) || (this.showUnknown && key == 0))
        )
        .sort()
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
