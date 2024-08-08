<template>
  <div class="ui-date-range-picker-c">
    <label class="label" v-if="label">{{ label }}</label>
    <!-- This is for opening and closing the calendar -->
    <div
      class="button"
      @click="toggleDatePicker()"
      ref="dateRangePicker"
      :class="{ multi: isMulti, single: isSingle }">
      <div class="button-items">
        <!-- This is where we are checking if it is single calendar or multi calendar -->
        <div class="is-single-date">
          <div class="single-date-box">
            <span class="date">
              <!-- This is where we are getting the day -->
              <input
                class="date"
                type="text"
                v-model="firstSelectedDateDisplay"
                @input="onFirstDateInput($event.target.value)"
                @keyup="handleResetInitialDates"
                @blur="formatInput" />
            </span>
          </div>
          <div class="single-date-box divider" v-if="isMulti">
            <span class="date">
              <!-- This is where we are getting the day -->

              <input
                class="date"
                type="text"
                v-model="secondSelectedDateDisplay"
                @input="onSecondDateInput($event.target.value)"
                @keyup="handleResetInitialDates"
                placeholder="Select" />
            </span>

            <div
              class="placeholder-select"
              v-if="!secondSelectedDate.date && !sendInitialDates.secondInitialDate.date"></div>
          </div>
        </div>
        <div class="date-box-icon">
          <SvgIcon name="dp" size="s" class="date-icon" />
        </div>
      </div>
    </div>
    <div
      class="date-picker"
      ref="datePicker"
      :class="{
        'date-picker-with-label': label,
        'date-picker-without-label': !label,
        isMulti: isMulti
      }">
      <!-- This is where we are sending the needed probs into the child named UIDatePicker and for future implementation UIMultiDatePicker -->
      <div v-if="isSingle">
        <UIDatePicker
          v-show="isSingleDatePickerEnable"
          :forwardYearRange="validateForwardYear"
          :backYearRange="validateBackYear"
          :forwardMonthRange="validateForwardMonth"
          :backMonthRange="validateBackMonth"
          :forwardDayRange="validateForwardDay"
          :backDayRange="validateBackDay"
          :saveDate="firstSelectedDate"
          :isFutureValidation="isFuture"
          :isPastValidation="isPast"
          :initialDate="initialDate"
          :isDatePickerEnable="isSingleDatePickerEnable"
          @dateSelected="handleFirstDateSelected"
          @sliderSelected="handleFirstSliderDate"
          @click="sendDateToParent"
          :positionToLeftSingle="positionToLeftSingle"
          @minDate="updateMinDate"
          @maxDate="updateMaxDate"
          :newSelectedDays="newSelectedDays" />
      </div>
      <div v-if="isMulti">
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
          @click="sendDateToParent"
          :positionToRight="positionToRight"
          :positionToLeft="positionToLeft"
          :newSelectedDays="newSelectedDays"
          :maxSelectibleDay="maxSelectibleDay"
          @minDate="updateMinDate"
          @maxDate="updateMaxDate" />
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
import './dateInputHelper'
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
    isMulti: { type: Boolean, default: false }, //This is for asking to parent whether should the multi date picker available in this implementation
    isSingle: { type: Boolean, default: true }, //This is for asking to parent whether should the single date picker available in this implementation
    validateForwardMonth: { type: Number, default: 99 }, //This is for validating the month range by giving it 9999 as default value since this is one of the maximum value
    validateBackMonth: { type: Number, default: 99 }, //This is for validating the month range by giving it 9999 as default value since this is one of the maximum value
    validateForwardYear: { type: Number, default: 99 },
    validateBackYear: { type: Number, default: 99 }, //This is for validating the year range by giving it 9999 as default value since this is one of the maximum value
    validateForwardDay: { type: Number, default: 99 },
    validateBackDay: { type: Number, default: 99 },
    value: {}, //This is for getting the selected date from the parent component TimeBenders
    isPast: { type: Boolean, default: false },
    isFuture: { type: Boolean, default: false },
    initialDate: { type: String, default: dayjs().format('YYYY-MM-DD') },
    spaceBetweenDays: { type: Number, default: 2 },
    maxSelectibleDay: { type: Number, default: 0 }
  },
  data() {
    return {
      firstSelectedDate: {} as date, //This is for getting the selected date from UIDatePicker
      secondSelectedDate: {} as date, //This is for getting the selected date from UIDatePicker
      isSingleDatePickerEnable: false, //This is for enabling the single date picker as default false
      isMultiDatePickerEnable: false, //This is for enabling the multi date picker as default false
      presentDate: {} as date,
      minDate: '',
      maxDate: '',
      sendInitialDates: {
        firstInitialDate: '',
        secondInitialDate: ''
      },
      positionToRight: false,
      positionToLeft: false,
      positionToLeftSingle: false,
      newSelectedDays: {
        firstSelectedDate: {},
        secondSelectedDate: {}
      }
    }
  },
  computed: {
    firstSelectedDateDisplay: {
      get() {
        return this.formatDateDisplay(this.firstSelectedDate.date)
      },
      set(newValue) {
        const isValidFormat = newValue.isValidDateFormat()

        if (isValidFormat) {
          const parsedDate = this.parseDate(newValue)
          this.firstSelectedDate.date = parsedDate
        }
      }
    },
    secondSelectedDateDisplay: {
      get() {
        return this.formatDateDisplay(this.secondSelectedDate.date)
      },
      set(newValue) {
        const isValidFormat = newValue.isValidDateFormat()

        if (isValidFormat) {
          const parsedDate = this.parseDate(newValue)
          this.secondSelectedDate.date = parsedDate
        }
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
    this.firstSelectedDate = this.sendInitialDates.firstInitialDate
    this.secondSelectedDate = this.sendInitialDates.secondInitialDate
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    updateMinDate(minDate) {
      this.minDate = minDate
    },
    updateMaxDate(maxDate) {
      this.maxDate = maxDate
    },
    formatDateDisplay(date) {
      if (!date) return ''
      const [year, month, day] = date.split('-')
      return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`
    },
    parseDate(date) {
      if (!date) return ''
      const separators = /[-/.]/
      let [day, month, year] = date.split(separators)
      return `${year}-${month}-${day}`
    },
    onFirstDateInput(value) {
      //this.secondSelectedDate.date = ''
      this.handleResetInitialDates()
      // const isValidFormat = value.isValidDateFormat()

      if (value.isValidDateFormat()) {
        const parsedDate = this.parseDate(value)
        this.firstSelectedDate.date = parsedDate
        this.$emit('update:firstSelectedDate', parsedDate)
        this.validateDates(parsedDate)
      } else {
        console.error('Invalid date format')
      }
    },
    onSecondDateInput(value) {
      this.handleResetInitialDates()
      // const isValidFormat = value.isValidDateFormat()

      if (value.isValidDateFormat()) {
        const parsedDate = this.parseDate(value)
        this.secondSelectedDate.date = parsedDate
        this.$emit('update:secondSelectedDate', parsedDate)
        this.validateDates(parsedDate)
      } else {
        console.error('Invalid date format')
      }
    },
    formatDate(dateString) {
      return dayjs(dateString).format('DD/MM/YYYY')
    },

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
    handleFirstSliderDate(sliderDate: string) {
      // We get the selected date from UIDatePicker and set it to selectedDate (Handling the emit from UIDatePicker to UIDateRangePicker)
      this.firstSelectedDate.date = sliderDate
      this.validateDates()
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
      //If the single date picker is enabled on TimeBenders, we are toggling the single date picker
      if (this.isSingle === true) {
        //We can implement it by this.isSingleDatePickerEnable = !this.isSingleDatePickerEnable; but it will create problem in muldi date picker implementation
        if (this.isSingleDatePickerEnable === false) {
          this.isSingleDatePickerEnable = true
        } else {
          // this.isSingleDatePickerEnable = false
        }
      }

      //If the multi date picker is enabled on TimeBenders, we are toggling the multi date picker with related single date picker logic
      if (this.isMulti === true) {
        this.isSingleDatePickerEnable = false
        if (this.isMultiDatePickerEnable === false) {
          this.isMultiDatePickerEnable = true
        } else {
          // this.isMultiDatePickerEnable = false
        }
      }

      this.$nextTick(() => {
        const datePicker = this.$el.querySelector('.date-picker')
        const datePickerRect = datePicker.getBoundingClientRect()
        const windowWidth = window.innerWidth
        if (this.isMultiDatePickerEnable) {
          if (datePickerRect.left < 0) {
            datePicker.classList.add('positionToRight')
            this.positionToRight = true
          }
          if (windowWidth - datePickerRect.right < 0) {
            datePicker.classList.add('positionToLeft')
            this.positionToLeft = true
          }
        } else {
          datePicker.classList.remove('positionToRight')
          this.positionToRight = false
          datePicker.classList.remove('positionToLeft')
          this.positionToLeft = false
        }

        if (this.isSingleDatePickerEnable) {
          if (windowWidth - datePickerRect.right < 0) {
            datePicker.classList.add('positionToLeftSingle')
            this.positionToLeftSingle = true
          }
        } else {
          datePicker.classList.remove('positionToLeftSingle')
          this.positionToLeftSingle = false
        }
      })
    },
    //This is for filling the initial date to the singleSelectedDate since it comes empty as default so we need to use our TypeScript interface to fill it.
    fillInitialDate() {
      if (this.isMulti) {
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
        } else {
          if (!this.isPast) {
            this.sendInitialDates.firstInitialDate = {
              number: dayjs().format('DD'),
              month: dayjs().format('MM'),
              year: dayjs().format('YYYY'),
              date: dayjs().format('YYYY-MM-DD')
            }
            this.sendInitialDates.secondInitialDate = dayjs()
              .add(this.spaceBetweenDays, 'day')
              .format('YYYY-MM-DD')
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
            this.sendInitialDates.firstInitialDate = dayjs()
              .subtract(this.spaceBetweenDays, 'day')
              .format('YYYY-MM-DD')
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
      this.sendInitialDates.firstInitialDate = ''
      if (this.isMulti) {
        this.sendInitialDates.secondInitialDate = ''
      }
    },
    validateDates(value) {
      let firstDate = dayjs(this.firstSelectedDate.date)
      let secondDate = dayjs(this.secondSelectedDate.date)
      let newDate = dayjs(value)
      const minDate = dayjs(this.minDate)
      const maxDate = dayjs(this.maxDate)

      if (this.isMulti) {
        if (this.firstSelectedDate.date === value) {
          // newDate minDate'ten önceyse
          if (newDate.isBefore(minDate)) {
            this.firstSelectedDate.date = minDate.format('YYYY-MM-DD')
            if (this.maxSelectibleDay != 0) {
              //Eğer secondDate minDate + maxSelectibleDay'den sonraysa
              if (secondDate.isAfter(minDate.add(this.maxSelectibleDay, 'day'))) {
                this.secondSelectedDate.date = minDate
                  .add(this.maxSelectibleDay, 'day')
                  .format('YYYY-MM-DD')
              }
            }
          }
          //firstSelected max'tan büyükse
          else if (newDate.isAfter(maxDate)) {
            this.secondSelectedDate.date = this.maxDate
            if (this.maxSelectibleDay != 0) {
              // Eğer firstDate maxDate - maxSelectibleDays'ten sonraysa

              this.firstSelectedDate.date = maxDate
                .subtract(this.maxSelectibleDay, 'day')
                .format('YYYY-MM-DD')
            }
          } else if (firstDate.isAfter(secondDate)) {
            this.secondSelectedDate.date = ''
            //this.secondSelectedDate.selected = false
          } else {
            if (this.maxSelectibleDay != 0) {
              // Eğer secondDate ve newDate arasındaki fark maxSelectibleDays'ten fazlaysa
              const dayDifference = secondDate.diff(newDate, 'day')
              if (dayDifference > this.maxSelectibleDay) {
                this.firstSelectedDate.date = newDate.format('YYYY-MM-DD')
                this.secondSelectedDate.date = newDate
                  .add(this.maxSelectibleDay, 'day')
                  .format('YYYY-MM-DD')
              }
            }
          }
        }
        if (this.secondSelectedDate.date === value) {
          // newDate maxDate'ten sonraysa
          if (newDate.isAfter(maxDate)) {
            this.secondSelectedDate.date = maxDate.format('YYYY-MM-DD')
            if (this.maxSelectibleDay != 0) {
              // Eğer firstDate maxDate - maxSelectibleDays'ten sonraysa
              if (firstDate.isBefore(maxDate.subtract(this.maxSelectibleDay, 'day'))) {
                this.firstSelectedDate.date = maxDate
                  .subtract(this.maxSelectibleDay, 'day')
                  .format('YYYY-MM-DD')
              }
            }
          } else if (secondDate.isBefore(firstDate)) {
            this.firstSelectedDate.date = secondDate.format('YYYY-MM-DD')
            this.secondSelectedDate.date = ''
            //this.secondSelectedDate.selected = false
          } else if (newDate.isBefore(minDate)) {
            this.firstSelectedDate = this.minDate
            if (this.maxSelectibleDay != 0) {
              //Eğer secondDate minDate + maxSelectibleDay'den sonraysa

              this.secondSelectedDate.date = minDate
                .add(this.maxSelectibleDay, 'day')
                .format('YYYY-MM-DD')
            }
          } else {
            // Eğer newDate, firstDate'ten önceyse
            // if (newDate.isBefore(firstDate)) {
            //   this.secondSelectedDate.date = firstDate.format('YYYY-MM-DD')
            //   this.firstSelectedDate.date = newDate.format('YYYY-MM-DD')
            // }

            if (this.maxSelectibleDay != 0) {
              // Eğer newDate ile firstDate arasındaki fark maxSelectibleDays'ten fazlaysa
              const dayDifference = newDate.diff(firstDate, 'day')
              if (dayDifference > this.maxSelectibleDay) {
                this.secondSelectedDate.date = newDate.format('YYYY-MM-DD')
                this.firstSelectedDate.date = newDate
                  .subtract(this.maxSelectibleDay, 'day')
                  .format('YYYY-MM-DD')
              }
            }
          }
        }
      }
      //single date picker
      else {
        if (newDate.isBefore(this.minDate)) {
          this.firstSelectedDate.date = this.minDate
        }
        if (newDate.isAfter(this.maxDate)) {
          this.firstSelectedDate.date = this.maxDate
          console.log(this.firstSelectedDate.date)
        }
      }

      this.sendDateToParent()
    }
  },

  watch: {
    firstSelectedDate: {
      handler(newVal) {
        if (!newVal.date) {
          this.firstSelectedDate = this.sendInitialDates.firstInitialDate
          this.secondSelectedDate = this.sendInitialDates.secondInitialDate
          this.fillInitialDate()
        } else {
          this.newSelectedDays.firstSelectedDate = newVal
          this.newSelectedDays.secondSelectedDate = this.secondSelectedDate
        }
      },
      deep: true
    },
    secondSelectedDate: {
      handler(newVal) {
        this.newSelectedDays.secondSelectedDate = newVal
      },
      deep: true
    }
  },
  created() {
    this.firstSelectedDate = this.sendInitialDates.firstInitialDate
    this.secondSelectedDate = this.sendInitialDates.secondInitialDate
    //We are filling the initial date when the component is created because we want to see today's date in button when we open our web page.
    this.fillInitialDate()

    this.sendDateToParent()
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variables.scss';
@import '../../assets/css/_fonts.scss';
@mixin respond-to($breakpoint) {
  @if $breakpoint == 'small' {
    @media (max-width: 768px) {
      @content;
    }
  }
}

//This is main container
.ui-date-range-picker-c {
  user-select: none;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-around;
  align-self: center;
  text-align: center;
  padding: 1rem;
  gap: 0.5rem;
  width: auto;
  position: relative;
  .label {
    font-size: 0.85rem;
    display: flex;
    text-align: left;
    padding-left: 0.25rem;
  }
  .date-picker-without-label {
    position: absolute;
    top: 50px;
    left: 10%;
  }
  .date-picker-with-label {
    position: absolute;
    top: 75px;
    left: 10%;
  }
  .isMulti {
    left: -75%;
    transition: all 0.3s;

    @include respond-to(small) {
      left: -10%;
    }
  }
  .positionToRight {
    left: 5%;
  }
  .positionToLeft {
    left: -130%;
  }
  .positionToLeftSingle {
    left: -85%;
  }

  //This is our button container
  .button {
    background: #f8f8f8;
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
      width: auto;
      align-items: center;
      justify-content: center;
    }
    &.single {
      width: auto;
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
      .date-box-icon {
        background-color: #f8f8f8;
        .date-icon {
          padding: 0;
          &:hover {
            background: #f8f8f8;
          }
        }
      }
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
          background-color: #f8f8f8;

          .date {
            width: 80px;
            margin-right: 5px;
            border: none;
            border-color: transparent;
            outline: none;
            font-size: 14px;
            font-weight: 400;
            color: #2b2b2b;
            background-color: #f8f8f8;
          }

          //Month and Year Box To Design

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
            padding: 0 10px;
          }
        }
      }
    }
  }
}
</style>
