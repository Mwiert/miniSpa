<template>
  <div
    class="reisetech-checkbox-c"
    :class="[after ? 'after' : 'before', disabled ? 'disabled' : '']"
    :id="checkboxId"
    :name="name"
    @click="handleClick">
    <div v-if="!checkboxChecked" class="checkbox" :class="checkboxClassName"></div>
    <div v-else class="checkbox--checked" :class="checkboxClassName">
      <SvgIcon :name="'tick'" class="icon" />
    </div>
    <div class="label">{{ checkboxLabel }}</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UICheckBox',
  props: {
    //Classes such as hotel and flight are derived from the .reisetech-checkbox class.
    // .reisetech-checkbox class has the default css style, but the appearance of the checkbox changes depending on the incoming flight and hotel class.
    className: {
      type: String,
      default: ''
    },

    //label is the text of the checkboxes
    label: {
      type: String,
      default: ''
    },
    //If after state is true, checkbox takes 'after' which means the label will take place before the checkbox's box, otherwise and default it will take 'before' which means the box will take place before the label
    after: {
      type: Boolean,
      default: false
    },
    //name is name of the checkbox
    name: {
      type: String,
      default: ''
    },
    //if checkbox is checked the 'checked' prop will be true, otherwise and default is false
    checked: {
      type: Boolean,
      default: false
    },
    //if disabled prop is true the checkbox will be non-interactive, otherwise and default it is false
    disabled: {
      type: Boolean,
      default: false
    },
    //id is for each checkbox item to be marked with
    id: {
      type: String
    }
  },
  data() {
    return {
      checkboxClassName: this.className,
      checkboxLabel: this.label,
      checkboxId: this.id,
      checkboxChecked: this.checked,
      checkboxName: this.name
    }
  },
  watch: {
    checked(newValue) {
      this.checkboxChecked = newValue
    }
  },
  methods: {
    //Emits true or false according to the checked state of the checkbox. Returns true if checked, false if unchecked
    handleClick() {
      if (this.disabled) return
      this.checkboxChecked = !this.checkboxChecked
      this.$emit('update:checked', this.checkboxChecked)
      this.$emit('takeCheckedInfo', this.checkboxChecked)
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
        width: 9px;
        height: 8px;
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
