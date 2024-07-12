<template>
  <div class="ui-toggle-c" :class="{ labelAfter: after, disabled: disabled }" @click="toggle">
    <div :id="id" class="toggle-label">
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
    id: {
      type: String
    },
    label: {
      type: String,
      default: 'PowerPuffGirls'
    },
    after: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
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

.ui-toggle-c {
  display: flex;
  align-items: center;
  width: fit-content;
  border-radius: 30px;
  padding: 10px 15px;
  user-select: none;
  pointer-events: none;

  &.labelAfter {
    flex-direction: row-reverse;
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
  pointer-events: all;
  cursor: pointer;

  &.checked {
    background-color: $accent-primary-color;
  }
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
    background-color: $primary-color;
    transform: translateX(20px);
  }
}
</style>
