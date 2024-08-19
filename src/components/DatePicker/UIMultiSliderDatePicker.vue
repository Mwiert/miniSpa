<template>
  <div class="sliders">
    <div>
      <UISingleSliderDatePicker
        @emitSelectedDate="emitFirstSelectedDate"
        :selectedDate="firstSelectedDate"
        :minDate="minDate"
        :maxDate="maxDate" />
    </div>
    <UISingleSliderDatePicker
      @emitSelectedDate="emitSecondSelectedDate"
      :selectedDate="secondSelectedDate"
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
  },
  props: {
    firstSelectedDate: { type: Object, default: null },
    secondSelectedDate: { type: Object, default: null },
    minDate: {},
    maxDate: {},
    maxSelectableDays: { type: Number }
  },
  data() {
    return {
      firstDate: this.firstSelectedDate,
      secondDate: this.secondSelectedDate
    }
  },
  methods: {
    emitFirstSelectedDate(firstSelected) {
      this.$emit('emitFirstSelectedDate', firstSelected)
    },
    emitSecondSelectedDate(secondSelected) {
      this.$emit('emitSecondSelectedDate', secondSelected)
    }
  },
  watch: {
    firstSelectedDate(newVal) {
      this.firstDate = newVal
      console.log(this.firsttDate.date)
      console.log(this.firstSelectedDate.date)
    }
  }
}
</script>
<style lang="scss" scoped>
.sliders {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
