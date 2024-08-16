<template>
  <div>
    <div>
      <UISingleSliderDatePicker
        @emitSelectedDate="handleFirstSelectedDate"
        :firstSelectedDate="firstSelectedDate"
        :minDate="minDate"
        :maxDate="maxDate" />
    </div>
    <UISingleSliderDatePicker
      @emitSelectedDate="handleFirstSelectedDate"
      :secondSelectedDate="firstSelectedDate"
      :minDate="minDate"
      :maxDate="maxDate" />
  </div>
</template>
<script>
import UISingleSliderDatePicker from './UISingleSliderDatePicker.vue'
export default {
  name: 'UIMultiSliderDatePicker',
  components: {
    UISingleSliderDatePicker
  }
}
</script>
<style></style>
