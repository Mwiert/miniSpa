<template>
  <div>
    <UIMultiDropdown
      v-if="isMulti"
      v-model="selectedItems"
      :items="dropdownItems"
      :fontSize="fontSize"
      displayField="name"
      urlField="imageUrl"
      :label="label"
      :dataSize="dataSize"
      searchable
      maxVisibleItems="2"
      primaryKey="id"
      :hasActionBox="true"
      @update:modelValue="($event) => $emit('update:modelValue', $event)"
    />
    <UIDropdown
      v-if="isSingle"
      v-model="selectedItem"
      :items="items"
      :label="label"
      :fontSize="fontSize"
      displayField="name"
      urlField="imageUrl"
      searchable
      :dataSize="dataSize"
      primaryKey="id"
      @update:modelValue="($event) => $emit('update:modelValue', $event)"
    />
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
      type: String,
      default: '1'
    },

    hasActionBox: {
      type: Boolean
    },
    className: {
      type: String,
      default: 'flight'
    },
    modelValue: {
      type: Array,
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
    isSingle: { type: Boolean, default: false },
    enumObj: { type: Object, default: () => {} },
    showAll: { type: Boolean, default: false },
    showUnknown: { type: Boolean, default: false }
  },
  data() {
    return {
      enumFile: [],
      selectedItems: this.modelValue,
      dropdownItems: this.items,
      selectedItem: this.modelValue[0]
    }
  },
  methods: {
    getEnumFile() {
      let sortedEnumArray = Object.keys(this.enumObj)
        .map(Number)
        .filter((key) => !isNaN(key))
        .sort()
        .map((key) => ({
          id: key.toString(),
          name: this.enumObj[key]
        }))

      if (!this.showAll) {
        sortedEnumArray = sortedEnumArray.filter((item) => item.id !== '-1')
      }

      if (!this.showUnknown) {
        sortedEnumArray = sortedEnumArray.filter((item) => item.id !== '0')
      }

      return sortedEnumArray
    }
  }
}
</script>

<style lang="scss" scoped></style>
