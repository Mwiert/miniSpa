<template>
  <div class="input-box-c">
    <div class="input-wrapper" :class="{ 'no-clear-button': !clearButton }">
      <div class="icon-wrapper" :class="{ 'icon-left': clearButton, 'icon-right': !clearButton }">
        <SvgIcon
          v-if="icon"
          :key="computedIcon"
          class="icon"
          :name="computedIcon"
          @click="togglePasswordVisibility" />
      </div>
      <input
        class="input-value"
        :class="[{ active: isFocused }, { 'no-clear-button': !clearButton }]"
        :type="isPassword ? (showPassword ? 'text' : 'password') : text"
        :id="id"
        :label="label"
        :maxLength="maxLength"
        :minLength="minLength"
        :disabled="disabled"
        v-model="inputValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="handleFocus"
        @blur="handleBlur" />
      <label
        v-if="label"
        class="label"
        :class="[{ active: isFocused }, { 'no-clear-button': !clearButton }]">
        {{ label }}
      </label>
      <SvgIcon
        v-if="inputValue && clearButton"
        class="clear-btn"
        :name="'x'"
        :size="'s'"
        @click="clearInput" />
    </div>
  </div>
</template>

<script lang="ts">
import SvgIcon from './SvgIcon.vue'

export default {
  name: 'UIInput',
  components: {
    SvgIcon
  },
  data() {
    return {
      showPassword: false,
      inputValue: this.modelValue,
      isFocused: false,
    }
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: false
    },
    maxLength: {
      type: Number,
    },
    minLength: {
      type: Number,
    },
    modelValue: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    clearButton: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    isPassword() {
      return this.id === 'password'
    },
    computedIcon() {
      if (this.isPassword) {
        return this.showPassword ? 'eye' : 'eye-off'
      }
      return this.icon
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    clearInput() {
      this.inputValue = ''
      this.$emit('update:modelValue', '')
      this.isFocused = false
    },
    handleFocus() {
      this.isFocused = true
    },
    handleBlur() {
      if (this.modelValue === '') {
        this.isFocused = false
      }
    },

  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/main.scss';

.input-box-c {
  user-select: none;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin-top: 1rem;
  border-radius: 8px;
  padding: 0.5rem;
  .input-wrapper {
    width: 240px;
    display: flex;
    align-items: center;
    position: relative;
    border: 1px solid #666666;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

    &.no-clear-button {
      .input-value {
        margin-inline-start: 2px;
      }
    }

    &:hover {
      border-color: #007bff;
    }
    .icon-wrapper {
      display: flex;
      position: absolute;
      top: 12px;
      &.icon-left {
        left: 6px;
      }
      &.icon-right {
        right: 12px;
      }
      .icon {
        background: none;
        border: none;
        cursor: pointer;
        width: 24px;
        height: 24px;
        padding: 0px;
        padding-left: 5px;
        border-radius: 50%;
      }
    }
    .label {
      position: absolute;
      left: 46px;
      font-size: 1rem;
      font-weight: 100;
      color: grey;
      pointer-events: none;
      top: 50%;
      transform: translateY(-50%);
      transition: all 0.3s ease;

      &.active {
        transform: none;
        top: 6px;
        font-size: 12px;
        right: 6px;
      }

      &.no-clear-button {
        left: 16px;
      }
    }
    .clear-btn {
      position: absolute;
      background: none;
      border: none;
      cursor: pointer;
      right: 4px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      transition:
        transform 0.3s ease,
        filter 0.3s ease;
      &:hover {
        transform: scale(1.2);
        filter: opacity(0.7);
      }
    }
    //styling
    .input-value {
      font-size: 1rem;
      margin-inline-start: 30px;
      outline: none;
      border: none;
      border-radius: 8px;
      padding: 1rem 4rem 1rem 1rem;
      transition: all 0.3s ease;
      width: 100%;
      &.active {
        padding-top: 1.5rem;
        padding-bottom: 0.5rem;
      }
    }
  }

  .error {
    color: red;
    font-size: 0.8rem;
    margin-top: 0.5rem;
  }
}
</style>
