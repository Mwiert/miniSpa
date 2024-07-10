<template>
    <div class="time-benders-c">
        <UIDateRangePicker @closeCalendar="handleCalendar"/>
        <UIDatePicker :yearRange="4" :initialDate="selectedDate" @dateSelected="handleDateSelected" v-show="closeCalendar"/>
    </div>
</template>

<script lang="ts">
import UIDatePicker from '../components/UIDatePicker.vue';
import UIDateRangePicker from '../components/UIDateRangePicker.vue';
import dayjs from 'dayjs';
export default {
    
    name: 'TimeBenders',
    components: {
        UIDatePicker,
        UIDateRangePicker,
    },
    data() {
        return {
            selectedDate: dayjs().format('YYYY-MM-DD'),
            closeCalendar: true
           
        }
    },
    methods: {
        
        handleDateSelected(firstDate: string) {
            this.selectedDate = firstDate;           
            console.log("Selected Date: ", firstDate)
        },
        handleCalendar(isCalenderClosed: Boolean){
            this.closeCalendar = isCalenderClosed
            console.log("Calendar Closed: ", isCalenderClosed)
        }
    }

    
    
   
}
</script>

<style lang="scss" scoped>
.time-benders-c{   


}



</style>

