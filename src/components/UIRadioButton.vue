<template>
  <div
    class="radio-button-container-c"
    @click="selectRadioButton()"
    :class="[disabled ? 'disabled' : '', after ? 'after' : '']"
  >
    <div
      class="radio-button"
      :class="[radioButtonClassName, radioButtonChecked ? 'checked' : '']"
    ></div>
    <div class="radio-label">{{ IsRadioLabel }}</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UIRadioButton',
  props: {
    id: String,
    label: String,
    after: Boolean,
    className: String,
    checked: Boolean,
    disabled: Boolean
  },
  data() {
    return {
      IsRadioLabel: this.label,
      radioButtonClassName: this.className,
      radioButtonChecked: this.checked
    }
  },
  methods: {
    selectRadioButton() {
      this.radioButtonChecked = !this.radioButtonChecked
      this.$emit('selectRadioButton', this.checked)
    }
  }
}
</script>

<style lang="scss" scoped>
.radio-button-container-c {
  justify-content: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  .radio-button {
    width: 20px;
    height: 20px;
    border: 2px solid black;
    border-radius: 50%;
    &.checked {
      width: 20px;
      height: 20px;
      border: 2px solid violet;
      border-radius: 50%;
    }
  }
  &.after {
    flex-direction: row-reverse;
    .radio-button {
      width: 20px;
      height: 20px;
      border: 2px solid black;
      border-radius: 50%;
      &.checked {
        width: 20px;
        height: 20px;
        border: 2px solid violet;
        border-radius: 50%;
      }
    }
  }
}
</style>
