<template>
  <div class="text-area-c">
    <div class="text-area-wrapper">
      <label v-if="label" :for="id" class="label">{{ label }}</label>
      <textarea
        :class="{ disabled: disabled }"
        :name="name"
        :id="id"
        :cols="cols"
        :rows="rows"
        :disabled="disabled"
        :placeholder="placeholder"
        :maxlength="maxLength"
        :value="modelValue"
        class="text-area"
        @input="handleInput"></textarea>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UITextArea',
  props: {
    label: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    rows: { type: Number, default: 10 },
    cols: { type: Number, default: 30 },
    placeholder: { type: String },
    maxLength: { type: Number },
    modelValue: { type: String },
    id: { type: String },
    name: { type: String }
  },
  methods: {
    handleInput(event: Event) {
      const target = event.target as HTMLTextAreaElement | null
      if (target) {
        this.$emit('update:modelValue', target.value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.text-area-c {
  user-select: none;
  .text-area-wrapper {
    display: inline-flex;
    flex-direction: column;
    .label {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
    .text-area {
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      resize: none;
      &:focus {
        outline: none;
        border: 1px solid #000;
      }
      &.disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
      }
    }
  }
}
</style>
