<template>
  <div
    class="reisetech-checkbox-c"
    :class="[after ? 'after' : 'before', disabled ? 'disabled' : '']"
    :id="id"
    :name="name"
    @click="handleClick">
    <div v-if="!isChecked" class="checkbox" :class="className"></div>
    <div v-else class="checkbox--checked" :class="className">
      <SvgIcon :name="'tick'" class="icon" />
    </div>
    <div class="label">{{ label }}</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UICheckBox',
  props: {
    className: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    after: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
      type: String
    }
  },
  data() {
    return {
      isChecked: this.modelValue
    }
  },
  watch: {
    checked(newValue) {
      this.isChecked = newValue
    }
  },
  methods: {
    //Emits true or false according to the checked state of the checkbox. Returns true if checked, false if unchecked
    handleClick() {
      if (this.disabled) return
      this.isChecked = !this.isChecked
      this.$emit('update:modelValue', this.isChecked)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/main.scss';
$flight-color: #5cb7f9;
//Color parameters for icon's color change
$flight-color-filter: invert(68%) sepia(10%) saturate(4826%) hue-rotate(182deg) brightness(99%)
  contrast(94%);
$hotel-color-filter: invert(66%) sepia(84%) saturate(4705%) hue-rotate(353deg) brightness(101%)
  contrast(106%);

.reisetech-checkbox-c {
  justify-content: center;
  display: flex;
  align-items: center;
  user-select: none;
  margin-bottom: 8px;
  margin-right: 24px;
  cursor: pointer;

  &.before {
    flex-direction: row;
  }

  &.after {
    flex-direction: row-reverse;

    .checkbox {
      cursor: pointer;
      margin-right: 0;
      margin-left: 8px;

      &--checked {
        margin-right: 0;
        margin-left: 8px;
      }
    }
  }

  .checkbox {
    cursor: pointer;
    width: 22px;
    height: 22px;
    border: 3px solid #cacaca;
    margin-right: 8px;
    transition: background-color 0.2s;
    border-radius: 20%;

    &--checked {
      cursor: pointer;
      width: 22px;
      height: 22px;
      margin-right: 8px;
      transition: background-color 0.2s;
      position: relative;
      border: 3px solid black;
      border-radius: 20%;

      &.hotel {
        border: 3px solid $secondary-color;
        box-shadow: 0 0 4px $secondary-color;

        .icon {
          filter: $hotel-color-filter;
        }
      }

      &.flight {
        border: 3px solid $flight-color;
        box-shadow: 0 0 4px $flight-color;

        .icon {
          filter: $flight-color-filter;
        }
      }

      .icon {
        width: 11px;
        height: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 0;
      }
    }
  }

  .label {
    color: #363636;
    font-size: 16px;
  }

  &.disabled {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.4;
  }
}
</style>
