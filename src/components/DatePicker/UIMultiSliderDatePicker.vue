<template>
  <div class="ui-multi-slider-date-picker">
    <div>
      <UISingleSliderDatePicker
        @emitSelectedDate="emitFirstSelectedDate"
        :selectedDate="firstDate"
        :minDate="minDate"
        :maxDate="maxDate" />
    </div>
    <div class="separator"></div>

    <div>
      <UISingleSliderDatePicker
        @emitSelectedDate="emitSecondSelectedDate"
        :selectedDate="secondDate"
        :minDate="minDate"
        :maxDate="maxDate" />
    </div>
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
      this.firstSelectedDate.date = this.firstDate
      this.secondSelectedDate.date = this.secondDate
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
      this.firstSelectedDate.date = this.firstDate
      this.secondSelectedDate.date = this.secondDate
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
    },
    firstSelectedDate(newVal) {
      this.firstDate = newVal.date
      if (this.secondDate < newVal.date) {
        let temp = this.firstDate
        this.firstDate = this.secondDate
        this.secondDate = temp
      }
      this.validateFirstDate()
    },
    secondSelectedDate(newVal) {
      this.secondDate = newVal.date
      if (this.firstDate > newVal.date) {
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
.ui-multi-slider-date-picker {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  .separator {
    background-color: #ccc;
    width: 100%;
    height: 94%;
    margin: 0px 2px;
  }
}
</style>
