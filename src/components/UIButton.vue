<template>
  <button :class="['reisetech-btn', `reisetech-btn__${className}`]" :disabled="isDisabled">
    <span v-if="icon" :class="['icon', icon]"></span>
    <span v-if="isSpinnerActive" class="spinner"></span>
    <span v-else>{{ text }}</span>
  </button>
</template>

<script lang="ts">
export default {
  name: 'UIButton',
  props: {
    className: String,
    text: String,
    isRouter: Boolean,
    routerUrl: String, Object,
    icon: String,
    isSpinnerActive: Boolean,
    isDisabled: Boolean
  },
  components: {},
  data() {
    return {}
  },
  created() { },
  mounted() { },
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
  background-color: #FFFFFF;
  color: white;
  cursor: pointer;
  padding: $padding-medium;
  border:none;

  &__flight{
    background-color: $primary-color;
  }

  &:hover {
    background: $accent-primary-color;
    border: none;
    color: white;
  }
}

.outline {
  background-color: white;
  color: $primary-color;
  border: 2px solid $primary-color;
}
</style>