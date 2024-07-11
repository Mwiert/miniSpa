<template>
  <div
    class="radio-button-container-c"
    @click="selectRadioButton"
    :class="[disabled ? 'disabled' : '', after ? 'after' : '']"
  >
    <div class="radio-label">{{ IsRadioLabel }}</div>
    <div
      class="radio-button"
      :class="[radioButtonClassName, radioButtonChecked ? 'checked' : '']"
    ></div>
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
    disabled: Boolean,
    value: String,
    modelValue: String
  },
  data() {
    return {
      IsRadioLabel: this.label,
      radioButtonClassName: this.className
    }
  },
  computed: {
    radioButtonChecked() {
      return this.modelValue === this.value
    }
  },
  methods: {
    selectRadioButton() {
      if (this.disabled) return
      this.$emit('update:modelValue', this.value)
      this.$emit('selectRadioButton', this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/main.scss';

.radio-button-container-c {
  justify-content: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  padding: $padding-small;

  .radio-label {
    margin-right: 8px;
  }

  .radio-button {
    width: 20px;
    height: 20px;
    border: 2px solid black;
    border-radius: 50%;
    position: relative;

    &.checked {
      background-color: black;

      &.hotel {
        background-color: $secondary-color;
        border: 2px solid $secondary-color;

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 10px;
          height: 10px;
          background-color: white;
          border-radius: 50%;
        }
      }

      &.flight {
        background-color: $primary-color;
        border: 2px solid $primary-color;

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 10px;
          height: 10px;
          background-color: white;
          border-radius: 50%;
        }
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        background-color: white;
        border-radius: 50%;
      }
    }
  }

  &.after {
    flex-direction: row-reverse;

    .radio-label {
      margin-left: 8px;
    }

    .radio-button {
      width: 20px;
      height: 20px;
      border: 2px solid black;
      border-radius: 50%;
      position: relative;

      &.checked::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        background-color: white;
        border-radius: 50%;
      }
    }
  }

  &.disabled {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.6;
  }
}
</style>
