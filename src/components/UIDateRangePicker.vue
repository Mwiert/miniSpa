<template>
  <div class="ui-date-range-picker-c">
    <!-- This is for opening and closing the calendar -->
    <div class="button" @click="toggleDatePicker()" ref="dateRangePicker">
      <div class="button-items">
        <!-- This is where we are checking if it is single calendar or multi calendar -->
        <div class="is-single-date">
          <div class="single-date-box">
            <span class="day">
              <!-- This is where we are getting the day -->
              {{ firstSelectedDate.number }}
            </span>
            <div class="month-year">
              <span class="month">
                <!-- This is where we are getting the month -->
                {{ formatMonth(firstSelectedDate.month) }}
              </span>
              <span class="year">
                <!-- This is where we are getting the year -->
                {{ firstSelectedDate.year }}
              </span>
            </div>
          </div>
          <div class="single-date-box divider" v-if="isMultiDatePicker">
            <span class="day">
              <!-- This is where we are getting the day -->
              {{ secondSelectedDate.number }}
            </span>
            <div class="month-year">
              <span class="month">
                <!-- This is where we are getting the month -->
                {{ formatMonth(secondSelectedDate.month) }}
              </span>
              <span class="year">
                <!-- This is where we are getting the year -->
                {{ secondSelectedDate.year }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="date-picker" ref="datePicker">
      <!-- This is where we are sending the needed probs into the child named UIDatePicker and for future implementation UIMultiDatePicker -->
      <div v-if="isSingleDatePicker">
        <UIDatePicker
          v-show="isSingleDatePickerEnable"
          :yearRange="validateYear"
          :monthRange="validateMonth"
          :saveDate="firstSelectedDate.date"
          :isFutureValidation="isFuture"
          :isPastValidation="isPast"
          :initialDate="firstSelectedDate.date"
          @sendDateToParent="setCurrentDate"
          @dateSelected="handleFirstDateSelected"
          @click="sendDateToParent()"
        />
      </div>
      <div v-if="isMultiDatePicker">
        <UIMultiDatePicker
          v-show="isMultiDatePickerEnable"
          :yearRange="validateYear"
          :monthRange="validateMonth"
          :saveFirstDate="firstSelectedDate.date"
          :saveSecondDate="secondSelectedDate.date"
          :isFutureValidation="isFuture"
          :isPastValidation="isPast"
          :initialDate="firstSelectedDate.date"
          @sendDateToParent="setCurrentDate"
          @dateFirstSelected="handleFirstDateSelected"
          @dateSecondSelected="handleSecondDateSelected"
          @click="sendDateToParent()"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
//Imports the needed components and interfaces
import UIDatePicker from '../components/UIDatePicker.vue'
import UIMultiDatePicker from '../components/UIMultiDatePicker.vue'
import date from '../interface/IUIDatePicker'
import dayjs from 'dayjs'

export default {
  name: 'UIDateRangePicker',
  components: {
    UIDatePicker,
    UIMultiDatePicker
  },
  props: {
    isMultiDatePicker: { type: Boolean, default: false }, //This is for asking to parent whether should the multi date picker available in this implementation
    isSingleDatePicker: { type: Boolean, default: false }, //This is for asking to parent whether should the single date picker available in this implementation
    validateMonth: { type: Number, default: 99 }, //This is for validating the month range by giving it 9999 as default value since this is one of the maximum value
    validateYear: { type: Number, default: 99 }, //This is for validating the year range by giving it 9999 as default value since this is one of the maximum value
    value: {}, //This is for getting the selected date from the parent component TimeBenders
    isPast: { type: Boolean, default: false },
    isFuture: { type: Boolean, default: false },
    //presentDate: dayjs().format('YYYY-MM-DD'),
    initialDate: { type: String, default: '' }
  },
  data() {
    return {
      firstSelectedDate: {} as date, //This is for getting the selected date from UIDatePicker
      secondSelectedDate: {} as date, //This is for getting the selected date from UIDatePicker
      isSingleDatePickerEnable: false, //This is for enabling the single date picker as default false
      isMultiDatePickerEnable: false, //This is for enabling the multi date picker as default false
      presentDate: {} as date
    }
  },
  methods: {
    sendDateToParent() {
      //We are sending the selected date to the parent component with v-model implementation.
      this.$emit('update:modelValue', this.firstSelectedDate.date)
    },
    formatMonth(month) {
      //We are converting the month number to month name
      const months = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December'
      }
      //We are returning the month name if not available just return the month's number like on top.
      return months[month] || month
    },
    handleFirstDateSelected(firstDate: date) {
      console.log('first date:', firstDate)
      // We get the selected date from UIDatePicker and set it to selectedDate (Handling the emit from UIDatePicker to UIDateRangePicker)
      this.firstSelectedDate = firstDate
    },
    handleSecondDateSelected(secondDate: date) {
      console.log('second date:', secondDate)
      // We get the selected date from UIDatePicker and set it to selectedDate (Handling the emit from UIDatePicker to UIDateRangePicker)
      this.secondSelectedDate = secondDate
    },
    setCurrentDate(presentDate: date) {
      //We are setting the current date to the present date (Handling the emit from UIDatePicker to UIDateRangePicker)
      this.presentDate = presentDate
    },
    toggleDatePicker() {
      //If the single date picker is enabled on TimeBenders, we are toggling the single date picker
      if (this.isSingleDatePicker === true) {
        //We can implement it by this.isSingleDatePickerEnable = !this.isSingleDatePickerEnable; but it will create problem in muldi date picker implementation
        if (this.isSingleDatePickerEnable === false) {
          this.isSingleDatePickerEnable = true
        } else {
          this.isSingleDatePickerEnable = false
        }
      }

      //If the multi date picker is enabled on TimeBenders, we are toggling the multi date picker with related single date picker logic
      if (this.isMultiDatePicker === true) {
        this.isSingleDatePickerEnable = false
        if (this.isMultiDatePickerEnable === false) {
          this.isMultiDatePickerEnable = true
        } else {
          this.isMultiDatePickerEnable = false
        }
      }
      if (this.isSingleDatePickerEnable || this.isMultiDatePickerEnable) {
        document.addEventListener('click', this.handleClickOutside)
      } else {
        document.removeEventListener('click', this.handleClickOutside)
      }
    },
    handleClickOutside(event: MouseEvent) {
      const dateRangePicker = this.$refs.dateRangePicker as HTMLElement
      const datePicker = this.$refs.datePicker as HTMLElement
      if (
        !dateRangePicker.contains(event.target as Node) &&
        !datePicker.contains(event.target as Node)
      ) {
        this.isSingleDatePickerEnable = false
        this.isMultiDatePickerEnable = false
        document.removeEventListener('click', this.handleClickOutside)
      }
    },
    //This is for filling the initial date to the singleSelectedDate since it comes empty as default so we need to use our TypeScript interface to fill it.
    fillInitialDate() {
      if (this.initialDate) {
        this.firstSelectedDate = {
          number: dayjs(this.initialDate).format('DD'),
          month: dayjs(this.initialDate).format('MM'),
          year: dayjs(this.initialDate).format('YYYY'),
          date: dayjs(this.initialDate).format('YYYY-MM-DD')
        }
      } else {
        this.firstSelectedDate = {
          number: dayjs().format('DD'),
          month: dayjs().format('MM'),
          year: dayjs().format('YYYY'),
          date: dayjs().format('YYYY-MM-DD')
        }
      }
    },

    checkMultiOrSingleCalendar() {}
  },
  created() {
    //We are filling the initial date when the component is created because we want to see today's date in button when we open our web page.
    this.fillInitialDate()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/variables.scss';
@import '../assets/css/_fonts.scss';

//This is main container
.ui-date-range-picker-c {
  display: flex;
  flex-direction: column;
  align-self: center;
  text-align: center;
  padding: 1rem;
  gap: 0.75rem;
  //This is our button container
  .button {
    background: #f8f8f8;
    box-shadow: 2px 2px 6px #5858581a;
    border: 1px solid #b6b6b6;

    opacity: 1;
    width: 175px;
    height: 24px;

    justify-items: center;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    margin-right: 9rem;
    padding: 10px;
    cursor: pointer;
    border-radius: 12px;
    //This is content inside of button
    .button-items {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      text-align: center;
      width: 100%;
      align-items: center;
      font-size: 12px;
      color: #2b2b2b;
      opacity: 0.9;
      //The output for single date picker if it is single
      .is-single-date {
        width: 100%;
        display: flex;
        //Date format box
        .single-date-box {
          display: flex;
          justify-content: center;
          flex-direction: row;
          width: 100%;

          .day {
            font-size: 20px;
            font-weight: bold;
            color: #2b2b2b;
            padding: 0 5px;
          }
          //Month and Year Box To Design
          .month-year {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: start;
            font-size: 10px;
            .month {
              color: #2e2e2e;
            }
            .year {
              color: #7f7f7f;
            }
          }

          //Divider for multi date picker
          &.divider {
            border-left: 1px solid #b6b6b6;
          }
        }
      }
    }
  }
}
</style>
