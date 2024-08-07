<template>
  <div>
    <table>
      <FlexiTableHeader1 />
      <FlexiTableBody1 />
    </table>
  </div>
</template>

<script lang="ts">
import FlexiTableHeader1 from './FlexiTableHeader1.vue'
import FlexiTableBody1 from './FlexiTableBody1.vue'

export default {
  name: 'FlexiTable',
  inject: ['flexi'],

  components: {
    FlexiTableHeader1,
    FlexiTableBody1
  }
}
</script>
