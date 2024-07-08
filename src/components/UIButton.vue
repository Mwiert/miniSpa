<template>
  <button :class="['reisetech-btn', `reisetech-btn__${btnClassName}`]" :disabled="isDisabled">
    <span v-if="icon" :class="['icon', btnIcon]"></span>
    <span v-if="isSpinnerActive" class="spinner"></span>
    <span v-else>{{ btnText }}</span>
  </button>
</template>

<script lang="ts">
export default {
  name: 'UIButton',
  props: {
    className: String,
    text: String,
    isRouter: Boolean,
    routerUrl: String,
    Object,
    icon: String,
    isSpinnerActive: Boolean,
    isDisabled: Boolean
  },
  components: {},
  data() {
    return {
      btnClassName: this.className,
      btnText: this.text,
      btnIcon: this.icon
    }
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/main.scss';

.reisetech-btn {
  width: 100%;
  height: 48px;
  border-radius: 24px;
  font-size: 16px;
  background-color: transparent;
  border: 2px;
  color: black;
  cursor: pointer;
  padding: $padding-medium;
  text-align: center;
  border: 2px solid black;

  &__flight {
    background-color: $primary-color;
    border: none;
    color: white;
    &.outline {
      background-color: white;
      color: $primary-color;
      border: 2px solid $primary-color;
      text-align: center;
    }
  }
  &__hotel {
    background-color: $secondary-color;
    border: none;
    color: white;
    &.outline {
      background-color: white;
      color: $secondary-color;
      border: 2px solid $secondary-color;
    }
  }

  &:hover {
    background: $accent-primary-color;
    border: none;
    color: white;
  }
}
</style>
