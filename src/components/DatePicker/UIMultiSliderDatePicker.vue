<template>
  <div class="sliders">
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
import dayjs from 'dayjs'
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
    maxSelectableDays: { type: Number },
    spaceBetweenDays: { type: Number }
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
    },
    validateFirstDate() {
      let firstDate = dayjs(this.firstDate)
      let secondDate = dayjs(this.secondDate)
      if (firstDate.isSame(secondDate)) {
        secondDate = firstDate.add(this.spaceBetweenDays, 'day')
        this.secondDate = secondDate.format('YYYY-MM-DD')
      }

      const diffDays = secondDate.diff(firstDate, 'day')
      if (this.maxSelectableDays != 0) {
        if (diffDays > this.maxSelectableDays) {
          secondDate = firstDate.add(this.maxSelectableDays, 'day')
          this.secondDate = secondDate.format('YYYY-MM-DD')
        }

        if (firstDate.isAfter(secondDate)) {
          let temp = firstDate
          firstDate = secondDate
          secondDate = temp
          this.firstDate = firstDate.format('YYYY-MM-DD')
          this.secondDate = secondDate.format('YYYY-MM-DD')
        }
      }
    },
    validateSecondDate() {
      let firstDate = dayjs(this.firstDate)
      let secondDate = dayjs(this.secondDate)
      if (firstDate.isSame(secondDate)) {
        firstDate = secondDate.subtract(this.spaceBetweenDays, 'day')
        this.firstDate = firstDate.format('YYYY-MM-DD')
      }
      const diffDays = secondDate.diff(firstDate, 'day')
      if (this.maxSelectableDays != 0) {
        if (diffDays > this.maxSelectableDays) {
          firstDate = secondDate.subtract(this.maxSelectableDays, 'day')
          this.firstDate = firstDate.format('YYYY-MM-DD')
        }
        if (firstDate.isAfter(secondDate)) {
          let temp = firstDate
          firstDate = secondDate
          secondDate = temp
          this.firstDate = firstDate.format('YYYY-MM-DD')
          this.secondDate = secondDate.format('YYYY-MM-DD')
        }
      }
    }
  },
  watch: {
    firstDate(newVal) {
      this.firstDate = newVal
      if (this.secondDate < newVal) {
        let temp = this.firstDate
        this.firstDate = this.secondDate
        this.secondDate = temp
      }
      this.validateFirstDate()
    },
    secondDate(newVal) {
      this.secondDate = newVal
      if (this.firstDate > newVal) {
        let temp = this.secondDate
        this.secondDate = this.firstDate
        this.firstDate = temp
      }
      this.validateSecondDate()
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
