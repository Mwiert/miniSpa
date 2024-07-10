<template>
    <div class="time-benders-c">
        <UIDatePicker :yearRange="4" :initialDate="selectedDate" @dateSelected="handleDateSelected"/>

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
        },
    
    }

    
    
   
}
</script>

<style lang="scss" scoped>
.time-benders-c{   

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  justify-self: center;
  text-align: center;
  padding: 1rem;
  width: 100%;
  height: 100%;

}



</style>

