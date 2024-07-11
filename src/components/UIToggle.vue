<template>
  <div class="ui-toggle-c" :class="{ labelAfter: after }" @click="toggle">
    <div :for="id" class="toggle-label">{{ label }}</div>
    <div class="toggle-switch">
      <div :class="['toggle-slider', { checked }]"></div>
    </div>
    <span v-if="after">{{ after }}</span>
  </div>
</template>

<script script lang="ts">
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
    name: {
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
    }
  },

  methods: {
    toggle() {
      if (!this.disabled) {
        this.$emit('update:checked', !this.checked)
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
  border: 2px solid black;
  width: fit-content;
  border-radius: 30px;
  padding: 10px 15px;

  &.labelAfter {
    flex-direction: row-reverse;
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
  transition: 0.4s;
  cursor: pointer;
}

.toggle-slider {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 14px;
  height: 14px;
  background-color: white;
  border-radius: 50%;
  transition: 0.4s;

  &.checked {
    background-color: $primary-color;
    transform: translateX(20px);

    &.checked .label-after {
      background-color: aqua;
    }
  }
}
</style>
