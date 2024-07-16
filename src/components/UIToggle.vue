<template>
  <div
    class="reisetech-toogle-c"
    :class="{ labelAfter: after, disabled: disabled }"
    @click="toggle"
  >
    <div class="toggle-label">
      {{ label }}
    </div>
    <div class="toggle-switch" :class="{ checked: checked }">
      <div class="toggle-slider" :class="{ checked: checked }"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UIToggle',
  props: {
    //ID for the toggle element
    id: {
      type: String
    },
    //The text displayed next to the toggle switch
    label: {
      type: String,
      default: 'Toggle'
    },
    // Determines if the label is positioned after the switch
    after: {
      type: Boolean,
      default: false
    },
    // Determines if the toggle switch is in the checked state
    checked: {
      type: Boolean,
      default: false
    },
    // Determines if the toggle switch is disabled
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // Method to toggle the switch state, emitting an event if not disabled
    toggle() {
      if (!this.disabled) {
        this.$emit('switchToggle', !this.checked)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/main.scss';

.reisetech-toogle-c {
  display: flex;
  align-items: center;
  width: fit-content; // Width adjusts to the content
  padding: 10px 15px;
  cursor: pointer;
  pointer-events: all; // Disables pointer events on the container

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
      background-color: $accent-secondary-color;
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
        transform 0.4s,
        background-color 0.4s;

      &.checked {
        background-color: $accent-primary-color;
        transform: translateX(20px); // Moves the slider to the right when checked
      }
    }
  }
}
</style>
