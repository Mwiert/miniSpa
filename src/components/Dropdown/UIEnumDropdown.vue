<template>
  <div>
    <UIMultiDropdown
      v-if="isMulti"
      v-model="selectedPets"
      :items="pets"
      :fontSize="fontSize"
      displayField="name"
      urlField="imageUrl"
      :label="label"
      :dataSize="dataSize"
      searchable
      maxVisibleItems="2"
      primaryKey="id"
      :hasActionBox="true"
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
    isMulti: Boolean,
    isSingle: Boolean,
    enumObj: {},
    label: String
  },
  data() {
    return {
      enumFile: []
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
      return sortedEnumArray
    }
  },
  created() {
    this.enumFile = this.getEnumFile()
  }
}
</script>

<style lang="scss" scoped></style>
