<template>
  <!-- Bu kısım değişecek tabiki de deneme maksatlı böyle duruyor.-->
  <div v-html="flexi.errors.message"></div>
</template>

<script lang="ts">
import flexitableExceptionHandler from '../flexitableExceptionHandler'
export default {
  name: 'FlexiTableInfo',
  mixins: [flexitableExceptionHandler],
  inject: ['flexi']
}
</script>

<style lang="scss" scoped></style>
