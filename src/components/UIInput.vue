<template>
  <div class="input-box-c">
    <div class="input-wrapper">
      <div class="icon-wrapper" :class="{'icon-left': clearButton, 'icon-right': !clearButton}">
        <SvgIcon
        v-if="icon"
        :key="computedIcon"
        class="icon"
        :name="computedIcon"
        @click="togglePasswordVisibility" />
        </div>
      <input
        class="input-value"
        :class="[{'active': isFocused}, {'icon-left-padding': !clearButton}]"
        :type="isPassword ? (showPassword ? 'text' : 'password') : text"
        :placeholder="placeholder"
        :id="id"
        :label="label"
        :maxLength="maxLength"
        :minLength="minLength"
        :disabled="disabled"
        v-model="inputValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur" />
      <label v-if="label" class="label" :class="isFocused ? 'active' : ''" :for="id">
        {{ label }}
      </label>
      <SvgIcon
        v-if="inputValue && clearButton"
        class="clear-btn"
        :name="'x'"
        :size="'s'"
        @click="clearInput" />
    </div>
    <span v-if="errors.length" class="error">{{ errors.join(', ') }}</span>
  </div>
</template>

<script lang="ts">
import SvgIcon from './SvgIcon.vue'
import { validateInput } from '../Validations/ValidationsFunctions'

export default {
  name: 'UIInput',
  components: {
    SvgIcon
  },
  data() {
    return {
      showPassword: false,
      inputValue: this.value,
      isFocused: false,
      errors: []
    }
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },

    placeholder: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    maxLength: {
      type: Number,
      default: null
    },
    minLength: {
      type: Number,
      default: null
    },
    value: {
      type: String,
      default: ''
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
    rules: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    value(newVal) {
      this.inputValue = newVal
    },
    inputValue(newVal) {
      this.$emit('update:value', newVal)
      this.validate()
    }
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
    updateValue(newValue: String) {
      this.$emit('update:value', newValue)
    },
    handleInput() {
      this.updateValue(this.inputValue)
    },
    clearInput() {
      this.inputValue = ''
      this.updateValue('')
      this.isFocused = false
    },
    handleFocus() {
      this.isFocused = true
    },
    handleBlur() {
      if (this.inputValue === '') {
        this.isFocused = false
      }
      this.validate()
    },
    validate() {
      this.errors = validateInput(this.inputValue, this.rules, this.type)
    }
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
    width: fit-content;
    display: flex;
    align-items: center;
    position: relative;
    border: 1px solid #666666;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

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
      margin-inline-start: 8px;
      position: absolute;
      
      font-size: 1rem;
      font-weight: 100;
      color: grey;
      pointer-events: none;
      top: 50%;
      transform: translateY(-50%);
      transition: all 0.3s ease;
      &.active {
        margin-inline-start: 8px;
        transform: none;
        top: 6px;
        font-size: 12px;
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
