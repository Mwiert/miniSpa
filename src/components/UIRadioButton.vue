<template>
  <!--First div checks radio button is disabled and after or not-->
  <div class="reisetech-radio-button-c" :class="[disabled ? 'disabled' : '', after ? 'after' : '']" @click="selectRadioButton">
    <div class="radio-label">{{ IsRadioLabel }}</div>
    <!--Here we check radio button is checked or not with computed radioButtonChecked-->
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
    id: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'powerpuff girls'
    },
    after: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      IsRadioLabel: this.label,
      radioButtonClassName: this.className
    }
  },
  computed: {
    // Check every radio button for checked prop
    radioButtonChecked() {
      return this.modelValue === this.value
    }
  },
  methods: {
    // On click method has 2 emits. First emit makes sure v-model updated
    // Second emit use for user interaction in main page
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

.reisetech-radio-button-c {
  justify-content: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: $padding-large;
  cursor: pointer;

  .radio-label {
    height: 21px;
    margin-right: 8px;
  }

  .radio-button {
    width: 24px;
    height: 24px;
    border: 2px solid black;
    border-radius: 50%;
    position: relative;

    &.checked {
      background-color: black;

      &.flight {
        background-color: $accent-primary-color;
        border: 2px solid $accent-primary-color;
      }

      &.hotel {
        background-color: $secondary-color;
        border: 2px solid $secondary-color;
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 8px;
        height: 8px;
        background-color: white;
        border-radius: 50%;
      }
    }
  }

  &.after {
    flex-direction: row-reverse;

    .radio-label {
      height: 21px;
      margin-left: 8px;
    }

    .radio-button {
      width: 24px;
      height: 24px;
      border: 2px solid black;
      border-radius: 50%;
      position: relative;
    }
  }

  &.disabled {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.3;
  }
}
</style>
