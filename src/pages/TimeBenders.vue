<template>
    <div>
        <UIDatePicker :yearRange="4" :initialDate="selectedDate" v-model="test" @dateSelected="handleDateSelected" />
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
            selectedDate: dayjs().format('YYYY-MM-DD'),
        }
    },
    methods: {

        handleDateSelected(firstDate: string) {
            this.selectedDate = firstDate;           
            console.log("Selected Date: ", firstDate)
        }
    }

    
    
   
}
</script>

<style lang="scss" scoped>
    
</style>