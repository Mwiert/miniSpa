<template>
  <div class="sliders">
    <!-- first{{ firstDate }}<br />
    <br />
    second{{ secondDate }} -->
    <div>
      <UISingleSliderDatePicker
        @emitSelectedDate="emitFirstSelectedDate"
        :selectedDate="firstDate"
        :minDate="minDate"
        :maxDate="maxDate" />
    </div>
    <UISingleSliderDatePicker
      @emitSelectedDate="emitSecondSelectedDate"
      :selectedDate="secondDate"
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
      firstDate: this.firstSelectedDate.date,
      secondDate: this.secondSelectedDate.date
    }
  },
  methods: {
    emitFirstSelectedDate(firstSelected) {
      this.firstDate = firstSelected
      this.$emit('emitFirstSelectedDate', this.firstDate)
    },
    emitSecondSelectedDate(secondSelected) {
      this.secondDate = secondSelected
      this.$emit('emitSecondSelectedDate', this.secondDate)
    }
  },
  watch: {
    firstDate(newVal) {
      //console.log('newVal ', newVal)
      this.firstDate = newVal
      if (this.secondDate < newVal) {
        let temp = this.firstDate
        this.firstDate = this.secondDate
        this.secondDate = temp
      }

      //console.log('first', this.firstDate, ' ', this.secondDate)
    },
    secondDate(newVal) {
      // console.log('newVal second ', newVal)
      this.secondDate = newVal
      if (this.firstDate > newVal) {
        let temp = this.secondDate
        //console.log('temp', temp)
        this.secondDate = this.firstDate
        this.firstDate = temp
      }
      //console.log('second', this.firstDate, ' ', this.secondDate)
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
