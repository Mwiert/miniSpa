<template>
  <div class="input-box-c">
    <div class="input-wrapper">
      
      <input
        class="input-value"
        :class="isFocused ? 'active': ''"
        :type="type"
        :placeholder="placeholder"
        :id="id"
        :label="label"
        :maxLength="maxLength"
        :minLength="minLength"
        :disabled="disabled"
        :iconNextToText="iconE"
        v-model="inputValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <label v-if="label" class="label" :class="isFocused ? 'active': ''" :for="id"> {{ label }} </label>
      <img class="email-icon" src="../assets/icons/search.svg" :alt="iconNextToText"/>
      <SvgIcon v-if="inputValue" class="clear-btn" :icon="'x'" :size="'s'" @click="clearInput" />
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
      inputValue: this.value,
      isFocused: false,
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
    iconNextToText: {
      type: Image,
      default: null
    }
  },
  methods: {
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
      if(this.inputValue === '') {
        this.isFocused = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/main.scss';

.input-box-c {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin-top: 1rem;
  .input-wrapper {
    width: fit-content;
    display: flex;
    align-items: center;
    position: relative;
    bottom: 8px;
    border: 1px solid #666666;
    border-radius: 8px;
    .label {
      position: absolute;
      left: 16px;
      font-size: 1rem;
      font-weight: 100;
      color: grey;
      pointer-events: none;
      top: 50%;
      transform: translateY(-50%);
      transition: all 0.3s ease;
      &.active {
        transform: none;
        top: 8px;
        font-size: 12px;
      }
    }
    .clear-btn {
      position: absolute;
      background: none;
      border: none;
      cursor: pointer;
      right: 32px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      &:hover {
        transform: scale(1.2);
        filter: opacity(0.5);
      }
      
    }
    .email-icon {
      position: absolute;
      background: none;
      border: none;
      cursor: pointer;
      right: 12px;
      width: 24px;
      height: 24px;
      padding: 0px;
      padding-left: 5px;
      border-radius: 50%;
    }
    .input-value {
      font-size: 1rem;
      padding-right: 4rem;
      padding-left: 2rem;
      outline: none;
      border: none;
      border-radius: 8px;
      padding: 1rem;
      transition: all 0.3s ease;
      &.active {
        padding-top: 1.5rem;
        padding-bottom: 0.5rem;
      }
    
  }
}
}
</style>
