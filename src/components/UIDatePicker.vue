<template>
    <div class="ui-date-picker-c">
        <div class="ui-date-picker-wrapper">
            <div>
                <div class="calendar">
                <div class="header">
                    <button class="nav-button" @click="onClickToLeft">&lt;</button>
                    <span class="current-date">{{ dateHolder }}</span>
                    <button class="nav-button" @click="onClickToRight">&gt;</button>
                </div>
                <ul class="weekdays">
                    <template v-for="(weekday, index) in weekdays" :key="index">
                        <li> {{ weekday }}</li>
                    </template>
                </ul>
                <ul class= "days">
                    <template v-for="(day, index) in daysInMonth" :key="index">
                        <li> {{ day }}</li>
                    </template>
                </ul>
            </div>
        
            
            </div>
            
            </div>
           
        </div>

</template>

<script lang="ts">
import dayjs from 'dayjs'
export default {
    name: "UIDatePicker",
    data() {
        return {
            weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            selectedDate: dayjs(),
            daysInMonth: [],
            TodaysDate: null
        }
    },
    methods: {

        totalDaysInMonth() {

            this.daysInMonth = [];
            const startOfMonth = this.selectedDate.startOf('month');
            const endOfMonth = this.selectedDate.endOf('month');
            const offsetValue = (startOfMonth.day() + 6) % 7;

            for (let i = 0; i < offsetValue; i++) {
                this.daysInMonth.push(" ");
            }

            for (let i = 0; i < endOfMonth.date(); i++) {
                this.daysInMonth.push(i+1);
                console.log(typeof this.daysInMonth[i])
            }

            const endOffsetValue = (7-(this.daysInMonth.length % 7)) % 7

            for (let i = 0; i <  endOffsetValue; i++) {
                this.daysInMonth.push(" ");
            }
            
            console.log(this.daysInMonth)

        },
        onClickToRight() {
            this.selectedDate = this.selectedDate.add(1, 'month');
            this.totalDaysInMonth(); 
        },
        onClickToLeft() {
            this.selectedDate = this.selectedDate.subtract(1, 'month');
            this.totalDaysInMonth(); 
        },
        currentMonth() {
            return this.selectedDate.format('MMMM');
        },
        currentYear() {
            return this.selectedDate.format('YYYY');
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
}
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
        background: #FFFFFF;
        box-shadow: 2px 2px 6px #5C75991A;
        border: 1px solid #E6E6E6;
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
                .current-date {
                    font-size: 0.9rem;
                    font-weight: 500;
                }
            }
        }
        
        .weekdays, .days {
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
        .days{
            padding-top: 6px;
        }
        .days li{
            padding: 10px 9px;
            line-height: 5px;
        }

    }
}
</style>