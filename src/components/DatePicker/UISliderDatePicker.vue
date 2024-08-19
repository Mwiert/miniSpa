<template>
  <div class="ui-date-range-picker-c">
    <div>
      <!-- This is where we are sending the needed probs into the child named UIDatePicker and for future implementation UIMultiDatePicker -->
      <div v-if="isSingle">
        <UISingleSliderDatePicker
          @emitSelectedDate="handleFirstSelectedDate"
          :selectedDate="firstSelectedDate"
          :minDate="minDate"
          :maxDate="maxDate" />
      </div>
      <div v-if="isMulti">
        <UIMultiSliderDatePicker
          @emitFirstSelectedDate="handleFirstSelectedDate"
          @emitSecondSelectedDate="handleSecondSelectedDate"
          :firstSelectedDate="firstSelectedDate"
          :secondSelectedDate="secondSelectedDate"
          :minDate="minDate"
          :maxDate="maxDate"
          :maxSelectableDays="maxSelectableDays" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import UISingleSliderDatePicker from './UISingleSliderDatePicker.vue'
import UIMultiSliderDatePicker from './UIMultiSliderDatePicker.vue'
export default {
  name: 'UIDateRangePicker',
  components: {
    UISingleSliderDatePicker,
    UIMultiSliderDatePicker
  },
  props: {
    isMulti: { type: Boolean, default: false },
    isSingle: { type: Boolean, default: false },
    maxSelectableDays: { type: Number, default: 0 },
    firstSelectedDate: { type: Object, default: null },
    secondSelectedDate: { type: Object, default: null },
    minDate: {},
    maxDate: {}
  },

  methods: {
    handleFirstSelectedDate(formattedDate: string) {
      this.$emit('sliderFirstSelected', formattedDate)
    },
    handleSecondSelectedDate(formattedDate: string) {
      this.$emit('sliderSecondSelected', formattedDate)
    }
  }
}
</script>

<style lang="scss" scoped></style>
