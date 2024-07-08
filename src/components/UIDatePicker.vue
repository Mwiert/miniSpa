<template>
    <div class="ui-date-picker-c">
        <div class="date-holder">
            {{ currentMonth + " " +currentYear }}
        </div>
        <div v-for= "(days,index) in weekdays" :key="index" class="days-wrapper">
            <div class="day-names"> 
               {{ weekdays[index] }}
            </div>
            <div class= "days">
                dfasfdas
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
            showCalendar: false,
            currentMonth: dayjs().format('MMMM'),
            currentYear: dayjs().format('YYYY'),
            weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            selectedDate: dayjs(),
            daysInMonth: []
        }
    }
}
</script>

 
<style lang="scss" scoped>
@import '../assets/css/_fonts.scss';

.ui-date-picker-c{
    justify-content: center;
    align-items: center;

.date-holder{
    
    font-family: Roboto;
    letter-spacing: 0px;
    color: #363636;
    opacity: 1;
    font-weight: bold;

}
.days-wrapper{
    .day-names{
        display:flex;
        justify-content: space-evenly;
        flex-direction: row;
    }
    .days{
        display: grid;
        justify-content: space-evenly;
        padding: 10px;
        font-size: 16px;
    }
}
}
</style>