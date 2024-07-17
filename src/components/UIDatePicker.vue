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
            <button class="nav-button" @click="onClickToLeft" v-if="minDate < currentDate">
              <img src="../assets/icons/arrow-left.svg" alt="" />
            </button>
            <span class="current-date">{{ dateHolder }}</span>
            <button class="nav-button" @click="onClickToRight" v-if="currentDate < maxDate">
              <img src="../assets/icons/arrow-right.svg" alt="" />
            </button>
          </div>
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
                isToday: day.isToday,
                isİnitial: day.selected
              }"
              @click="selectDate(day)"
            >
              {{ day.number }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
//Imports the needed components and interfaces
import dayjs from 'dayjs'
import date from '../interface/IUIDatePicker'
export default {
  name: 'UIDatePicker',
  components: {},
  data() {
    return {
      weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'], //Static weekdays
      calendarDate: dayjs(this.initialDate), //Creating the calendar date
      daysInMonth: [] as date[], //Creating the days in month as date interface object
      firstSelectedDate: {}, //Getting first selected date as type of date interface object
      currentDate: dayjs().format('YYYY-MM-DD'), //Manipulated date
      presentDate: dayjs().format('YYYY-MM-DD'), //Present date that won't change
      minDate: dayjs(), //Minimum date range we select (Will manipulated later in code)
      maxDate: dayjs(), // Maximum date range we select (Will manipulated later in code)
      saveDateHistory: this.saveDate //Saving the date history so we can see when we close calendar
    }
  },
  props: {
    yearRange: { type: Number, default: 99 }, //This is for validating the year range by giving it 9999 as default value since this is one of the maximum value
    saveDate: { type: String, default: '' }, //This is for saving the date history
    monthRange: { type: Number, default: 99 }, //This is for validating the month range by giving it 9999 as default value since this is one of the maximum value
    isPastValidation: { type: Boolean, default: false },
    isFutureValidation: { type: Boolean, default: false },
    initialDate: { type: String, default: dayjs().format('YYYY-MM-DD') }
  },
  methods: {
    checkRange() {
      /*

            Check the range of the year and month, if year is not 9999, update year range, if month is not 9999, update month range.
            This is intended request.

          */

      if (this.isPastValidation) {
        if (this.yearRange !== 99) {
          let day = this.yearRange * 365
          this.minDate = dayjs().subtract(day, 'day').format('YYYY-MM-DD')
          this.maxDate = dayjs().format('YYYY-MM-DD')
        }

        if (this.monthRange !== 99) {
          let day = this.monthRange * Number(this.calendarDate.endOf('month').$D)
          this.minDate = dayjs().subtract(day, 'day').format('YYYY-MM-DD')
          this.maxDate = dayjs().format('YYYY-MM-DD')
        }
      } else if (this.isFutureValidation) {
        if (this.yearRange !== 99) {
          let day = this.yearRange * 365
          this.maxDate = dayjs().add(day, 'day').format('YYYY-MM-DD')
          this.minDate = dayjs().format('YYYY-MM-DD')
        }
        if (this.monthRange !== 99) {
          let day = this.monthRange * Number(this.calendarDate.endOf('month').$D)
          this.maxDate = dayjs().add(day, 'day').format('YYYY-MM-DD')
          this.minDate = dayjs().format('YYYY-MM-DD')
        }
      } else {
        if (this.yearRange !== 99) {
          let day = this.yearRange * 365
          this.minDate = dayjs().subtract(day, 'day').format('YYYY-MM-DD')
          this.maxDate = dayjs().add(day, 'day').format('YYYY-MM-DD')
        } else if (this.monthRange !== 99) {
          let day = this.monthRange * Number(this.calendarDate.endOf('month').$D)
          this.minDate = dayjs().subtract(day, 'day').format('YYYY-MM-DD')
          this.maxDate = dayjs().add(day, 'day').format('YYYY-MM-DD')
        } else {
          let day = this.yearRange * 365
          this.minDate = dayjs().subtract(day, 'day').format('YYYY-MM-DD')
          this.maxDate = dayjs().add(day, 'day').format('YYYY-MM-DD')
        }
      }
    },
    //This is where we create the calendar for a month
    totalDaysInMonth() {
      const daysInWholeMonth = [] //Empty days array to fill with days
      const startOfMonth = this.calendarDate.startOf('month') //Start of the month
      const endOfMonth = this.calendarDate.endOf('month') //End of the month

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

      let today = dayjs().format('D') //Today's date but with manipulated format in loops
      const date = dayjs(this.currentDate) //Manipulated date's in loop manipulation

      // Create the empty values at the beginning of the month
      for (let i = 0; i < offsetValue; i++) {
        daysInWholeMonth.push({ date: '', inactive: true, isToday: false })
      }

      // Create the days of the month
      for (let i = 0; i < endOfMonth.date(); i++) {
        const dateSender = date.startOf('month').add(i, 'day')

        daysInWholeMonth.push({
          date: dayjs(dateSender).format('DD-MM-YYYY'),
          inactive: false,
          selected: false,
          textDecoration: false,
          isToday:
            Number(today) === i + 1 &&
            this.currentMonth() === dayjs().format('MMMM') &&
            this.currentYear() === dayjs().format('YYYY'),
          number: String(i + 1),
          month: dayjs(dateSender).format('MM'),
          year: dayjs(dateSender).format('YYYY')
        })
      }
      // Create the empty values at the end of the month
      for (let i = 1; i <= endOffsetValue; i++) {
        daysInWholeMonth.push({ date: '', inactive: true, isToday: false })
      }

      this.daysInMonth = daysInWholeMonth //Filling the days in month with daysInWholeMonth
      this.linedThroughDate() //Lining through the date
      this.checkDateHistory() //Checking the date history
    },

    //This is for the right button to go to the next month
    onClickToRight() {
      this.calendarDate = this.calendarDate.add(1, 'month')
      this.currentDate = this.calendarDate.format('YYYY-MM-DD')
      //This is for creating the days in the next month with manipulated date
      this.totalDaysInMonth()
    },

    //This is for the left button to go to the next month
    onClickToLeft() {
      this.calendarDate = this.calendarDate.subtract(1, 'month')
      this.currentDate = this.calendarDate.format('YYYY-MM-DD')
      //This is for creating the days in the previous month with manipulated date
      this.totalDaysInMonth()
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
        for (let i = 0; i < this.daysInMonth.length; i++) {
          if (
            this.daysInMonth[i].date > dayjs(this.presentDate).format('DD-MM-YYYY') &&
            this.daysInMonth[i].month === dayjs(this.presentDate).format('MM') &&
            this.daysInMonth[i].year === dayjs(this.presentDate).format('YYYY')
          ) {
            this.daysInMonth[i].textDecoration = true
          }
        }
      } else if (this.isFutureValidation) {
        for (let i = 0; i < this.daysInMonth.length; i++) {
          if (
            this.daysInMonth[i].date < dayjs(this.presentDate).format('DD-MM-YYYY') &&
            this.daysInMonth[i].month === dayjs(this.presentDate).format('MM') &&
            this.daysInMonth[i].year === dayjs(this.presentDate).format('YYYY')
          ) {
            this.daysInMonth[i].textDecoration = true
          }
        }
      }
    }
  },
  computed: {
    //This is for the current date holder
    dateHolder() {
      return this.currentMonth() + ' ' + this.currentYear()
    }
  },
  created() {
    //When the component is created, we are checking the range, creating the days in month and checking the date history
    this.checkRange()
    this.totalDaysInMonth()
    this.checkDateHistory()
    this.linedThroughDate()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/variables.scss';
@import '../assets/css/_fonts.scss';

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
    //This is the triangle for the calendar
    &::before {
      content: '';
      position: absolute; //Position relative to parent
      top: -10px; //10px above the calendar
      left: 15px; //15px from the left of the calendar
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
        justify-content: space-between;
        align-items: center;
        width: 100%;

        //This is the arrow icons for the calendar
        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-45%);
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
          flex-grow: 1;
          text-align: center;
          font-size: 0.9rem;
          font-weight: 500;
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
      font-size: 10px;
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
      .initialDate {
        background: #e7e7e7;
        border-radius: 16px;
      }
    }
    //Styling of days generally
    .days li {
      padding: 10px 8px;
      font-weight: 500;
      line-height: 5px;
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
