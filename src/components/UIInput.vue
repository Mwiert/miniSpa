<template>
  <div class="input-box-c">
    <div v-if="label" class="label">
      <label  :for="id"> {{ label }} </label>
    </div>

    <div class="input-wrapper">
      <input
        class="input-value"
        :type="type"
        :placeholder="placeholder"
        :id="id"
        :label="label"
        :maxLength="maxLength"
        :minLength="minLength"
        :disabled="disabled"
        v-model="inputValue"
        @input="handleInput"
      />

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
      inputValue: this.value
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
  .input-wrapper {
    width: fit-content;
    display: flex;
    align-items: center;
    position: relative;
    bottom: 8px;
    .clear-btn {
      position: absolute;
      right: 10px;
      background: none;
      border: none;
      cursor: pointer;
      width: 16px;
      height: 16px;
      padding: 0px;
      border-radius: 50%;
      &:hover {  
        background-color: aqua;
        transform: scale(1.2);
        filter: opacity(0.5);
      }
    }
    .input-value {
      font-size: 1rem;
      padding: 1rem;
      padding-right: 2.5rem;
      border: 1px solid #666666;
      border-radius: 8px;
    }
    
  }

  .label {
    width: fit-content;
    font-size: 1rem;
    font-weight: 200;
    margin-bottom: 0.5rem;
    color: grey;
  }
}
</style>
