<template>
  <div class="toggle-container">
    <div
      class="reisetech-toggle-c"
      :class="{ labelAfter: after, disabled: disabled }"
      @click="toggle">
      <div class="toggle-label">
        {{ label }}
      </div>
      <div class="toggle-switch" :class="{ checked: modelValue }">
        <div class="toggle-slider" :class="{ checked: modelValue }"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UIToggle',
  props: {
    //The text displayed next to the toggle switch
    label: {
      type: String,
      default: 'Toggle'
    },
    after: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: String
    }
  },
  methods: {
    // Method to toggle the switch state, emitting an event if not disabled
    toggle() {
      if (!this.disabled) {
        this.$emit('update:modelValue', !this.modelValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/main.scss';

.toggle-container {
  user-select: none;
  display: flex;
  flex-direction: column; // Makes all toggles stack vertically

  .reisetech-toggle-c {
    display: flex;
    align-items: center;
    justify-content: space-between; // Ensures label and switch are on the same line
    width: 100%; // Adjusts to the full width of the container
    max-width: 165px;
    padding: 10px 15px;
    pointer-events: all; // Disables pointer events on the container
    cursor: pointer;
    margin-bottom: 10px; // Adds space between toggle items

    &.labelAfter {
      flex-direction: row-reverse; // Reverses the order of children elements
    }
    &.disabled {
      opacity: 0.5;

      .toggle-switch {
        cursor: not-allowed !important;
        background-color: #ccc;
      }
      .toggle-slider {
        background-color: #fff;
      }
    }

    .toggle-label {
      margin-right: 10px;
    }

    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 20px;
      background-color: #ccc;
      border-radius: 20px;
      transition: background-color 0.4s;
      pointer-events: all; // Enables pointer events
      cursor: pointer; // Changes cursor to pointer

      &.checked {
        background-color: $accent-primary-color;
        box-shadow: 0 0 4px $accent-primary-color;
      }

      .toggle-slider {
        position: absolute;
        top: 3px;
        left: 3px;
        width: 14px;
        height: 14px;
        background-color: white;
        border-radius: 50%;
        transition:
          transform 0.7s,
          background-color 0.7s;

        &.checked {
          background-color: white;
          transform: translateX(20px); // Moves the slider to the right when checked
          box-shadow: 0 1px 2px gray;
        }
      }
    }
  }
}
</style>
