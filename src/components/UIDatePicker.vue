<template>
    <div class="ui-date-picker-c">
       
        <div class="ui-date-picker-wrapper">
            <div>
                <div class="calendar">
                    <div class="header">
                        <button class="nav-button" @click="onClickToLeft" v-if="presentDate < currentDate">&lt;</button>
                        <button class="nav-button-invisible" v-else>&lt;</button>
                        <span class="current-date">{{ dateHolder }}</span>
                        <button class="nav-button" @click="onClickToRight">&gt;</button>
                    </div>
                    <ul class="weekdays">
                        <template v-for="(weekday, index) in weekdays" :key="index">
                            <li> {{ weekday }}</li>
                        </template>
                    </ul>
                    <ul class="days">
                        <li
                            v-for="(day, index) in daysInMonth" :key="index"
                            
                            :class="{
                                inactive: day.inactive,
                                active: day.active,
                                selected: day.isSelected,
                                textDecoration: day.textDecoration,
                                blink: Boolean,
                                between: Boolean,
                                isToday: day.isToday
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
import dayjs from 'dayjs'

interface date {

        number: string,
        inactive: Boolean,
        active: Boolean,
        selected: Boolean,
        textDecoration: Boolean,
        blink: Boolean,
        between: Boolean,
        isToday:  Boolean,
        month: string,
        year: Number,
        day: string,
        
}

export default {
    name: "UIDatePicker",
    data() {
        return {
            weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            calendarDate: dayjs(),
            daysInMonth: [] as date[],
            TodaysDate: null,
            firstSelectedDate: null,
            currentDate: dayjs(),
            presentDate: dayjs().format('YYYY-MM-DD'),
               
        };
    },
    methods: {

        totalDaysInMonth() {
            
            this.daysInMonth = [];
            const startOfMonth = this.calendarDate.startOf('month');
            const endOfMonth = this.calendarDate.endOf('month');
            const offsetValue = (startOfMonth.day() + 6) % 7;
            const endOffsetValue = (7 - (offsetValue + endOfMonth.date()) % 7) % 7;
            let today = dayjs().format('D');
            
            // To create the empty values on the beginning of the month

            for (let i = 0; i < offsetValue; i++) {
                this.daysInMonth.push({ date: null, inactive: true, isToday: false });
            
            }

            // To create the days of the month

            for (let i = 0; i < endOfMonth.date(); i++) {
                const date = dayjs().startOf('month').add(i,'day').format('YYYY-MM-DD');
                const isDateBeforeToday = date < this.presentDate && this.currentMonth() === dayjs().format('MMMM') && this.currentYear() === dayjs().format('YYYY');
                
                console.log(date + " " + this.presentDate + " " +isDateBeforeToday)
            
                

                this.daysInMonth.push({ 
                    date: date, 
                    inactive: false, 
                    isSelected: false, 
                    textDecoration: isDateBeforeToday, 
                    isToday: Number(today) === i + 1 && this.currentMonth() === dayjs().format('MMMM') && this.currentYear() === dayjs().format('YYYY'),
                    number: i+1, 
                });
            }

            // To create the empty values on the end of the month


            for (let i = 1; i <= endOffsetValue; i++) {
                this.daysInMonth.push({ date: null, inactive: true, isToday: false });
            }

        },

        onClickToRight() {
           
            this.calendarDate = this.calendarDate.add(1, 'month');
            this.currentDate = this.calendarDate.format('YYYY-MM-DD');
            this.totalDaysInMonth();

        },
        onClickToLeft() {

            console.log(this.daysInMonth)

            this.calendarDate = this.calendarDate.subtract(1, 'month');           
            this.currentDate = this.calendarDate.format('YYYY-MM-DD'); 


            this.totalDaysInMonth(); 
        },

        currentMonth() {
            return this.calendarDate.format('MMMM');
        },
        currentYear() {
            return this.calendarDate.format('YYYY');
        },
        selectDate(date) {
            if(this.firstSelectedDate == null){
                this.firstSelectedDate = date;
                this.firstSelectedDate.isSelected = true;
            } else {
                this.firstSelectedDate.isSelected = false;
                this.firstSelectedDate = date;
                this.firstSelectedDate.isSelected = true;
            }
            console.log(this.daysInMonth)
            
        },
       
    },
    computed: {
        dateHolder() {
            return this.currentMonth() + " " + this.currentYear();
        }
    },
    created() {
        this.totalDaysInMonth();
    }
};
</script>

<style lang="scss" scoped>
@import '../assets/css/variables.scss';

.ui-date-picker-c {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

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
    .calendar {
      padding-top: 1rem;
      width: 100%;
      justify-content: space-around;

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .nav-button {
          background-color: transparent;
          border: none;
          font-size: 1.2rem;
          font-family: 'Arial';
          cursor: pointer;
        }
        .nav-button-invisible {
          background-color: transparent;
          border: none;
          font-size: 1.2rem;
          font-family: 'Arial';
          opacity: 0;
          pointer-events: none;
        }
        .current-date {
          font-size: 0.9rem;
          font-weight: 500;
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

      .isToday {
        background: #e7e7e7;
        border-radius: 16px;
      }
    }
    .days li {
      padding: 10px 8px;
      line-height: 5px;
      cursor: pointer;
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
  }
}
</style>
