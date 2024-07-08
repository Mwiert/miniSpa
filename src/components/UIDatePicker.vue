<template>
    <div class="ui-date-picker-c" >
        <div class="ui-date-picker-wrapper">
            <div class="calendar">
                <div class="header">
                    <button class="nav-button" @click="onClickToLeft">&lt;</button>
                    <span class="current-date">{{ dateHolder }}</span>
                    <button class="nav-button" @click="onClickToRight">&gt;</button>
                </div>
            </div>
        
            <div class="weekdays">
                <span v-for="(weekdays,index) in weekdays" :key = index>
                    {{ weekdays }}
                </span>
                <div class="days">
                <span v-for="(days,index) in daysInMonth" :key="index">
                    {{ days }}
                </span>
            </div>
            </div>
        
        </div>

    </div>
</template>


<script lang="ts">
import dayjs from 'dayjs'
export default {
    name:"UIDatePicker",
    data() {
        return {
            
            weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            selectedDate: dayjs(),
            daysInMonth: []
        }
    },
    methods: {
        totalDaysInMonth(){
            
            let startOfMonth = this.selectedDate.startOf('month').format('D');
            console.log(startOfMonth)
            let endOfMonth = this.selectedDate.endOf('month').format('D');
            console.log(endOfMonth)

            for (let i = 0; i < endOfMonth; i++){
                console.log(i)
                this.daysInMonth.push(i)     
            }
        },

        onClickToRight(){
            this.selectedDate = this.selectedDate.add(1, 'month')

        },

        onClickToLeft(){
            this.selectedDate = this.selectedDate.subtract(1, 'month')
        },

        currentMonth(){
            return this.selectedDate.format('MMMM')
        },
        currentYear(){
            return this.selectedDate.format('YYYY')
        },
    },
    computed: {

        dateHolder(){
            return this.currentMonth() + " " + this.currentYear()
        },
        dateDaysHolder(){
            return this.totalDaysInMonth()
        }
    }
}
</script>

 
<style lang="scss" scoped>


@import '../assets/css/variables.scss';

.ui-date-picker-c{

    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 90%;
    
    .ui-date-picker-wrapper{

        background: #FFFFFF;
        box-shadow: 2px 2px 6px #5C75991A;
        border: 1px solid #E6E6E6;
        border-radius: $border-radius-medium;
        opacity: 1;
        width: 270px;
        height: 240px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        .calendar{
            padding-top: 10px;
            width: 200px;
            .header{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .nav-button{
                    background-color: transparent;
                    border: none;
                    font-size: 1.5rem;
                    font-family: 'Arial';
                    cursor: pointer;
                }
                .current-date{
                    font-size: 1rem;
                    font-weight: 500;
                }
            }
        }
        .weekdays{
            padding-bottom: 120px;
            width: 220px;
            display: grid;
            grid-template-columns: repeat(7, 1rem);
            justify-content: space-between;
            font-size: 14px;
            font-weight: 700;
            color: #363636;
            opacity: 0.7;
            .days{

                width: 220px;
                display: grid;
                grid-template-columns: repeat(7, 1rem);
                justify-content: space-between;
                text-align: center
}
        
        }
        
    }
    
}
</style>