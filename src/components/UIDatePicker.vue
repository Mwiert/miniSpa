<template>
    <div class="ui-date-picker-c">
        <div class="ui-date-picker-wrapper">
            <div>
                <div class="calendar">
                    <div class="header">
                        <button class="nav-button" @click="onClickToLeft" v-show="minimumDate < currentDate">
                            
                        <img src="../assets/icons/arrow-left.svg" alt=""></button>
                    
                        <span class="current-date">{{ dateHolder }}</span>
                        <button class="nav-button" @click="onClickToRight" v-show="currentDate < maximumDate">
                            
                            <img src="../assets/icons/arrow-right.svg" alt="">

                        </button>
                       
                        
                    </div>
                    <ul class="weekdays">
                        <template v-for="(weekday, index) in weekdays" :key="index">
                            <li>{{ weekday }}</li>
                        </template>
                    </ul>
                    <ul class="days">
                        <li
                            v-for="(day, index) in daysInMonth" :key="index"
                            :class="{

                                inactive: day.inactive,
                                active: day.active,
                                selected: day.selected,
                                textDecoration: day.textDecoration,
                                blink: day.blink,
                                between: day.between,
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
import dayjs from 'dayjs';
import date from '../interface/IUIDatePicker';

export default {
    name: "UIDatePicker",
    data() {
        return {
            weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            calendarDate: dayjs(this.initialDate),
            daysInMonth: [] as date[],
            TodaysDate: null as date | null,
            firstSelectedDate: null as date | null,
            secondSelectedDate: null as date | null,
            currentDate: this.initialDate,
            presentDate: dayjs().format('YYYY-MM-DD'),
            minimumDate: dayjs().subtract(this.yearRange, 'year').format('YYYY-MM-DD'),
            maximumDate: dayjs().add(this.yearRange, 'year').format('YYYY-MM-DD'),
        };
    },
    props: {
        yearRange: {type: Number, default: 1},
        initialDate: {type: String, default: dayjs().format('YYYY-MM-DD')},
    },

    methods: {
    
        totalDaysInMonth() {
            let daysInWholeMonth = [];
            const startOfMonth = this.calendarDate.startOf('month');
            const endOfMonth = this.calendarDate.endOf('month');
            const offsetValue = (startOfMonth.day() + 6) % 7;
            const endOffsetValue = (7 - (offsetValue + endOfMonth.date()) % 7) % 7;
            let today = dayjs().format('D');
            const date = dayjs(this.currentDate)
            // Create the empty values at the beginning of the month
            for (let i = 0; i < offsetValue; i++) {
                daysInWholeMonth.push({ date: "", inactive: true, isToday: false });
            }

            // Create the days of the month
            for (let i = 0; i < endOfMonth.date(); i++) {
                const dateSender = date.startOf('month').add(i, 'day');
            

                daysInWholeMonth.push({ 
                    date: dayjs(dateSender).format('DD-MM-YYYY'), 
                    inactive: false, 
                    selected: false, 
                    textDecoration: false, 
                    isToday: Number(today) === i + 1 && this.currentMonth() === dayjs().format('MMMM') && this.currentYear() === dayjs().format('YYYY'),
                    number: String(i + 1) 
                });
            }
            

            // Create the empty values at the end of the month
            for (let i = 1; i <= endOffsetValue; i++) {
                daysInWholeMonth.push({ date: "", inactive: true, isToday: false });
            }

            if(this.firstSelectedDate !== null) {

                for (let i = 0; i < daysInWholeMonth.length; i++) {
                    if (daysInWholeMonth[i].date === this.firstSelectedDate.date) {
                        daysInWholeMonth[i].selected = true;
                    }
                }
            }

            this.daysInMonth = daysInWholeMonth;

        },
        onClickToRight() {
            this.calendarDate = this.calendarDate.add(1, 'month');
            this.currentDate = this.calendarDate.format('YYYY-MM-DD');
            this.totalDaysInMonth();
        },
        onClickToLeft() {
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
        selectDate(date: date) {
            // if(this.firstSelectedDate === null && this.secondSelectedDate === null){
            //     this.firstSelectedDate = date;
            //     this.firstSelectedDate.selected = true;
            //     console.log("ilk seçilen: " +this.firstSelectedDate.date + "ikinci seçilen: " + this.secondSelectedDate.date)
            // }
            // else if(this.firstSelectedDate !== null && this.secondSelectedDate === null){

            //     if (this.firstSelectedDate.date < date.date) {
            //         this.secondSelectedDate = date;
            //         this.secondSelectedDate.selected = true;
            //     } else {
            //         this.secondSelectedDate = this.firstSelectedDate;
            //         this.firstSelectedDate = date;
            //         this.secondSelectedDate.selected = true;
            //     }
            //     console.log("ilk seçilen: " +this.firstSelectedDate + "ikinci seçilen: " + this.secondSelectedDate)

            // }
            // else if (this.firstSelectedDate !== null && this.secondSelectedDate !== null){
            //     if(date > this.secondSelectedDate){
            //         this.firstSelectedDate = this.secondSelectedDate;
            //         this.secondSelectedDate = date;
            //         this.firstSelectedDate.selected = false;
            //         this.secondSelectedDate.selected = true;
            //     } else {
            //         this.firstSelectedDate = date;
            //         this.firstSelectedDate.selected = true;
            //         this.secondSelectedDate.selected = false;
            //     }
            //     console.log("ilk seçilen: " +this.firstSelectedDate + "ikinci seçilen: " + this.secondSelectedDate)

            // }
            
             if (this.firstSelectedDate === null) {
                console.log(date)
                 this.firstSelectedDate = date;
                this.firstSelectedDate.selected = true;
            } else {
                this.firstSelectedDate.selected = false;
                this.firstSelectedDate = date;
                console.log(date)
                this.firstSelectedDate.selected = true;
            }
            if (this.secondSelectedDate === null) {
                console.log(date)
                this.secondSelectedDate = date;
                this.secondSelectedDate.selected = true;
            } else {
                this.secondSelectedDate.selected = false;
                this.secondSelectedDate = date;
                console.log(date)
                this.secondSelectedDate.selected = true;
            }

            this.$emit('dateSelected', date.date);
            
         }
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
@import '../assets/css/_fonts.scss';

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
            padding-top: 1.2rem;
            width: 100%;
            justify-content: space-around;

            .header {
                position: relative;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;

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
                    img{
                        width: 15px;
                        height: 15px;
                    }
                }
                .nav-button:first-child{
                    left:0;
                }
                .nav-button:last-child{
                    right: 0;
                }
                .current-date {
                    flex-grow: 1;
                    text-align: center;
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