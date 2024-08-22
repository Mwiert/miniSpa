<template>
  <div>
    <div>
      <div v-if="isSingle">
        <UISingleSliderDatePicker
          @emitSelectedDate="handleFirstSelectedDate"
          :selectedDate="firstSelectedDate.date"
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
          :maxSelectableDays="maxSelectableDays"
          :spaceBetweenDays="spaceBetweenDays" />
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
    maxDate: {},
    spaceBetweenDays: { type: Number, default: 2 }
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
