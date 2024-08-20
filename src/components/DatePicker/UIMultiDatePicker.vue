<template>
  <!-- This is the main container to create the calendar -->

  <div class="ui-date-picker-c">
    <!-- This is where we work with our calendar -->
    <div
      class="ui-date-picker-wrapper"
      :class="{ positionToRight: positionToRight, positionToLeft: positionToLeft }">
      <!-- This is the main calendar -->
      <div class="calender-wrapper">
        <div class="calendar" v-if="!isSlider">
          <!-- This is the header section where we have button and dates-->
          <div class="header">
            <button id="prev" class="nav-button" @click="onClickToSkip(-1)" v-show="prevDate">
              <img src="../../assets/icons/arrow-left.svg" alt="" />
            </button>
            <span class="current-date" @click.stop="isSliderOpen">{{
              daysInMonth[15]?.fullDateFormatted.split('-')[1] +
              ' ' +
              daysInMonth[15]?.fullDateFormatted.split('-')[0]
            }}</span>
          </div>

          <!-- This is the weekdays section -->
          <div>
            <ul class="weekdays">
              <template v-for="(weekday, index) in weekdays" :key="index">
                <li>{{ weekday }}</li>
              </template>
            </ul>
            <!-- This is the days section -->
            <ul class="days">
              <li
                v-for="(day, index) in daysInMonth"
                :key="index"
                :class="{
                  inactive: day.inactive,
                  active: day.active,
                  selected: day.selected,
                  textDecoration: day.textDecoration,
                  blink: day.blink,
                  between: day.between,
                  isToday: day.isToday,
                  firstInitialDate: day.firstInitialDate,
                  secondInitialDate: day.secondInitialDate
                }"
                @click="selectDate(day)">
                {{ day.number }}
              </li>
            </ul>
          </div>
        </div>
        <div class="calendar" v-if="!isSlider">
          <!-- This is the header section where we have button and dates-->
          <div class="header">
            <span class="current-date" @click.stop="isSliderOpen">{{
              nextMonthDays[15]?.fullDateFormatted.split('-')[1] +
              ' ' +
              nextMonthDays[15]?.fullDateFormatted.split('-')[0]
            }}</span>
            <button id="next" class="nav-button" @click="onClickToSkip(1)" v-show="nextDate">
              <img src="../../assets/icons/arrow-right.svg" alt="" />
            </button>
          </div>

          <div>
            <ul class="weekdays">
              <template v-for="(weekday, index) in weekdays" :key="index">
                <li>{{ weekday }}</li>
              </template>
            </ul>
            <!-- This is the days section -->
            <ul class="days">
              <li
                v-for="(day, index) in nextMonthDays"
                :key="index"
                :class="{
                  inactive: day.inactive,
                  active: day.active,
                  selected: day.selected,
                  textDecoration: day.textDecoration,
                  blink: day.blink,
                  between: day.between,
                  isToday: day.isToday,
                  firstInitialDate: day.firstInitialDate,
                  secondInitialDate: day.secondInitialDate
                }"
                @click="selectDate(day)">
                {{ day.number }}
              </li>
            </ul>
          </div>
        </div>

        <div class="slider" v-if="isSlider">
          <div class="header">
            <button id="prev" class="nav-button" @click="onClickToSkip(-1)" v-show="prevDate">
              <img src="../../assets/icons/arrow-left.svg" alt="" />
            </button>
            <span class="current-date" @click.stop="isSliderOpen">{{
              daysInMonth[15]?.fullDateFormatted.split('-')[1] +
              ' ' +
              daysInMonth[15]?.fullDateFormatted.split('-')[0]
            }}</span>

            <span class="current-date" @click.stop="isSliderOpen">{{
              nextMonthDays[15]?.fullDateFormatted.split('-')[1] +
              ' ' +
              nextMonthDays[15]?.fullDateFormatted.split('-')[0]
            }}</span>
            <button id="next" class="nav-button" @click="onClickToSkip(1)" v-show="nextDate">
              <img src="../../assets/icons/arrow-right.svg" alt="" />
            </button>
          </div>
          <div v-if="isSlider">
            <UISliderDatePicker
              @sliderFirstSelected="handleFirstSliderDate"
              @sliderSecondSelected="handleSecondSliderDate"
              :firstSelectedDate="firstSelectedDate"
              :secondSelectedDate="secondSelectedDate"
              :minDate="minDate"
              :maxDate="maxDate"
              :isMulti="isMulti"
              :maxSelectableDays="maxSelectableDays" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
//Imports the needed components and interfaces
import dayjs from 'dayjs'
import date from '../../interface/IUIDatePicker'
import UISliderDatePicker from '../DatePicker/UISliderDatePicker.vue'

export default {
  name: 'UIMultiDatePicker',
  components: {
    UISliderDatePicker
  },
  data() {
    return {
      weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'], //Static weekdays
      calendarDate: dayjs(this.initialDate), //Creating the calendar date
      daysInMonth: [] as date[], //Creating the days in month as date interface object
      nextMonthDays: [] as date[], //Creating the next month's days
      firstSelectedDate: {}, //Getting first selected date as type of date interface object
      secondSelectedDate: {},
      currentDate: dayjs(this.initialDate).format('YYYY-MM-DD'), //Manipulated date for left calendar
      presentDate: dayjs().format('YYYY-MM-DD'), //Present date that won't change
      minDate: dayjs(),
      maxDate: dayjs(),
      saveFirstDateHistory: '',
      saveSecondDateHistory: '',
      prevDate: dayjs().startOf('month').format('YYYY-MM-DD'),
      nextDate: dayjs().endOf('month').format('YYYY-MM-DD'),
      changedDate: {
        oldDate: null,
        newDate: null
      },
      isSlider: false,
      formattedDate: '',
      isMulti: true
    }
  },
  props: {
    backYearRange: { type: Number, default: 99 }, //This is for validating the year range by giving it 9999 as default value since this is one of the maximum value
    forwardYearRange: { type: Number, default: 99 },
    backMonthRange: { type: Number, default: 99 }, //This is for validating the month range by giving it 9999 as default value since this is one of the maximum value
    forwardMonthRange: { type: Number, default: 99 },
    backDayRange: { type: Number, default: 99 }, //This is for validating the Day range by giving it 9999 as default value since this is one of the maximum value
    forwardDayRange: { type: Number, default: 99 },
    isPastValidation: { type: Boolean, default: false },
    isFutureValidation: { type: Boolean, default: false },
    initialDate: { type: String, default: dayjs().format('YYYY-MM-DD') },
    baseInitialDates: { type: Object },
    isDatePickerEnable: { type: Boolean },
    positionToRight: { type: Boolean, default: false },
    positionToLeft: { type: Boolean, default: false },
    newSelectedDays: { type: Object, default: null },
    maxSelectableDays: { type: Number, default: 0 }
  },
  methods: {
    handleFirstSliderDate(formattedDate: string) {
      this.formattedDate = formattedDate
      this.firstSelectedDate.date = formattedDate
      this.saveFirstDateHistory = this.firstSelectedDate.date
      this.$emit('firstSliderSelected', formattedDate)
    },
    handleSecondSliderDate(formattedDate: string) {
      this.formattedDate = formattedDate
      this.secondSelectedDate.date = formattedDate
      this.saveSecondDateHistory = this.secondSelectedDate.date
      this.$emit('secondSliderSelected', formattedDate)
    },
    isSliderOpen() {
      this.isSlider = !this.isSlider
    },

    checkRange() {
      /*

            Check the range of the year and month, if year is not 9999, update year range, if month is not 9999, update month range.
            This is intended request.
            güne göre validasyon yap
          */

      if (this.isPastValidation) {
        if (this.backYearRange !== 99) {
          let day = this.backYearRange * 365
          this.minDate = dayjs().subtract(day, 'day').format('YYYY-MM-DD')
          this.maxDate = dayjs().format('YYYY-MM-DD')
        }

        if (this.backMonthRange !== 99) {
          this.minDate = dayjs().subtract(this.backMonthRange, 'month').format('YYYY-MM-DD')
          this.maxDate = dayjs().format('YYYY-MM-DD')
        } else if (this.backDayRange !== 99) {
          this.minDate = dayjs().subtract(this.backDayRange, 'day').format('YYYY-MM-DD')
          this.maxDate = dayjs().format('YYYY-MM-DD')
        } else {
          this.minDate = dayjs().subtract(this.backYearRange, 'year').format('YYYY-MM-DD')
          this.maxDate = dayjs().format('YYYY-MM-DD')
        }
      } else if (this.isFutureValidation) {
        if (this.forwardYearRange !== 99) {
          let day = this.forwardYearRange * 365
          this.maxDate = dayjs().add(day, 'day').format('YYYY-MM-DD')
          this.minDate = dayjs().format('YYYY-MM-DD')
        }
        if (this.forwardMonthRange !== 99) {
          this.maxDate = dayjs().add(this.forwardMonthRange, 'month').format('YYYY-MM-DD')
          this.minDate = dayjs().format('YYYY-MM-DD')
        } else if (this.forwardDayRange !== 99) {
          this.maxDate = dayjs().add(this.forwardDayRange, 'day').format('YYYY-MM-DD')
          this.minDate = dayjs().format('YYYY-MM-DD')
        } else {
          this.maxDate = dayjs().add(this.forwardYearRange, 'year').format('YYYY-MM-DD')
          this.minDate = dayjs().format('YYYY-MM-DD')
        }
      } else {
        if (this.backYearRange !== 99) {
          let day = this.backYearRange * 365
          this.minDate = dayjs(this.initialDate).subtract(day, 'day').format('YYYY-MM-DD')
          if (this.forwardMonthRange !== 99) {
            this.maxDate = dayjs(this.initialDate)
              .add(this.forwardMonthRange, 'month')
              .format('YYYY-MM-DD')
          } else if (this.forwardDayRange !== 99) {
            this.maxDate = dayjs(this.initialDate)
              .add(this.forwardDayRange, 'day')
              .format('YYYY-MM-DD')
          } else {
            this.maxDate = dayjs(this.initialDate)
              .add(this.forwardYearRange, 'year')
              .format('YYYY-MM-DD')
          }
        } else if (this.backMonthRange !== 99) {
          this.minDate = dayjs(this.initialDate)
            .subtract(this.backMonthRange, 'month')
            .format('YYYY-MM-DD')

          if (this.forwardMonthRange !== 99) {
            this.maxDate = dayjs(this.initialDate)
              .add(this.forwardMonthRange, 'month')
              .format('YYYY-MM-DD')
          } else if (this.forwardDayRange !== 99) {
            this.maxDate = dayjs(this.initialDate)
              .add(this.forwardDayRange, 'day')
              .format('YYYY-MM-DD')
          } else {
            this.maxDate = dayjs(this.initialDate)
              .add(this.forwardYearRange, 'year')
              .format('YYYY-MM-DD')
          }
        } else if (this.forwardMonthRange !== 99) {
          this.maxDate = dayjs(this.initialDate)
            .add(this.forwardMonthRange, 'month')
            .format('YYYY-MM-DD')
          if (this.backMonthRange !== 99) {
            this.minDate = dayjs(this.initialDate)
              .subtract(this.backMonthRange, 'month')
              .format('YYYY-MM-DD')
          } else if (this.backDayRange !== 99) {
            this.minDate = dayjs(this.initialDate)
              .subtract(this.backDayRange, 'day')
              .format('YYYY-MM-DD')
          } else {
            let day = this.backYearRange * 365
            this.minDate = dayjs(this.initialDate).subtract(day, 'day').format('YYYY-MM-DD')
          }
        } else if (this.forwardYearRange !== 99) {
          this.maxDate = dayjs(this.initialDate)
            .add(this.forwardYearRange, 'year')
            .format('YYYY-MM-DD')
          if (this.backMonthRange !== 99) {
            this.minDate = dayjs(this.initialDate)
              .subtract(this.backMonthRange, 'month')
              .format('YYYY-MM-DD')
          } else if (this.backDayRange !== 99) {
            this.minDate = dayjs(this.initialDate)
              .subtract(this.backDayRange, 'day')
              .format('YYYY-MM-DD')
          } else {
            let day = this.backYearRange * 365
            this.minDate = dayjs(this.initialDate).subtract(day, 'day').format('YYYY-MM-DD')
          }
        } else if (this.backDayRange !== 99) {
          this.minDate = dayjs(this.initialDate)
            .subtract(this.backDayRange, 'day')
            .format('YYYY-MM-DD')
          if (this.forwardMonthRange !== 99) {
            this.maxDate = dayjs(this.initialDate)
              .add(this.forwardMonthRange, 'month')
              .format('YYYY-MM-DD')
          } else if (this.forwardDayRange !== 99) {
            this.maxDate = dayjs(this.initialDate)
              .add(this.forwardDayRange, 'day')
              .format('YYYY-MM-DD')
          } else {
            this.maxDate = dayjs(this.initialDate)
              .add(this.forwardYearRange, 'year')
              .format('YYYY-MM-DD')
          }
        } else if (this.forwardDayRange !== 99) {
          this.maxDate = dayjs(this.initialDate)
            .add(this.forwardDayRange, 'day')
            .format('YYYY-MM-DD')

          if (this.backMonthRange !== 99) {
            this.minDate = dayjs(this.initialDate)
              .subtract(this.backMonthRange, 'month')
              .format('YYYY-MM-DD')
          } else if (this.backDayRange !== 99) {
            this.minDate = dayjs(this.initialDate)
              .subtract(this.backDayRange, 'day')
              .format('YYYY-MM-DD')
          } else {
            this.minDate = dayjs(this.initialDate)
              .subtract(this.backYearRange, 'year')
              .format('YYYY-MM-DD')
          }
        } else {
          let day = this.forwardYearRange * 365
          this.minDate = dayjs(this.initialDate).subtract(day, 'day').format('YYYY-MM-DD')
          this.maxDate = dayjs(this.initialDate).add(day, 'day').format('YYYY-MM-DD')
        }
      }
      this.$emit('minDate', this.minDate)
      this.$emit('maxDate', this.maxDate)
    },
    populdateMonthDays() {
      if (this.isPastValidation) {
        if (this.backDayRange !== 99) {
          this.daysInMonth = this.totalDaysInMonth(-1)
          this.nextMonthDays = this.totalDaysInMonth(0)
          return
        }
        if (dayjs(this.calendarDate).format('YYYY-MM') == dayjs(this.minDate).format('YYYY-MM')) {
          this.daysInMonth = this.totalDaysInMonth(0)
          this.nextMonthDays = this.totalDaysInMonth(1)
          return
        }
        this.daysInMonth = this.totalDaysInMonth(-1)
        this.nextMonthDays = this.totalDaysInMonth(0)
        return
      }
      if (this.forwardDayRange !== 99) {
        this.daysInMonth = this.totalDaysInMonth(0)
        this.nextMonthDays = this.totalDaysInMonth(1)
        return
      }
      if (dayjs(this.calendarDate).format('YYYY-MM') == dayjs(this.maxDate).format('YYYY-MM')) {
        this.daysInMonth = this.totalDaysInMonth(-1)
        this.nextMonthDays = this.totalDaysInMonth(0)
        return
      }
      this.daysInMonth = this.totalDaysInMonth(0)
      this.nextMonthDays = this.totalDaysInMonth(1)
    },
    //This is where we create the calendar for a month
    totalDaysInMonth(offset: number) {
      const daysInWholeMonth = [] as date[] //Empty days array to fill with days
      const startOfMonth = this.calendarDate.add(offset, 'month').startOf('month') //Start of the month
      const endOfMonth = this.calendarDate.add(offset, 'month').endOf('month') //End of the month

      /*
        Purpose of the below comments is to explain the logic of
        the offsetvalues where we empty the days regarding to months
        at the beginning and end of the month
      */

      /*
        startOfMonth.day() gives the day of the week (0-6) for the first day of the month
        Adding 6 shifts the days so that Sunday (0) becomes the last day of the week
        % 7 ensures the value stays within the range of 0-6
      */

      const offsetValue = (startOfMonth.day() + 6) % 7
      /*
        endOfMonth.date() gives the last day of the month (1-31)
        (offsetValue + endOfMonth.date()) % 7 gives the day of the week for the last day of the month
        % 7 ensures the value stays within the range of 0-6
      */
      const endOffsetValue = (7 - ((offsetValue + endOfMonth.date()) % 7)) % 7

      //let today = dayjs().format('D') //Today's date but with manipulated format in loops
      const date = dayjs(this.currentDate).add(offset, 'month') //Manipulated date's in loop manipulation

      // Create the empty values at the beginning of the month
      for (let i = 0; i < offsetValue; i++) {
        daysInWholeMonth.push({ date: '', inactive: true, isToday: false })
      }

      // Create the days of the month
      for (let i = 0; i < endOfMonth.date(); i++) {
        const dateSender = date.startOf('month').add(i, 'day')
        const getDate = dayjs(dateSender).format('YYYY-MM-DD')
        const formattedDate = dayjs(dateSender).format('YYYY-MMMM-DD')

        daysInWholeMonth.push({
          date: getDate,
          inactive: false,
          selected: false,
          textDecoration: false,
          isToday: this.presentDate == getDate,
          number: i + 1,
          month: dayjs(dateSender).format('MM'),
          year: dayjs(dateSender).format('YYYY'),
          firstInitialDate: getDate == this.baseInitialDates.firstInitialDate.date ? true : false,
          secondInitialDate: getDate == this.baseInitialDates.secondInitialDate.date ? true : false,
          fullDateFormatted: formattedDate
        })
      }

      // Create the empty values at the end of the month
      for (let i = 1; i <= endOffsetValue; i++) {
        daysInWholeMonth.push({ date: '', inactive: true, isToday: false })
      }
      this.linedThroughDate() //Lining through the date
      this.checkDateHistory() //Checking the date history
      return daysInWholeMonth
    },
    checkSkippability() {
      if (this.isPastValidation) {
        this.prevDate =
          dayjs(this.minDate).format('YYYY-MM') <
          dayjs(this.calendarDate).subtract(1, 'month').format('YYYY-MM')
        this.nextDate =
          dayjs(this.maxDate).format('YYYY-MM') > dayjs(this.calendarDate).format('YYYY-MM')
      } else if (this.isFutureValidation) {
        this.prevDate =
          dayjs(this.minDate).format('YYYY-MM') < dayjs(this.calendarDate).format('YYYY-MM')
        this.nextDate =
          dayjs(this.maxDate).format('YYYY-MM') >
          dayjs(this.calendarDate).add(1, 'month').format('YYYY-MM')
      } else {
        this.prevDate =
          dayjs(this.minDate).format('YYYY-MM') < dayjs(this.calendarDate).format('YYYY-MM')
        this.nextDate =
          dayjs(this.maxDate).subtract(1, 'month').format('YYYY-MM') >
          dayjs(this.calendarDate).format('YYYY-MM')
      }
    },
    //This is for the right button to go to the next month
    onClickToSkip(offset: number) {
      this.calendarDate = this.calendarDate.add(offset, 'month')
      this.currentDate = this.calendarDate.format('YYYY-MM-DD')
      //This is for creating the days in the next month with manipulated date
      this.populdateMonthDays()
      this.checkDateHistory()
      this.updateBetweenDates()
      this.linedThroughDate()
      this.checkSkippability()
    },
    rearrangeSelects(reDate: string, condition: boolean) {
      this.daysInMonth.forEach((day) => {
        if (dayjs(reDate).format('YYYY-MM-DD') == dayjs(day.date).format('YYYY-MM-DD')) {
          day.selected = true
          if (condition) {
            this.secondSelectedDate = day
            return
          } else {
            this.firstSelectedDate = day
            return
          }
        }
      })
      this.nextMonthDays.forEach((day) => {
        if (dayjs(reDate).format('YYYY-MM-DD') == dayjs(day.date).format('YYYY-MM-DD')) {
          day.selected = true
          if (condition) {
            this.secondSelectedDate = day
            return
          } else {
            this.firstSelectedDate = day
            return
          }
        }
      })
    },
    selectDate(selectedDay: date) {
      if (this.baseInitialDates.firstInitialDate.date == this.firstSelectedDate.date) {
        this.firstSelectedDate = {}
        this.secondSelectedDate = {}
      }

      if (this.baseInitialDates.firstInitialDate) {
        this.emitResetInitialDates() // turuncu baslangic degerlerini ilk tiklamada emit edip false olmasini saglar
      }

      if (!this.firstSelectedDate.date) {
        // First boşsa gir
        this.firstSelectedDate = selectedDay
        this.firstSelectedDate.selected = true
        this.saveFirstDateHistory = this.firstSelectedDate.date
      } else {
        const temp = selectedDay.date < this.firstSelectedDate.date
        if (selectedDay.date < this.firstSelectedDate.date) {
          // Seçilen gün first'ten küçükse gir
          if (!this.secondSelectedDate.date) {
            // First varsa, second yoksa gir (seçileni first, önceki first'ü second yapar)
            this.secondSelectedDate = this.firstSelectedDate
            this.firstSelectedDate = selectedDay
            if (this.maxSelectableDays != 0) {
              this.rearrangeController(temp)
            }
            this.firstSelectedDate.selected = true
            this.secondSelectedDate.selected = true
            this.saveFirstDateHistory = this.firstSelectedDate.date
            this.saveSecondDateHistory = this.secondSelectedDate.date
          } else {
            // First ve second varsa gir (tarihi sola doğru genişletir)
            this.firstSelectedDate.selected = false
            this.firstSelectedDate = selectedDay
            if (this.maxSelectableDays != 0) {
              this.rearrangeController(temp)
            }

            this.firstSelectedDate.selected = true
            this.saveFirstDateHistory = this.firstSelectedDate.date
          }
        } else if (selectedDay.date == this.firstSelectedDate.date) {
          if (this.isPastValidation) {
            this.firstSelectedDate.selected = false
            this.firstSelectedDate = this.secondSelectedDate
            this.saveFirstDateHistory = this.firstSelectedDate.date
            this.secondSelectedDate = {}
            this.saveSecondDateHistory = ''
          } else {
            // Seçilen gün first'e eşitse gir (seçilenleri kaldırır)
            this.firstSelectedDate.selected = false
            this.secondSelectedDate.selected = false
            this.firstSelectedDate = {}
            this.secondSelectedDate = {}
            this.saveFirstDateHistory = ''
            this.saveSecondDateHistory = ''
          }
        } else if (selectedDay.date > this.firstSelectedDate.date) {
          if (selectedDay.date == this.secondSelectedDate.date) {
            this.secondSelectedDate.selected = false
            this.secondSelectedDate = {}
            this.saveSecondDateHistory = ''
          } else {
            // seçilen gün first'ten büyükse gir (tarihi sağa doğru daraltır veya genişletir)
            this.secondSelectedDate.selected = false
            this.secondSelectedDate = selectedDay
            if (this.maxSelectableDays != 0) {
              this.rearrangeController()
            }

            this.secondSelectedDate.selected = true
            this.saveSecondDateHistory = this.secondSelectedDate.date
          }
        }
      }
      const FDate = {
        number:
          this.firstSelectedDate.number < 10
            ? '0' + this.firstSelectedDate.number
            : this.firstSelectedDate.number,
        month: this.firstSelectedDate.month,
        year: this.firstSelectedDate.year,
        date: this.firstSelectedDate.date
      }
      const SDate = {
        number:
          this.secondSelectedDate.number < 10
            ? '0' + this.secondSelectedDate.number
            : this.secondSelectedDate.number,
        month: this.secondSelectedDate.month,
        year: this.secondSelectedDate.year,
        date: this.secondSelectedDate.date
      }
      this.emitDate('dateFirstSelected', FDate)
      this.emitDate('dateSecondSelected', SDate)
      this.deactivateAllBetween()
      this.updateBetweenDates()
    },
    rearrangeController(condition: boolean) {
      const firstDate = dayjs(this.firstSelectedDate.date)
      const secondDate = dayjs(this.secondSelectedDate.date)
      const ifValidate = secondDate.diff(firstDate, 'day')

      if (condition) {
        if (ifValidate > this.maxSelectableDays) {
          this.secondSelectedDate.selected = false
          const newDate = dayjs(this.secondSelectedDate.date).subtract(
            ifValidate - this.maxSelectableDays,
            'day'
          )
          this.rearrangeSelects(newDate, condition)
          this.changedDate = {
            oldDate: secondDate.format('DD-MM-YYYY'),
            newDate: newDate.format('DD-MM-YYYY')
          }
          this.$emit('changedDate', this.changedDate)
        }
      } else {
        if (ifValidate > this.maxSelectableDays) {
          this.firstSelectedDate.selected = false
          const newDate2 = dayjs(this.firstSelectedDate.date).add(
            ifValidate - this.maxSelectableDays,
            'day'
          )
          this.rearrangeSelects(newDate2)
          this.changedDate = {
            oldDate: firstDate.format('DD-MM-YYYY'),
            newDate: newDate2.format('DD-MM-YYYY')
          }
          this.$emit('changedDate', this.changedDate)
        }
      }
    },

    emitDate(event, date) {
      this.$emit(event, date)
    },
    emitResetInitialDates() {
      this.daysInMonth.forEach((day) => {
        if (day.firstInitialDate || day.secondInitialDate) {
          day.firstInitialDate = false
          day.secondInitialDate = false
        }
      })

      this.nextMonthDays.forEach((day) => {
        if (day.firstInitialDate || day.secondInitialDate) {
          day.firstInitialDate = false
          day.secondInitialDate = false
        }
      })
      this.$emit('resetBaseInitialDates')
    },
    resetInitialDates() {
      this.baseInitialDates.firstInitialDate = ''
      this.baseInitialDates.secondInitialDate = ''
      this.daysInMonth.forEach((day) => {
        if (day.firstInitialDate || day.secondInitialDate) {
          day.firstInitialDate = false
          day.secondInitialDate = false
        }
      })

      this.nextMonthDays.forEach((day) => {
        if (day.firstInitialDate || day.secondInitialDate) {
          day.firstInitialDate = false
          day.secondInitialDate = false
        }
      })
    },
    emitResetSecondDates() {
      this.daysInMonth.forEach((day) => {
        if (day.secondInitialDate) {
          day.secondInitialDate = false
        }
      })

      this.nextMonthDays.forEach((day) => {
        if (day.secondInitialDate) {
          day.secondInitialDate = false
        }
      })
      this.$emit('resetBaseSecondDates')
    },
    checkDateHistory() {
      //Checking the date history and setting the selected date
      for (let i = 0; i < this.daysInMonth.length; i++) {
        //If the date history is equal to the date in the month, set the selected date to true
        if (
          this.daysInMonth[i].date === this.saveFirstDateHistory &&
          this.saveFirstDateHistory != ''
        ) {
          this.daysInMonth[i].selected = true
          this.firstSelectedDate = this.daysInMonth[i]
        }
        if (
          this.daysInMonth[i].date === this.saveSecondDateHistory &&
          this.saveSecondDateHistory != ''
        ) {
          this.daysInMonth[i].selected = true
          this.secondSelectedDate = this.daysInMonth[i]
        }
      }
      for (let i = 0; i < this.nextMonthDays.length; i++) {
        //If the date history is equal to the date in the month, set the selected date to true
        if (
          this.nextMonthDays[i].date === this.saveFirstDateHistory &&
          this.saveFirstDateHistory != ''
        ) {
          this.nextMonthDays[i].selected = true
          this.firstSelectedDate = this.nextMonthDays[i]
        }
        if (
          this.nextMonthDays[i].date === this.saveSecondDateHistory &&
          this.saveSecondDateHistory != ''
        ) {
          this.nextMonthDays[i].selected = true
          this.secondSelectedDate = this.nextMonthDays[i]
        }
      }
    },
    deactivateAllBetween() {
      this.daysInMonth.forEach((day) => {
        day.between = false
        day.active = false
      })

      this.nextMonthDays.forEach((day) => {
        day.between = false
        day.active = false
      })
    },
    updateBetweenDates() {
      const startDate = this.firstSelectedDate
      const endDate = this.secondSelectedDate
      const startDateIndex = dayjs(startDate.date).format('YYYY-MM')
      const endDateIndex = dayjs(endDate.date).format('YYYY-MM')
      const leftCalendarIndex = dayjs(this.daysInMonth[15].date).format('YYYY-MM')
      const rightCalendarIndex = dayjs(this.nextMonthDays[15].date).format('YYYY-MM')
      if (startDate.date && endDate.date) {
        // seçilen iki tarih farklı aylardaysa
        if (startDate.month !== endDate.month) {
          // soldaki takvim için
          this.daysInMonth.forEach((day) => {
            if (
              // firstSelectedDate, soldaki takvimde ise o takvimdeki sağdaki günlerin between'ini true yap
              startDateIndex == leftCalendarIndex &&
              day.number > startDate.number &&
              day.number != 0
            ) {
              day.active = true
              day.between = true
            } else if (
              // secondSelectedDate, soldaki takvimde ise o takvimdeki soldaki günlerin between'ini true yap
              endDateIndex == leftCalendarIndex &&
              day.number < endDate.number &&
              day.number != 0
            ) {
              day.active = true
              day.between = true
            } else if (
              // iki tarihin ayı soldaki takvime ait değil ise soldaki takvimin tamamının between'ini true yap
              startDateIndex < leftCalendarIndex &&
              leftCalendarIndex < endDateIndex &&
              day.number != 0
            ) {
              day.active = true
              day.between = true
            }
          })
          // sağdaki takvim için
          this.nextMonthDays.forEach((day) => {
            if (
              // firstSelectedDate, sağdaki takvimde ise o takvimdeki sağdaki günlerin between'ini true yap
              startDateIndex == rightCalendarIndex &&
              day.number > startDate.number &&
              day.number != 0
            ) {
              day.active = true
              day.between = true
            } else if (
              // secondSelectedDate, sağdaki takvimde ise o takvimdeki soldaki günlerin between'ini true yap
              endDateIndex == rightCalendarIndex &&
              day.number < endDate.number &&
              day.number != 0
            ) {
              day.active = true
              day.between = true
            } else if (
              // iki tarihin ayı sağdaki takvime ait değil ise sağdaki takvimin tamamının between'ini true yap
              startDateIndex < rightCalendarIndex &&
              rightCalendarIndex < endDateIndex &&
              day.number != 0
            ) {
              day.active = true
              day.between = true
            }
          })
        }
        // seçilen iki tarih aynı aylardaysa
        else {
          // seçilen iki tarih de soldaki takvimde ise tarihler arasındaki day'lerin between'ini true yap
          if (startDateIndex == leftCalendarIndex && endDateIndex == leftCalendarIndex) {
            this.daysInMonth.forEach((day) => {
              if (day.number > startDate.number && day.number < endDate.number && day.number != 0) {
                day.active = true
                day.between = true
              }
            })
          } else if (
            // seçilen iki tarih de sağdaki takvimde ise tarihler arasındaki day'lerin between'ini tru yap
            startDateIndex == rightCalendarIndex &&
            endDateIndex == rightCalendarIndex
          ) {
            this.nextMonthDays.forEach((day) => {
              if (day.number > startDate.number && day.number < endDate.number && day.number != 0) {
                day.active = true
                day.between = true
              }
            })
          }
        }
        this.firstSelectedDate.active = true
        this.secondSelectedDate.active = true
      }
    },
    linedThroughDate() {
      if (this.isPastValidation) {
        this.nextMonthDays.forEach((day) => {
          if (
            // monthRange ay önceki tarihin solundaki günler çizilir
            day.date < dayjs(this.minDate).format('YYYY-MM-DD') &&
            day.month === dayjs(this.minDate).format('MM') &&
            day.year === dayjs(this.minDate).format('YYYY') &&
            day.number < dayjs(this.minDate).date()
          ) {
            day.textDecoration = true
          }

          if (
            // bulunulan tarihin sağındaki günler çizilir
            day.date > dayjs(this.presentDate).format('YYYY-MM-DD') &&
            day.month === dayjs(this.maxDate).format('MM') &&
            day.year === dayjs(this.maxDate).format('YYYY')
          ) {
            day.textDecoration = true
          }
        })
        this.daysInMonth.forEach((day) => {
          if (this.backDayRange !== 99) {
            if (day.date < dayjs(this.minDate).format('YYYY-MM-DD')) {
              day.textDecoration = true
            }
          }
          if (
            day.date < dayjs(this.minDate).format('YYYY-MM-DD') &&
            day.month === dayjs(this.minDate).format('MM') &&
            day.year === dayjs(this.minDate).format('YYYY')
          ) {
            day.textDecoration = true
          }
        })
      } else {
        this.daysInMonth.forEach((day) => {
          if (this.backDayRange !== 99) {
            if (day.date < dayjs(this.minDate).format('YYYY-MM-DD')) {
              day.textDecoration = true
            }
          }
          if (
            // bulunulan tarihin solundaki günler çizilir
            day.date < dayjs(this.minDate).format('YYYY-MM-DD') &&
            day.month === dayjs(this.minDate).format('MM') &&
            day.year === dayjs(this.minDate).format('YYYY')
          ) {
            day.textDecoration = true
          }

          if (
            // monthRange ay sonraki tarihin sağındaki günler çizilir
            day.date > dayjs(this.maxDate).format('YYYY-MM-DD') &&
            day.month === dayjs(this.maxDate).format('MM') &&
            day.year === dayjs(this.maxDate).format('YYYY')
          ) {
            day.textDecoration = true
          }
        })
        this.nextMonthDays.forEach((day) => {
          if (this.forwardDayRange !== 99) {
            if (day.date > dayjs(this.maxDate).format('YYYY-MM-DD')) {
              day.textDecoration = true
            }
          }
          if (
            // bulunulan tarihin sağındaki günler çizilir
            day.date > dayjs(this.maxDate).format('YYYY-MM-DD') &&
            day.month === dayjs(this.maxDate).format('MM') &&
            day.year === dayjs(this.maxDate).format('YYYY')
          ) {
            day.textDecoration = true
          }
        })
      }
    }
  },
  watch: {
    newSelectedDays: {
      handler(newVal) {
        this.saveFirstDateHistory = newVal.firstSelectedDate.date

        this.saveSecondDateHistory = newVal.secondSelectedDate.date
        this.calendarDate = dayjs(this.saveFirstDateHistory)
        this.currentDate = this.calendarDate.format('YYYY-MM-DD')

        this.populdateMonthDays()
        this.checkDateHistory()
        this.updateBetweenDates()
        this.linedThroughDate() // Her iki takvim için geçerli
        this.checkSkippability()
      },
      deep: true
    },
    isDatePickerEnable(newVal) {
      if (newVal) {
        if (!this.saveFirstDateHistory) {
          this.calendarDate = dayjs(this.initialDate)
        } else {
          this.calendarDate = dayjs(this.saveFirstDateHistory)
        }

        this.currentDate = this.calendarDate.format('YYYY-MM-DD')
        this.isSlider = false
        this.populdateMonthDays()
        this.checkDateHistory()
        this.updateBetweenDates()
        this.linedThroughDate() // Her iki takvim için geçerli
        this.checkSkippability()
      }
    },
    saveFirstDateHistory(newVal) {
      this.saveFirstDateHistory = newVal

      if (!newVal) {
        // saveFirstDateHistory'i izle eğer saveFirstDateHistory boş ise tetiklensin ve initiallar işaretlensin
        this.daysInMonth.forEach((day) => {
          // soldaki takvim için initial'ları ara
          if (day.date == this.baseInitialDates.firstInitialDate.date) {
            day.firstInitialDate = true
          }
          if (day.date == this.baseInitialDates.secondInitialDate.date) {
            day.secondInitialDate = true
          }
        })

        this.nextMonthDays.forEach((day) => {
          // sağdaki takvim için initial'ları ara
          if (day.date == this.baseInitialDates.firstInitialDate.date) {
            day.firstInitialDate = true
          }
          if (day.date == this.baseInitialDates.secondInitialDate.date) {
            day.secondInitialDate = true
          }
        })
      }
    }
  },

  created() {
    //When the component is created, we are checking the range, creating the days in month and checking the date history
    this.checkRange()
    this.populdateMonthDays()
    this.checkDateHistory()
    this.linedThroughDate()
    this.checkSkippability()
    this.resetInitialDates()
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

.ui-date-picker-c {
  align-self: center;

  .ui-date-picker-wrapper {
    background: white;
    box-shadow: 2px 2px 6px #5c75991a;
    border: 1px solid #e6e6e6;
    border-radius: $border-radius-medium;
    opacity: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-top: 1.5rem;
    z-index: 1000;

    > div {
      display: flex;
      align-items: center;
      border-radius: 50px;
      width: 600px;
      height: 250px;
      flex-direction: row;
      transition: all 0.3s;
      @include respond-to('small') {
        width: 100%;
        height: auto;
        flex-direction: column;
      }
    }
    &::before {
      content: '';
      position: absolute;
      top: -10px;
      left: 50%;
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid #ffffff;
      @include respond-to('small') {
        left: 40%;
      }
    }
    &.positionToRight::before {
      left: 15%;
      @include respond-to('small') {
        left: 28%;
      }
    }
    &.positionToLeft::before {
      left: 75%;
    }
    .calender-wrapper {
      .calendar {
        padding-top: 1.2rem;
        width: 300px;
        height: 220px;
        background: #ffffff;
        margin: 0 10px;
        border-radius: 30px;

        .header {
          position: relative;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          width: 100%;

          .nav-button {
            background-color: transparent;
            border: none;
            font-size: 1rem;
            cursor: pointer;
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
              width: 15px;
              height: 15px;
            }
          }

          .nav-button:first-child {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
          }

          .nav-button:last-child {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
          }

          .current-date {
            text-align: center;
            border: 1px solid #848484;
            border-radius: $border-radius-medium;
            padding: 4px 12px;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
          }
        }
      }
      .slider {
        padding-top: 1.2rem;
        width: 550px;
        height: 230px;
        background: #ffffff;
        margin: 0 10px;
        border-radius: 30px;

        .header {
          position: relative;
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;

          .nav-button {
            background-color: transparent;
            border: none;
            font-size: 1rem;
            cursor: pointer;
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
              width: 15px;
              height: 15px;
            }
          }

          .nav-button:first-child {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
          }

          .nav-button:last-child {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
          }

          .current-date {
            text-align: center;
            border: 1px solid #848484;
            border-radius: $border-radius-medium;
            padding: 4px 12px;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
          }
        }
      }
    }
    .weekdays,
    .days {
      list-style: none;
      padding: 0;
      margin: 0;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
      font-size: 11px;
    }

    .weekdays {
      padding-top: 20px;
      font-weight: 700;
      color: #363636;
      opacity: 0.7;
    }

    .days {
      padding-top: 6px;
      .isToday {
        background: #e7e7e7;
        border-radius: 16px;
      }
      .between {
        background-color: #89d6ff50;
        &.isToday {
          border-radius: 0;
        }
      }
    }

    .days li {
      padding: 10px 10px;
      font-weight: 500;
      line-height: 6px;
      cursor: pointer;
      transition: all 0.3s;
    }
    .days li.textDecoration {
      color: grey;
      text-decoration: line-through;
      pointer-events: none;
      cursor: not-allowed;
    }
    .days li.inactive {
      visibility: hidden;
      pointer-events: none;
      cursor: not-allowed;
    }
    .days li.selected {
      background-color: $accent-primary-color;
      border-radius: 4px;
      color: white;
    }

    .days li.firstInitialDate,
    .days li.secondInitialDate {
      background-color: $secondary-color;
      border-radius: 4px;
      color: white;
    }
  }
}
</style>
