<template>
  <div class="ui-date-range-picker-c">
    <label v-if="label">{{ label }}</label>

    <!-- This is for opening and closing the calendar -->
    <div
      class="button"
      @click="toggleDatePicker()"
      ref="dateRangePicker"
      :class="{ multi: isMultiDatePicker, single: isSingleDatePicker }">
      <div class="button-items">
        <!-- This is where we are checking if it is single calendar or multi calendar -->
        <div class="is-single-date">
          <div class="single-date-box">
            <span class="day">
              <!-- This is where we are getting the day -->
              <span v-if="!firstSelectedDate.date">
                {{ sendInitialDates.firstInitialDate.number }}
              </span>
              <span v-else>
                {{ firstSelectedDate.number }}
              </span>
            </span>

            <div class="month-year">
              <span class="month">
                <!-- This is where we are getting the month -->

                <span v-if="!firstSelectedDate.date">
                  {{ formatMonth(sendInitialDates.firstInitialDate.month) }}
                </span>
                <span v-else>
                  {{ formatMonth(firstSelectedDate.month) }}
                </span>
              </span>
              <span class="year">
                <!-- This is where we are getting the year -->

                <span v-if="!firstSelectedDate.date">
                  {{ sendInitialDates.firstInitialDate.year }}
                </span>
                <span v-else>
                  {{ firstSelectedDate.year }}
                </span>
              </span>
            </div>
          </div>
          <div class="single-date-box divider" v-if="isMultiDatePicker">
            <span class="day">
              <!-- This is where we are getting the day -->

              <span v-if="!secondSelectedDate.date">
                {{ sendInitialDates.secondInitialDate.number }}
              </span>
              <span v-else>
                {{ secondSelectedDate.number }}
              </span>
            </span>

            <div class="month-year">
              <span class="month">
                <!-- This is where we are getting the month -->
                <span v-if="!secondSelectedDate.date">
                  {{ formatMonth(sendInitialDates.secondInitialDate.month) }}
                </span>
                <span v-else>
                  {{ formatMonth(secondSelectedDate.month) }}
                </span>
              </span>

              <span class="year">
                <!-- This is where we are getting the year -->
                <span v-if="!secondSelectedDate.date">
                  {{ sendInitialDates.secondInitialDate.year }}
                </span>
                <span v-else>
                  {{ secondSelectedDate.year }}
                </span>
              </span>
            </div>

            <div
              class="placeholder-select"
              v-if="!secondSelectedDate.date && !sendInitialDates.secondInitialDate.date">
              <span>Select</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="date-picker"
      ref="datePicker"
      :class="{ 'date-picker-with-label': label, 'date-picker-without-label': !label }">
      <!-- This is where we are sending the needed probs into the child named UIDatePicker and for future implementation UIMultiDatePicker -->
      <div v-if="isSingleDatePicker">
        <UIDatePicker
          v-show="isSingleDatePickerEnable"
          :forwardYearRange="validateForwardYear"
          :backYearRange="validateBackYear"
          :forwardMonthRange="validateForwardMonth"
          :backMonthRange="validateBackMonth"
          :forwardDayRange="validateForwardDay"
          :backDayRange="validateBackDay"
          :saveDate="sendInitialDates.firstInitialDate.date"
          :isFutureValidation="isFuture"
          :isPastValidation="isPast"
          :initialDate="initialDate"
          :isDatePickerEnable="isSingleDatePickerEnable"
          @dateSelected="handleFirstDateSelected"
          @click="sendDateToParent" />
      </div>
      <div v-if="isMultiDatePicker">
        <UIMultiDatePicker
          v-show="isMultiDatePickerEnable"
          :forwardYearRange="validateForwardYear"
          :backYearRange="validateBackYear"
          :forwardMonthRange="validateForwardMonth"
          :backMonthRange="validateBackMonth"
          :forwardDayRange="validateForwardDay"
          :backDayRange="validateBackDay"
          :isFutureValidation="isFuture"
          :isPastValidation="isPast"
          :initialDate="initialDate"
          :baseInitialDates="sendInitialDates"
          :isDatePickerEnable="isMultiDatePickerEnable"
          :spaceBetweenDays="spaceBetweenDays"
          @dateFirstSelected="handleFirstDateSelected"
          @dateSecondSelected="handleSecondDateSelected"
          @resetBaseInitialDates="handleResetInitialDates"
          @click="sendDateToParent" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
//Imports the need../../interface/IUIDatePickeres
import date from '../../interface/IUIDatePicker'
import dayjs from 'dayjs'
import UIDatePicker from './UIDatePicker.vue'
import UIMultiDatePicker from './UIMultiDatePicker.vue'

export default {
  name: 'UIDateRangePicker',
  components: {
    UIDatePicker,
    UIMultiDatePicker
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    isMultiDatePicker: { type: Boolean, default: false }, //This is for asking to parent whether should the multi date picker available in this implementation
    isSingleDatePicker: { type: Boolean, default: false }, //This is for asking to parent whether should the single date picker available in this implementation
    validateForwardMonth: { type: Number, default: 99 }, //This is for validating the month range by giving it 9999 as default value since this is one of the maximum value
    validateBackMonth: { type: Number, default: 99 }, //This is for validating the month range by giving it 9999 as default value since this is one of the maximum value
    validateForwardDay: { type: Number, default: 99 }, //This is for validating the day range by giving it 9999 as default value since this is one of the maximum value
    validateForwardYear: { type: Number, default: 99 },
    validateBackYear: { type: Number, default: 99 }, //This is for validating the year range by giving it 9999 as default value since this is one of the maximum value
    validateForwardDay: { type: Number, default: 99 },
    validateBackDay: { type: Number, default: 99 },
    value: {}, //This is for getting the selected date from the parent component TimeBenders
    isPast: { type: Boolean, default: false },
    isFuture: { type: Boolean, default: false },
    initialDate: { type: String, default: dayjs().format('YYYY-MM-DD') },
    spaceBetweenDays: { type: Number, default: 1 }
  },
  data() {
    return {
      firstSelectedDate: {} as date, //This is for getting the selected date from UIDatePicker
      secondSelectedDate: {} as date, //This is for getting the selected date from UIDatePicker
      isSingleDatePickerEnable: false, //This is for enabling the single date picker as default false
      isMultiDatePickerEnable: false, //This is for enabling the multi date picker as default false
      presentDate: {} as date,
      sendInitialDates: {
        firstInitialDate: '',
        secondInitialDate: ''
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        setTimeout(() => {
          this.isSingleDatePickerEnable = false
          this.isMultiDatePickerEnable = false
        }, 100)
      }
    },
    sendDateToParent() {
      if (this.firstSelectedDate.date == null) {
        const dates = {
          firstDate: this.sendInitialDates.firstInitialDate.date,
          secondDate: this.sendInitialDates.secondInitialDate.date
        }
        this.$emit('update:modelValue', dates)
      } else {
        const dates = {
          firstDate: this.firstSelectedDate.date,
          secondDate: this.secondSelectedDate.date
        }
        if (this.firstSelectedDate.date == '' && this.secondSelectedDate.date == '') {
          const dates = {
            firstDate: this.sendInitialDates.firstInitialDate.date,
            secondDate: this.sendInitialDates.secondInitialDate.date
          }
          this.$emit('update:modelValue', dates)
          return
        }
        //We are sending the selected date to the parent component with v-model implementation.
        this.$emit('update:modelValue', dates)
      }
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
      // We get the selected date from UIDatePicker and set it to selectedDate (Handling the emit from UIDatePicker to UIDateRangePicker)
      this.firstSelectedDate = firstDate
    },
    handleSecondDateSelected(secondDate: date) {
      // We get the selected date from UIDatePicker and set it to selectedDate (Handling the emit from UIDatePicker to UIDateRangePicker)
      this.secondSelectedDate = secondDate
    },
    toggleDatePicker() {
      this.test1 = !this.test1
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
    },
    //This is for filling the initial date to the singleSelectedDate since it comes empty as default so we need to use our TypeScript interface to fill it.
    fillInitialDate() {
      if (this.isMultiDatePicker) {
        if (this.initialDate) {
          if (!this.isPast) {
            this.sendInitialDates.firstInitialDate = {
              number: dayjs(this.initialDate).format('DD'),
              month: dayjs(this.initialDate).format('MM'),
              year: dayjs(this.initialDate).format('YYYY'),
              date: dayjs(this.initialDate).format('YYYY-MM-DD')
            }
            this.sendInitialDates.secondInitialDate = dayjs(this.initialDate)
              .add(this.spaceBetweenDays, 'day')
              .format('YYYY-MM-DD')
            this.sendInitialDates.secondInitialDate = {
              number: dayjs(this.sendInitialDates.secondInitialDate).format('DD'),
              month: dayjs(this.sendInitialDates.secondInitialDate).format('MM'),
              year: dayjs(this.sendInitialDates.secondInitialDate).format('YYYY'),
              date: dayjs(this.sendInitialDates.secondInitialDate).format('YYYY-MM-DD')
            }
          } else {
            this.sendInitialDates.firstInitialDate = dayjs(this.initialDate)
              .subtract(this.spaceBetweenDays, 'day')
              .format('YYYY-MM-DD')
            this.sendInitialDates.firstInitialDate = {
              number: dayjs(this.sendInitialDates.firstInitialDate).format('DD'),
              month: dayjs(this.sendInitialDates.firstInitialDate).format('MM'),
              year: dayjs(this.sendInitialDates.firstInitialDate).format('YYYY'),
              date: dayjs(this.sendInitialDates.firstInitialDate).format('YYYY-MM-DD')
            }
            this.sendInitialDates.secondInitialDate = {
              number: dayjs(this.initialDate).format('DD'),
              month: dayjs(this.initialDate).format('MM'),
              year: dayjs(this.initialDate).format('YYYY'),
              date: dayjs(this.initialDate).format('YYYY-MM-DD')
            }
          }
        } else {               //bu koşul hiç sağlanıyor mu ?
          if (!this.isPast) {
            this.sendInitialDates.firstInitialDate = {
              number: dayjs().format('DD'),
              month: dayjs().format('MM'),
              year: dayjs().format('YYYY'),
              date: dayjs().format('YYYY-MM-DD')
            }
            this.sendInitialDates.secondInitialDate = dayjs().add(3, 'day').format('YYYY-MM-DD')
            this.sendInitialDates.secondInitialDate = {
              number: dayjs(this.sendInitialDates.secondInitialDate).format('DD'),
              month: dayjs(this.sendInitialDates.secondInitialDate).format('MM'),
              year: dayjs(this.sendInitialDates.secondInitialDate).format('YYYY'),
              date: dayjs(this.sendInitialDates.secondInitialDate).format('YYYY-MM-DD')
            }
          } else {
            this.sendInitialDates.secondInitialDate = {
              number: dayjs().format('DD'),
              month: dayjs().format('MM'),
              year: dayjs().format('YYYY'),
              date: dayjs().format('YYYY-MM-DD')
            }
            this.sendInitialDates.firstInitialDate = dayjs().subtract(3, 'day').format('YYYY-MM-DD')
            this.sendInitialDates.firstInitialDate = {
              number: dayjs(this.sendInitialDates.firstInitialDate).format('DD'),
              month: dayjs(this.sendInitialDates.firstInitialDate).format('MM'),
              year: dayjs(this.sendInitialDates.firstInitialDate).format('YYYY'),
              date: dayjs(this.sendInitialDates.firstInitialDate).format('YYYY-MM-DD')
            }
          }
        }
      } else {
        if (this.initialDate) {
          this.sendInitialDates.firstInitialDate = {
            number: dayjs(this.initialDate).format('DD'),
            month: dayjs(this.initialDate).format('MM'),
            year: dayjs(this.initialDate).format('YYYY'),
            date: dayjs(this.initialDate).format('YYYY-MM-DD')
          }
        } else {
          this.sendInitialDates.firstInitialDate = {
            number: dayjs().format('DD'),
            month: dayjs().format('MM'),
            year: dayjs().format('YYYY'),
            date: dayjs().format('YYYY-MM-DD')
          }
        }
      }
    },
    handleResetInitialDates() {
      this.sendInitialDates.firstInitialDate = { date: '' }
      this.sendInitialDates.secondInitialDate = { date: '' }
    },
    checkMultiOrSingleCalendar() {}
  },
  watch: {
    firstSelectedDate(newVal) {
      if (!newVal.date) {
        this.fillInitialDate()
      }
    }
  },
  created() {
    //We are filling the initial date when the component is created because we want to see today's date in button when we open our web page.
    this.fillInitialDate()
    this.sendDateToParent()
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variables.scss';
@import '../../assets/css/_fonts.scss';

//This is main container
.ui-date-range-picker-c {
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-self: center;
  text-align: center;
  padding: 1rem;
  gap: 0.75rem;
  position: relative;
  width: 175px;
  label {
    font-size: 14px;
    margin-top: 15px;
  }
  .date-picker-without-label {
    position: absolute;
    top: 50px;
    left: 10px;
    z-index: 1000;
  }
  .date-picker-with-label {
    position: absolute;
    top: 95px;
    left: 15px;
    z-index: 1000;
  }

  //This is our button container
  .button {
    background: #f8f8f8;
    z-index: 1001;
    box-shadow: 2px 2px 6px #5858581a;
    border: 1px solid #b6b6b6;

    opacity: 1;
    height: 24px;

    justify-items: center;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    padding: 10px;
    cursor: pointer;
    border-radius: 12px;
    &.multi {
      width: 170px;
      align-items: center;
      justify-content: center;
    }
    &.single {
      width: 100px;
    }

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
          align-items: center;
          flex-direction: row;
          width: 100%;
          height: 24px;

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
            justify-content: center;
            align-items: start;
            font-size: 10px;
            .month {
              color: #2e2e2e;
            }
            .year {
              color: #7f7f7f;
            }
          }

          .placeholder-select {
            font-size: 14px;
            color: black;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
          }

          //Divider for multi date picker
          &.divider {
            border-left: 1px solid #b6b6b6;
            margin: 0 10px;
          }
        }
      }
    }
  }
}
</style>
