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
            <button
              id="prev"
              class="nav-button"
              @click="onClickToLeft"
              v-show="prevMonthDate > minDate">
              <img src="../assets/icons/arrow-left.svg" alt="" />
            </button>
            <span class="current-date">{{
              daysInMonth[15]?.fullDateFormatted.split('-')[1] +
              ' ' +
              daysInMonth[15]?.fullDateFormatted.split('-')[0]
            }}</span>
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
                firstInitialDate: day.firstInitialDate,
                secondInitialDate: day.secondInitialDate
              }"
              @click="selectDate(day)">
              {{ day.number }}
            </li>
          </ul>
        </div>

        <div class="calendar">
          <!-- This is the header section where we have button and dates-->
          <div class="header">
            <span class="current-date">{{
              nextMonthDays[15]?.fullDateFormatted.split('-')[1] +
              ' ' +
              nextMonthDays[15]?.fullDateFormatted.split('-')[0]
            }}</span>
            <button
              id="next"
              class="nav-button"
              @click="onClickToRight"
              v-show="nextMonthDate < maxDate">
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
    </div>
  </div>
</template>

<script lang="ts">
//Imports the needed components and interfaces
import dayjs from 'dayjs'
import date from '../interface/IUIDatePicker'

export default {
  name: 'UIMultiDatePicker',
  components: {},
  data() {
    return {
      weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'], //Static weekdays
      calendarDate: dayjs(this.initialDate), //Creating the calendar date
      daysInMonth: [] as date[], //Creating the days in month as date interface object
      nextMonthDays: [] as date[], //Creating the next month's days
      firstSelectedDate: {}, //Getting first selected date as type of date interface object
      secondSelectedDate: {},
      currentDate: dayjs(this.initialDate).format('YYYY-MM-DD'), //Manipulated date for left calendar
      nextMonthDate: dayjs(this.initialDate).add(1, 'month').format('YYYY-MM-DD'), //Manipulated date for right calendar
      prevMonthDate: dayjs(this.initialDate).subtract(1, 'month').format('YYYY-MM-DD'),
      presentDate: dayjs().format('YYYY-MM-DD'), //Present date that won't change
      minDate: dayjs(), //Minimum date range we select (Will manipulated later in code)
      maxDate: dayjs(), // Maximum date range we select (Will manipulated later in code)
      saveFirstDateHistory: '', //Saving the date history so we can see when we close calendar
      saveSecondDateHistory: '' //Saving the date history so we can see when we close calendar
    }
  },
  props: {
    backYearRange: { type: Number, default: 99 }, //This is for validating the year range by giving it 9999 as default value since this is one of the maximum value
    forwardYearRange: { type: Number, default: 99 },
    backMonthRange: { type: Number, default: 99 }, //This is for validating the month range by giving it 9999 as default value since this is one of the maximum value
    forwardMonthRange: { type: Number, default: 99 },
    isPastValidation: { type: Boolean, default: false },
    isFutureValidation: { type: Boolean, default: false },
    initialDate: { type: String, default: dayjs().format('YYYY-MM-DD') },
    baseInitialDates: { type: Object },
    isDatePickerEnable: { type: Boolean }
  },
  methods: {
    checkRange() {
      /*

            Check the range of the year and month, if year is not 9999, update year range, if month is not 9999, update month range.
            This is intended request.

          */

      if (this.isPastValidation) {
        if (this.backYearRange !== 99) {
          let day = this.backYearRange * 365
          this.minDate = dayjs().subtract(day, 'day').format('YYYY-MM-DD')
          this.maxDate = dayjs().format('YYYY-MM-DD')
        }

        if (this.backMonthRange !== 99) {
          this.minDate = dayjs()
            .subtract(this.backMonthRange, 'month')
            .endOf('month')
            .format('YYYY-MM-DD')
          this.maxDate = dayjs().add(1, 'month').format('YYYY-MM-DD')
        }
      } else if (this.isFutureValidation) {
        if (this.forwardYearRange !== 99) {
          let day = this.forwardYearRange * 365
          this.maxDate = dayjs().add(day, 'day').format('YYYY-MM-DD')
          this.minDate = dayjs().format('YYYY-MM-DD')
        }
        if (this.forwardMonthRange !== 99) {
          this.maxDate = dayjs()
            .add(this.forwardMonthRange, 'month')
            .startOf('month')
            .format('YYYY-MM-DD')
          this.minDate = dayjs().subtract(1, 'month').format('YYYY-MM-DD')
        }
      } else {
        if (this.backYearRange !== 99) {
          let day = this.backYearRange * 365
          this.minDate = dayjs(this.initialDate).subtract(day, 'day').format('YYYY-MM-DD')
          if (this.forwardMonthRange !== 99) {
            this.maxDate = dayjs(this.initialDate)
              .add(this.forwardMonthRange, 'month')
              .format('YYYY-MM-DD')
          }
          if (this.forwardMonthRange !== 99) {
            this.maxDate = dayjs(this.initialDate)
              .add(this.forwardMonthRange, 'year')
              .format('YYYY-MM-DD')
          }
        } else if (this.backMonthRange !== 99) {
          this.minDate = dayjs(this.initialDate)
            .subtract(this.backMonthRange + 1, 'month')
            .endOf('month')
            .format('YYYY-MM-DD')

          if (this.forwardMonthRange !== 99) {
            this.maxDate = dayjs(this.initialDate)
              .add(this.forwardMonthRange, 'month')
              .format('YYYY-MM-DD')
          }
          if (this.forwardYearRange !== 99) {
            this.maxDate = dayjs(this.initialDate)
              .add(this.forwardYearRange, 'year')
              .format('YYYY-MM-DD')
          }
        } else {
          let day = this.forwardYearRange * 365
          this.minDate = dayjs(this.initialDate).subtract(day, 'day').format('YYYY-MM-DD')
          this.maxDate = dayjs(this.initialDate).add(day, 'day').format('YYYY-MM-DD')
        }
      }
    },
    populdateMonthDays() {
      if (this.isPastValidation) {
        if (dayjs(this.calendarDate).format('MM') == dayjs(this.minDate).format('MM')) {
          this.daysInMonth = this.totalDaysInMonth(0)
          this.nextMonthDays = this.totalDaysInMonth(1)
          return
        }
        this.daysInMonth = this.totalDaysInMonth(-1)
        this.nextMonthDays = this.totalDaysInMonth(0)
        return
      }
      if (dayjs(this.calendarDate).format('MM') == dayjs(this.maxDate).format('MM')) {
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
        const test = dayjs(dateSender).format('YYYY-MMMM-DD')

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
          fullDateFormatted: test
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

    //This is for the right button to go to the next month
    onClickToRight() {
      this.nextMonthDate = this.calendarDate.add(2, 'month').format('YYYY-MM-DD')
      this.prevMonthDate = this.calendarDate.format('YYYY-MM-DD')
      this.calendarDate = this.calendarDate.add(1, 'month')
      this.currentDate = this.calendarDate.format('YYYY-MM-DD')
      //This is for creating the days in the next month with manipulated date
      this.populdateMonthDays()

      this.checkDateHistory()
      this.updateBetweenDates()
      this.linedThroughDate()
    },

    //This is for the left button to go to the next month
    onClickToLeft() {
      this.nextMonthDate = this.calendarDate.format('YYYY-MM-DD')
      this.prevMonthDate = this.calendarDate.subtract(2, 'month').format('YYYY-MM-DD')

      this.calendarDate = this.calendarDate.subtract(1, 'month')
      this.currentDate = this.calendarDate.format('YYYY-MM-DD')
      //This is for creating the days in the previous month with manipulated date
      this.populdateMonthDays()

      this.checkDateHistory()
      this.updateBetweenDates()
      this.linedThroughDate()
    },
    selectDate(selectedDay: date) {
      if (this.baseInitialDates.firstInitialDate) {
        this.emitResetInitialDates() // turuncu baslangic degerlerini ilk tiklamada emit edip false olmasini saglar
      }

      if (!this.firstSelectedDate.date) {
        // First boşsa gir
        this.firstSelectedDate = selectedDay
        this.firstSelectedDate.selected = true
        this.saveFirstDateHistory = this.firstSelectedDate.date
      } else {
        if (selectedDay.date < this.firstSelectedDate.date) {
          // Seçilen gün first'ten küçükse gir
          if (!this.secondSelectedDate.date) {
            // First varsa, second yoksa gir (seçileni first, önceki first'ü second yapar)
            this.secondSelectedDate = this.firstSelectedDate
            this.firstSelectedDate = selectedDay
            this.firstSelectedDate.selected = true
            this.secondSelectedDate.selected = true
            this.saveFirstDateHistory = this.firstSelectedDate.date
            this.saveSecondDateHistory = this.secondSelectedDate.date
          } else {
            // First ve second varsa gir (tarihi sola doğru genişletir)
            this.firstSelectedDate.selected = false
            this.firstSelectedDate = selectedDay
            this.firstSelectedDate.selected = true
            this.saveFirstDateHistory = this.firstSelectedDate.date
          }
        } else if (selectedDay.date == this.firstSelectedDate.date) {
          if (this.isPastValidation) {
            this.firstSelectedDate.selected = false
            this.firstSelectedDate = this.secondSelectedDate
            this.saveFirstDateHistory = this.firstSelectedDate.date
            this.secondSelectedDate = { date: '' }
            this.saveSecondDateHistory = ''
          } else {
            // Seçilen gün first'e eşitse gir (seçilenleri kaldırır)
            this.firstSelectedDate.selected = false
            this.secondSelectedDate.selected = false
            this.firstSelectedDate = { date: '' }
            this.secondSelectedDate = { date: '' }
            this.saveFirstDateHistory = ''
            this.saveSecondDateHistory = ''
          }
        } else if (selectedDay.date > this.firstSelectedDate.date) {
          // seçilen gün first'ten büyükse gir (tarihi sağa doğru daraltır veya genişletir)
          this.secondSelectedDate.selected = false
          this.secondSelectedDate = selectedDay
          this.secondSelectedDate.selected = true
          this.saveSecondDateHistory = this.secondSelectedDate.date
        }
      }
      this.emitDate('dateFirstSelected', this.firstSelectedDate)
      this.emitDate('dateSecondSelected', this.secondSelectedDate)
      this.deactivateAllBetween()
      this.updateBetweenDates()
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

      const startDateMonthIndex = dayjs(startDate.date).month()
      const endDateMonthIndex = dayjs(endDate.date).month()

      const leftCalendarMonthIndex = dayjs(this.daysInMonth[15].date).month()
      const rightCalendarMonthIndex = dayjs(this.nextMonthDays[15].date).month()

      if (startDate.date && endDate.date) {
        // seçilen iki tarih farklı aylardaysa
        if (startDate.month !== endDate.month) {
          // soldaki takvim için
          this.daysInMonth.forEach((day) => {
            if (
              // firstSelectedDate, soldaki takvimde ise o takvimdeki sağdaki günlerin between'ini true yap
              startDateMonthIndex == leftCalendarMonthIndex &&
              day.number > startDate.number &&
              day.number != 0
            ) {
              day.active = true
              day.between = true
            } else if (
              // secondSelectedDate, soldaki takvimde ise o takvimdeki soldaki günlerin between'ini true yap
              endDateMonthIndex == leftCalendarMonthIndex &&
              day.number < endDate.number &&
              day.number != 0
            ) {
              day.active = true
              day.between = true
            } else if (
              // iki tarihin ayı soldaki takvime ait değil ise soldaki takvimin tamamının between'ini true yap
              startDateMonthIndex < leftCalendarMonthIndex &&
              leftCalendarMonthIndex < endDateMonthIndex &&
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
              startDateMonthIndex == rightCalendarMonthIndex &&
              day.number > startDate.number &&
              day.number != 0
            ) {
              day.active = true
              day.between = true
            } else if (
              // secondSelectedDate, sağdaki takvimde ise o takvimdeki soldaki günlerin between'ini true yap
              endDateMonthIndex == rightCalendarMonthIndex &&
              day.number < endDate.number &&
              day.number != 0
            ) {
              day.active = true
              day.between = true
            } else if (
              // iki tarihin ayı sağdaki takvime ait değil ise sağdaki takvimin tamamının between'ini true yap
              startDateMonthIndex < rightCalendarMonthIndex &&
              rightCalendarMonthIndex < endDateMonthIndex &&
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
          if (
            startDateMonthIndex == leftCalendarMonthIndex &&
            endDateMonthIndex == leftCalendarMonthIndex
          ) {
            this.daysInMonth.forEach((day) => {
              if (day.number > startDate.number && day.number < endDate.number && day.number != 0) {
                day.active = true
                day.between = true
              }
            })
          } else if (
            // seçilen iki tarih de sağdaki takvimde ise tarihler arasındaki day'lerin between'ini tru yap
            startDateMonthIndex == rightCalendarMonthIndex &&
            endDateMonthIndex == rightCalendarMonthIndex
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
        for (let i = 0; i < this.nextMonthDays.length; i++) {
          if (
            // monthRange ay önceki tarihin solundaki günler çizilir
            this.nextMonthDays[i].date < dayjs(this.initialDate).format('YYYY-MM-DD') &&
            this.nextMonthDays[i].month === dayjs(this.minDate).format('MM') &&
            this.nextMonthDays[i].year === dayjs(this.minDate).format('YYYY') &&
            this.nextMonthDays[i].number < dayjs(this.initialDate).date()
          ) {
            this.nextMonthDays[i].textDecoration = true
          }

          if (
            // bulunulan tarihin sağındaki günler çizilir
            this.nextMonthDays[i].date > dayjs(this.initialDate).format('YYYY-MM-DD') &&
            this.nextMonthDays[i].month === dayjs(this.maxDate).subtract(1, 'month').format('MM') && // üstte maxDate'i 1 arttırmıştım (line 151)
            this.nextMonthDays[i].year === dayjs(this.maxDate).subtract(1, 'month').format('YYYY')
          ) {
            this.nextMonthDays[i].textDecoration = true
          }
        }
        for (let i = 0; i < this.daysInMonth.length; i++) {
          if (
            this.daysInMonth[i].date < dayjs(this.initialDate).format('YYYY-MM-DD') &&
            this.daysInMonth[i].month === dayjs(this.minDate).format('MM') &&
            this.daysInMonth[i].year === dayjs(this.minDate).format('YYYY') &&
            this.daysInMonth[i].number < dayjs(this.initialDate).date()
          ) {
            this.daysInMonth[i].textDecoration = true
          }
        }
      } else {
        for (let i = 0; i < this.daysInMonth.length; i++) {
          if (
            // bulunulan tarihin solundaki günler çizilir
            this.daysInMonth[i].date < dayjs(this.initialDate).format('YYYY-MM-DD') &&
            this.daysInMonth[i].month === dayjs(this.minDate).add(1, 'month').format('MM') &&
            this.daysInMonth[i].year === dayjs(this.minDate).add(1, 'month').format('YYYY') &&
            this.daysInMonth[i].number < dayjs(this.initialDate).date()
          ) {
            this.daysInMonth[i].textDecoration = true
          }

          if (
            // monthRange ay sonraki tarihin sağındaki günler çizilir
            this.daysInMonth[i].date > dayjs(this.initialDate).format('YYYY-MM-DD') &&
            this.daysInMonth[i].month === dayjs(this.maxDate).format('MM') &&
            this.daysInMonth[i].year === dayjs(this.maxDate).format('YYYY') &&
            this.daysInMonth[i].number > dayjs(this.initialDate).date()
          ) {
            this.daysInMonth[i].textDecoration = true
          }
        }
        for (let i = 0; i < this.nextMonthDays.length; i++) {
          if (
            // bulunulan tarihin sağındaki günler çizilir
            this.nextMonthDays[i].date > dayjs(this.initialDate).format('YYYY-MM-DD') &&
            this.nextMonthDays[i].month === dayjs(this.maxDate).format('MM') &&
            this.nextMonthDays[i].year === dayjs(this.maxDate).format('YYYY') &&
            this.nextMonthDays[i].number > dayjs(this.initialDate).date()
          ) {
            this.nextMonthDays[i].textDecoration = true
          }
        }
      }
    }
  },
  watch: {
    isDatePickerEnable(newVal) {
      if (newVal) {
        if (!this.saveFirstDateHistory) {
          this.calendarDate = dayjs(this.initialDate)
        } else {
          this.calendarDate = dayjs(this.saveFirstDateHistory)
        }

        this.currentDate = this.calendarDate.format('YYYY-MM-DD')
        this.nextMonthDate = this.calendarDate.add(1, 'month').format('YYYY-MM-DD')
        this.prevMonthDate = this.calendarDate.subtract(1, 'month').format('YYYY-MM-DD')
        this.populdateMonthDays()
        this.checkDateHistory()
        this.updateBetweenDates()
        this.linedThroughDate() // Her iki takvim için geçerli
      }
    },
    saveFirstDateHistory(newVal) {
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
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/variables.scss';
@import '../assets/css/_fonts.scss';

// This is the main container
.ui-date-picker-c {
  align-self: center;

  // This is the main calendar wrapper
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

    > div {
      display: flex;
      align-items: center;
      border-radius: 50px;
      width: 600px;
      height: 250px;
      flex-direction: row;
    }
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
      width: 300px;
      height: 220px;
      background: #ffffff;
      margin: 0 10px;
      border-radius: 30px;

      // This is the header section
      .header {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        // This is the arrow icons for the calendar
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

          // This is the arrow icon
          img {
            width: 15px;
            height: 15px;
          }
        }

        // This is the left arrow icon
        .nav-button:first-child {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
        }

        // This is the right arrow icon
        .nav-button:last-child {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
        }

        // This is the current date
        .current-date {
          flex-grow: 1;
          text-align: center;
          font-size: 0.9rem;
          font-weight: 500;
        }
      }
    }

    // Styling of weekdays and days generally
    .weekdays,
    .days {
      list-style: none;
      padding: 0;
      margin: 0;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
      font-size: 14px;
    }

    .weekdays {
      padding-top: 20px;
      font-weight: 700;
      color: #363636;
      opacity: 0.7;
    }

    .days {
      padding-top: 6px;
      // Styling depending on if it is today (coloring gray)
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

    // Styling of days generally
    .days li {
      padding: 10px 10px;
      font-weight: 500;
      line-height: 7px;
      cursor: pointer;
    }
    .days li.textDecoration {
      color: grey;
      text-decoration: line-through;
      pointer-events: none;
      cursor: not-allowed;
    }
    // If the dates that are selected are inactive, they are invisible
    .days li.inactive {
      visibility: hidden;
      pointer-events: none;
      cursor: not-allowed;
    }
    // If the specific date is selected, it is colored with accent-primary-color which is light-blue
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
