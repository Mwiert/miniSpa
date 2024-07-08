<template>
  <span>
    <button class="ui-button-c">Button Label Deneme</button>
  </span>

  <span>
    <button class="ui-button-c outline">Button Label</button>
  </span>

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


.ui-button-c {
  width: 100%;
  height: 48px;
  border-radius: 24px;
  font-size: 16px;
  background-color: $primary-color;
  color: white;
  cursor: pointer;
  padding: $padding-medium;

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