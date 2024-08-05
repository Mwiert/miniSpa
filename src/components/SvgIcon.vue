<template>
  <div class="svg-icon-c" :class="`icon-size-${size}`">
    <img :src="iconContent" :alt="`icon-${name}`" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      default: 'x'
    },
    size: {
      type: String,
      default: 'm'
    }
  },
  data() {
    return {
      iconContent: new URL(`../assets/icons/${this.name}.svg`, import.meta.url).href
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon-c {
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: inline-flex;

  &.icon-size-s {
    width: 22px;
    height: 22px;
  }
  &.icon-size-m {
    width: 28px;
    height: 28px;
  }
  &.icon-size-l {
    width: 32px;
    height: 32px;
  }

  &:hover {
    background: #e6e8ec;
  }
}
</style>
