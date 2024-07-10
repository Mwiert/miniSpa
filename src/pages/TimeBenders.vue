<template>
    <div>
        <UIDatePicker :yearRange="4" :initialDate="selectedDate" @dateSelected="handleDateSelected" />
    </div>
</template>

<script lang="ts">
import UIDatePicker from '../components/UIDatePicker.vue';
import dayjs from 'dayjs';
export default {
    
    name: 'TimeBenders',
    components: {
        UIDatePicker,
    },
    data() {
        return {
            selectedDate: dayjs().format('YYYY-MM-DD')
        }
    },
    methods: {

        handleDateSelected(firstDate: string,secondDate: string) {
            this.firstSelectedDate = firstDate;
            this.secondSelectedDate = secondDate;
            console.log("Selected Date: ", firstDate, secondDate)
        }
    }

    
    
   
}
</script>

<style lang="scss" scoped>
    
</style>