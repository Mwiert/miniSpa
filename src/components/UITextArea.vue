<template>
  <div class="text-area-c">
    <div class="text-area-wrapper">
      <label v-if="label" :for="id">{{ label }}</label>
      <textarea
        :name="name"
        :id="id"
        :cols="cols"
        :rows="rows"
        :disabled="disabled"
        :placeholder="placeholder"
        :maxlength="maxLength"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"></textarea>
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
  }
}
</script>

<style lang="scss" scoped>
.text-area-c {
  user-select: none;
  .text-area-wrapper {
    display: inline-flex;
    flex-direction: column;
    label {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
    textarea {
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      resize: vertical;
      &:focus {
        outline: none;
        border: 1px solid #000;
      }
    }
  }
}
</style>
