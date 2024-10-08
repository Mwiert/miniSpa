<template>
  <!-- This is the main container to create the calendar -->
  <div class="ui-date-picker-c">
    <!-- This is where we work with our calendar -->
    <div class="ui-date-picker-wrapper">
      <div>
        <!-- This is the main calendar -->
        <div class="calendar">
          <!-- This is the header section where we have button and dates-->
          <div class="header">
            <button id="prev" class="nav-button" @click="onClickToSkip(-1)" v-show="prevDate">
              <img src="../../assets/icons/arrow-left.svg" alt="" />
            </button>

            <span class="current-date" @click="isSliderOpen">{{ dateHolder }} </span>

            <button id="next" class="nav-button" @click="onClickToSkip(1)" v-show="nextDate">
              <img src="../../assets/icons/arrow-right.svg" alt="" />
            </button>
          </div>
          <UISliderDatePicker
            v-if="isSlider"
            @sliderFirstSelected="handleFirstSliderDate"
            :firstSelectedDate="saveDate"
            :minDate="minDate"
            :maxDate="maxDate"
            :isSingle="isSingle" />
          <div v-else>
            <!-- This is the weekdays section -->
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
                  isToday: day.isToday
                }"
                @click="selectDate(day)">
                {{ day.number }}
              </li>
            </ul>
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
  name: 'UIDatePicker',
  components: {
    UISliderDatePicker
  },
  data() {
    return {
      weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'], //Static weekdays
      calendarDate: dayjs(this.saveDate.date), //Creating the calendar date
      daysInMonth: [] as date[], //Creating the days in month as date interface object
      firstSelectedDate: {}, //Getting first selected date as type of date interface object
      currentDate: dayjs(this.saveDate.date).format('YYYY-MM-DD'), //Manipulated date
      presentDate: dayjs().format('YYYY-MM-DD'), //Present date that won't change
      minDate: dayjs(), //Minimum date range we select (Will manipulated later in code)
      maxDate: dayjs(), // Maximum date range we select (Will manipulated later in code)
      saveDateHistory: this.saveDate.date, //Saving the date history so we can see when we close calendar
      prevDate: dayjs().startOf('month').format('YYYY-MM-DD'),
      nextDate: dayjs().endOf('month').format('YYYY-MM-DD'),
      formattedDate: '',
      isSlider: false
    }
  },
  props: {
    backYearRange: { type: Number, default: 99 }, //This is for validating the year range by giving it 9999 as default value since this is one of the maximum value
    forwardYearRange: { type: Number, default: 99 },
    saveDate: { type: Object, default: null }, //This is for saving the date history
    backMonthRange: { type: Number, default: 99 }, //This is for validating the month range by giving it 9999 as default value since this is one of the maximum value
    forwardMonthRange: { type: Number, default: 99 },
    backDayRange: { type: Number, default: 99 }, //This is for validating the Day range by giving it 9999 as default value since this is one of the maximum value
    forwardDayRange: { type: Number, default: 99 },
    isPastValidation: { type: Boolean, default: false },
    isFutureValidation: { type: Boolean, default: false },
    isDatePickerEnable: { type: Boolean },
    newSelectedDays: { type: Object, default: null },

    isSingle: { type: Boolean, default: true }
  },
  methods: {
    handleFirstSliderDate(formattedDate: string) {
      this.formattedDate = formattedDate
      this.firstSelectedDate.date = formattedDate
      this.saveDateHistory = this.firstSelectedDate.date
      this.$emit('sliderSelected', formattedDate)
    },
    isSliderOpen() {
      this.isSlider = !this.isSlider
    },
    checkRange() {
      if (this.isPastValidation) {
        if (this.backMonthRange !== 99) {
          this.minDate = dayjs().subtract(this.backMonthRange, 'month').format('YYYY-MM-DD')
        } else if (this.backDayRange !== 99) {
          this.minDate = dayjs().subtract(this.backDayRange, 'day').format('YYYY-MM-DD')
        } else {
          this.minDate = dayjs().subtract(this.backYearRange, 'year').format('YYYY-MM-DD')
        }

        this.maxDate = dayjs().format('YYYY-MM-DD')
      } else if (this.isFutureValidation) {
        this.minDate = dayjs().format('YYYY-MM-DD')

        if (this.forwardMonthRange !== 99) {
          this.maxDate = dayjs().add(this.forwardMonthRange, 'month').format('YYYY-MM-DD')
        } else if (this.forwardDayRange !== 99) {
          this.maxDate = dayjs().add(this.forwardDayRange, 'day').format('YYYY-MM-DD')
        } else {
          this.maxDate = dayjs().add(this.forwardYearRange, 'year').format('YYYY-MM-DD')
        }
      } else {
        if (this.backMonthRange !== 99) {
          this.minDate = dayjs(this.saveDate.date)
            .subtract(this.backMonthRange, 'month')
            .format('YYYY-MM-DD')
          if (this.forwardMonthRange !== 99) {
            this.maxDate = dayjs(this.saveDate.date)
              .add(this.forwardMonthRange, 'month')
              .format('YYYY-MM-DD')
          } else if (this.forwardDayRange !== 99) {
            this.maxDate = dayjs(this.saveDate.date)
              .add(this.forwardDayRange, 'day')
              .format('YYYY-MM-DD')
          } else {
            this.maxDate = dayjs(this.saveDate.date)
              .add(this.forwardYearRange, 'year')
              .format('YYYY-MM-DD')
          }
        } else if (this.backYearRange !== 99) {
          this.minDate = dayjs(this.saveDate.date)
            .subtract(this.backYearRange, 'year')
            .format('YYYY-MM-DD')
          if (this.forwardMonthRange !== 99) {
            this.maxDate = dayjs(this.saveDate.date)
              .add(this.forwardMonthRange, 'month')
              .format('YYYY-MM-DD')
          } else if (this.forwardDayRange !== 99) {
            this.maxDate = dayjs(this.saveDate.date)
              .add(this.forwardDayRange, 'day')
              .format('YYYY-MM-DD')
          } else {
            this.maxDate = dayjs(this.saveDate.date)
              .add(this.forwardYearRange, 'year')
              .format('YYYY-MM-DD')
          }
        } else if (this.forwardMonthRange !== 99) {
          this.maxDate = dayjs(this.saveDate.date)
            .add(this.forwardMonthRange, 'month')
            .format('YYYY-MM-DD')
          if (this.backMonthRange !== 99) {
            this.minDate = dayjs(this.saveDate.date)
              .subtract(this.backMonthRange, 'month')
              .format('YYYY-MM-DD')
          } else if (this.backDayRange !== 99) {
            this.minDate = dayjs(this.saveDate.date)
              .subtract(this.backDayRange, 'day')
              .format('YYYY-MM-DD')
          } else {
            this.minDate = dayjs(this.saveDate.date)
              .subtract(this.backYearRange, 'year')
              .format('YYYY-MM-DD')
          }
        } else if (this.forwardYearRange !== 99) {
          this.maxDate = dayjs(this.saveDate.date)
            .add(this.forwardYearRange, 'year')
            .format('YYYY-MM-DD')
          if (this.backMonthRange !== 99) {
            this.minDate = dayjs(this.saveDate.date)
              .subtract(this.backMonthRange, 'month')
              .format('YYYY-MM-DD')
          } else if (this.backDayRange !== 99) {
            this.minDate = dayjs(this.saveDate.date)
              .subtract(this.backDayRange, 'day')
              .format('YYYY-MM-DD')
          } else {
            this.minDate = dayjs(this.saveDate.date)
              .subtract(this.backYearRange, 'year')
              .format('YYYY-MM-DD')
          }
        } else if (this.backDayRange !== 99) {
          this.minDate = dayjs(this.saveDate.date)
            .subtract(this.backDayRange, 'day')
            .format('YYYY-MM-DD')
          if (this.forwardMonthRange !== 99) {
            this.maxDate = dayjs(this.saveDate.date)
              .add(this.forwardMonthRange, 'month')
              .format('YYYY-MM-DD')
          } else if (this.forwardDayRange !== 99) {
            this.maxDate = dayjs(this.saveDate.date)
              .add(this.forwardDayRange, 'day')
              .format('YYYY-MM-DD')
          } else {
            this.maxDate = dayjs(this.saveDate.date)
              .add(this.forwardYearRange, 'year')
              .format('YYYY-MM-DD')
          }
        } else if (this.forwardDayRange !== 99) {
          this.maxDate = dayjs(this.saveDate.date)
            .add(this.forwardDayRange, 'day')
            .format('YYYY-MM-DD')
          if (this.backMonthRange !== 99) {
            this.minDate = dayjs(this.saveDate.date)
              .subtract(this.backMonthRange, 'month')
              .format('YYYY-MM-DD')
          } else if (this.backDayRange !== 99) {
            this.minDate = dayjs(this.saveDate.date)
              .subtract(this.backDayRange, 'day')
              .format('YYYY-MM-DD')
          } else {
            this.minDate = dayjs(this.saveDate.date)
              .subtract(this.backYearRange, 'year')
              .format('YYYY-MM-DD')
          }
        } else {
          this.minDate = dayjs(this.saveDate.date)
            .subtract(this.forwardYearRange, 'year')
            .format('YYYY-MM-DD')
          this.maxDate = dayjs(this.saveDate.date)
            .add(this.forwardYearRange, 'year')
            .format('YYYY-MM-DD')
        }
      }
      this.$emit('minDate', this.minDate)
      this.$emit('maxDate', this.maxDate)
    },
    //This is where we create the calendar for a month
    totalDaysInMonth() {
      const daysInWholeMonth = [] // Empty days array to fill with days
      const startOfMonth = this.calendarDate.startOf('month') // Start of the month
      const endOfMonth = this.calendarDate.endOf('month') // End of the month

      /*
        Purpose of the below comments is to explain the logic of
        the offsetvalues where we empty the days regarding to months
        at the beginning and end of the month
        */

      /*
          startOfMonth.day() gives the day of the week (0-6) for the first day of the month
          Adding 6 shifts the days so that Sunday (0) becomes the last day of the week
          % 7 ensures the value stays within the range of 0-6
        */ const offsetValue = (startOfMonth.day() + 6) % 7
      /*
          endOfMonth.date() gives the last day of the month (1-31)
          (offsetValue + endOfMonth.date()) % 7 gives the day of the week for the last day of the month
          % 7 ensures the value stays within the range of 0-6
        */
      const endOffsetValue = (offsetValue + (endOfMonth.date() % 7)) % 7

      const date = dayjs(this.currentDate) // Manipulated date's in loop manipulation

      // Create the empty values at the beginning of the month
      for (let i = 0; i < offsetValue; i++) {
        daysInWholeMonth.push({ date: '', inactive: true, isToday: false })
      }

      // Create the days of the month
      for (let i = 0; i < endOfMonth.date(); i++) {
        const dateSender = date.startOf('month').add(i, 'day')
        const getDate = dayjs(dateSender).format('YYYY-MM-DD')

        daysInWholeMonth.push({
          date: getDate,
          inactive: false,
          selected: false,
          textDecoration: false,
          isToday: this.presentDate === getDate,
          number: i + 1,
          month: dayjs(dateSender).format('MM'),
          year: dayjs(dateSender).format('YYYY')
        })
      }

      // Create the empty values at the end of the month
      for (let i = 1; i <= endOffsetValue; i++) {
        daysInWholeMonth.push({ date: '', inactive: true, isToday: false })
      }

      this.daysInMonth = daysInWholeMonth // Filling the days in month with daysInWholeMonth
      this.linedThroughDate() // Lining through the date
      this.checkDateHistory() // Checking the date history
    },

    checkSkippability() {
      this.prevDate =
        dayjs(this.minDate).format('YYYY-MM') < dayjs(this.currentDate).format('YYYY-MM')
      this.nextDate =
        dayjs(this.maxDate).format('YYYY-MM') > dayjs(this.currentDate).format('YYYY-MM')
    },
    //This is for the right button to go to the next month
    onClickToSkip(offset: number) {
      this.calendarDate = this.calendarDate.add(offset, 'month')
      this.currentDate = this.calendarDate.format('YYYY-MM-DD')
      //This is for creating the days in the next month with manipulated date
      this.totalDaysInMonth()
      this.checkSkippability()
    },

    //This is for getting the current month
    currentMonth() {
      return this.calendarDate.format('MMMM')
    },

    //This is for getting the current year
    currentYear() {
      return this.calendarDate.format('YYYY')
    },

    selectDate(date: date) {
      this.firstSelectedDate.selected = false //First selected date is false at beginning because we are changing it
      this.firstSelectedDate = date //First selected date is the date we clicked
      this.firstSelectedDate.selected = true //First selected date is true after we clicked
      this.saveDateHistory = this.firstSelectedDate.date //Saving the date history
      this.linedThroughDate() //Lining through the date
      this.checkDateHistory() //Checking the date history
      this.$emit('dateSelected', date) //Emitting the date selected to the parent component UIDateRangePicker
    },

    checkDateHistory() {
      //Checking the date history and setting the selected date
      for (let i = 0; i < this.daysInMonth.length; i++) {
        //If the date history is equal to the date in the month, set the selected date to true
        if (this.daysInMonth[i].date === this.saveDateHistory) {
          this.daysInMonth[i].selected = true
          this.firstSelectedDate = this.daysInMonth[i]
        }
      }
    },
    linedThroughDate() {
      if (this.isPastValidation) {
        if (this.backDayRange !== 99) {
          this.daysInMonth.forEach((day) => {
            if (
              day.date < dayjs(this.minDate).format('YYYY-MM-DD') &&
              day.month === dayjs(this.minDate).format('MM') &&
              day.year === dayjs(this.minDate).format('YYYY') &&
              day.number < dayjs(this.minDate).date()
            ) {
              day.textDecoration = true
            }

            if (
              day.date > dayjs(this.presentDate).format('YYYY-MM-DD') &&
              day.month === dayjs(this.maxDate).format('MM') &&
              day.year === dayjs(this.maxDate).format('YYYY')
            ) {
              day.textDecoration = true
            }
          })
        } else {
          this.daysInMonth.forEach((day) => {
            if (
              day.date < dayjs(this.presentDate).format('YYYY-MM-DD') &&
              day.month === dayjs(this.minDate).format('MM') &&
              day.year === dayjs(this.minDate).format('YYYY') &&
              day.number < dayjs(this.presentDate).date()
            ) {
              day.textDecoration = true
            }

            if (
              day.date > dayjs(this.presentDate).format('YYYY-MM-DD') &&
              day.month === dayjs(this.maxDate).format('MM') &&
              day.year === dayjs(this.maxDate).format('YYYY')
            ) {
              day.textDecoration = true
            }
          })
        }
      } else {
        this.daysInMonth.forEach((day) => {
          if (
            day.date > dayjs(this.maxDate).format('YYYY-MM-DD') &&
            day.month === dayjs(this.maxDate).format('MM') &&
            day.year === dayjs(this.maxDate).format('YYYY')
          ) {
            day.textDecoration = true
          }

          if (
            day.date < dayjs(this.minDate).format('YYYY-MM-DD') &&
            day.month === dayjs(this.minDate).format('MM') &&
            day.year === dayjs(this.minDate).format('YYYY')
          ) {
            day.textDecoration = true
          }
        })
      }
    }
  },
  computed: {
    //This is for the current date holder
    dateHolder() {
      return this.currentMonth() + ' ' + this.currentYear()
    }
  },
  watch: {
    isDatePickerEnable(newVal) {
      if (newVal) {
        this.calendarDate = dayjs(this.saveDateHistory)
        this.currentDate = this.calendarDate.format('YYYY-MM-DD')
        this.isSlider = false
        this.totalDaysInMonth()
        this.checkSkippability()
      }
    },
    newSelectedDays: {
      handler(newValue) {
        this.saveDateHistory = newValue.firstSelectedDate.date

        this.calendarDate = dayjs(this.saveDateHistory)
        this.currentDate = this.calendarDate.format('YYYY-MM-DD')

        this.totalDaysInMonth()
        this.checkDateHistory()
        this.linedThroughDate()
        this.checkSkippability()
      },
      deep: true
    }
  },
  created() {
    //When the component is created, we are checking the range, creating the days in month and checking the date history

    this.checkRange()
    this.totalDaysInMonth()
    this.checkDateHistory()
    this.linedThroughDate()
    this.checkSkippability()
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variables.scss';
@import '../../assets/css/_fonts.scss';

//This is the main container
.ui-date-picker-c {
  align-self: center;

  //This is the main calendar wrapper
  .ui-date-picker-wrapper {
    background: #ffffff;
    box-shadow: 2px 2px 6px #5c75991a;
    border: 1px solid #e6e6e6;
    border-radius: $border-radius-medium;
    opacity: 1;
    width: 270px;
    height: 240px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-top: 1.5rem;
    z-index: 1000;
    //This is the triangle for the calendar
    &::before {
      content: '';
      position: absolute; //Position relative to parent
      top: -10px;
      left: 15px;
      width: 0;
      height: 0;
      border-left: 10px solid transparent; //This is the left border of the triangle invisible
      border-right: 10px solid transparent; //This is the right border of the triangle invisible
      border-bottom: 10px solid #ffffff; //This is the bottom border of the triangle white which is visible
    }
    //This is the main calendar content
    .calendar {
      padding-top: 1.2rem;
      width: 100%;

      //This is the header section
      .header {
        position: relative;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;

        //This is the arrow icons for the calendar
        .nav-button {
          position: absolute;
          transform: translateY(-45%);
          top: 50%;
          background-color: transparent;
          border: none;
          font-size: 1rem;
          cursor: pointer;
          width: 30px;
          height: 30px;
          //This is the arrow icon
          img {
            width: 15px;
            height: 15px;
          }
        }

        //This is the left arrow icon
        .nav-button:first-child {
          left: 0;
        }
        //This is the right arrow icon
        .nav-button:last-child {
          right: 0;
        }

        //This is the current date
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
    //Styling of weekdays and days generally
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
      //Styling of depending on if it is today (coloring gray)
      .isToday {
        background: #e7e7e7;
        border-radius: 16px;
      }
    }
    //Styling of days generally
    .days li {
      padding: 10px 8px;
      font-weight: 500;
      line-height: 6px;
      cursor: pointer;
    }
    .days li.textDecoration {
      color: grey;
      text-decoration: line-through;
      pointer-events: none;
      cursor: not-allowed;
    }
    //If the dates that are selected are inactive they are invisible
    .days li.inactive {
      visibility: hidden;
      pointer-events: none;
      cursor: not-allowed;
    }
    //If the specific date is selected, it is colored with accent-primary-color which is light-blue
    .days li.selected {
      background-color: $accent-primary-color;
      border-radius: 4px;
      color: white;
    }
  }
}
</style>
