<template>
    <div class="ui-date-range-picker-c"> 
        <!-- This is for opening and closing the calendar -->
        <div class="button" @click="closeDatePicker">
           <div v-if="!isSingleDatePickerEnable" class="open">Aç</div>
              <div v-else class="prompted-date">
                <div class="day">
                    <!-- This is where we are getting the day -->
                    {{ singleSelectedDate.split('-')[0] }}
                </div>
                <div class='month-year'>
                    <div class="month">
                    <!-- This is where we are getting the month -->                
                        {{ formatMonth(singleSelectedDate.split('-')[1]) }}
                    </div>
                    <div class="year"> 
                    <!-- This is where we are getting the year -->                
                        {{ singleSelectedDate.split('-')[2] }}
                    </div>
                </div>
            </div>
        </div>
        <div class="date-picker">
            <UIDatePicker v-if="isSingleDatePickerEnable" :yearRange="4" :saveDate="singleSelectedDate" @dateSelected="handleDateSelected"/>
            <UIMultiDatePicker v-if="isMultiDatePickerEnable"  :yearRange="4" :saveDate="singleSelectedDate" @dateSelected="handleDateSelected"/>
        </div>

    </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import UIDatePicker from '../components/UIDatePicker.vue';
import UIMultiDatePicker from '../components/UIMultiDatePicker.vue';
export default {
    name: 'UIDateRangePicker',
    components: {
        UIDatePicker,
        UIMultiDatePicker
    },
    props: {
        isMultiDatePicker: { type: Boolean, default: false },
        isSingleDatePicker: { type: Boolean, default: false },
    },
    data() {
        return {
            singleSelectedDate: dayjs().format('DD-MM-YYYY'),
            isSingleDatePickerEnable: false,
            isMultiDatePickerEnable: false,

        };
    },
    methods: {
        toggleCalendar() {
            this.isSingleDatePickerEnable = !this.isSingleDatePickerEnable;
            this.$emit('closeCalendar', this.isSingleDatePickerEnable);
        },
        sendDateToParent(){
            this.$emit('dateSelected', this.singleSelectedDate);
        },
        formatMonth(month) {
            //We are converting the month number to month name
            const months = {
                '01': 'January',
                '02': 'February',
                '03': 'March',
                '04': 'April',
                '05': 'May',
                '06': 'June',
                '07': 'July',
                '08': 'August',
                '09': 'September',
                '10': 'October',
                '11': 'November',
                '12': 'December',
            };
            //We are returning the month name if not available just return
            return months[month] || month;
        },
        handleDateSelected(firstDate: string) {
        // We get the selected date from UIDatePicker and set it to selectedDate
        this.singleSelectedDate = firstDate;
      },
        sendToTimeBenders(){
            this.$emit('dateSelected', this.singleSelectedDate);
        },
        closeDatePicker(){
            
        if(this.isSingleDatePicker === true){
            if(this.isSingleDatePickerEnable === false){
            this.isSingleDatePickerEnable = true;
            }else{
                this.isSingleDatePickerEnable = false;
            }
        }
       
        if(this.isMultiDatePicker === true){
            if(this.isMultiDatePickerEnable === false){
            this.isMultiDatePickerEnable = true;
            }else{
                this.isMultiDatePickerEnable = false;
            }
        }  

    }
    }
};
</script>

<style lang="scss" scoped>

@import '../assets/css/variables.scss';
@import '../assets/css/_fonts.scss';

.ui-date-range-picker-c {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-self: center;
    text-align: center;
    padding: 1rem;

   
    .date-picker{
        margin-top: 0.75rem;
    }
    .button {
      background: #ffffff;
      box-shadow: 2px 2px 6px #5858581a;
      border: 1px solid #b6b6b6;
      border-radius: $border-radius-medium;
      opacity: 1;
      width: 120px;
      height: 30px;
        justify-content: center;
        align-items: center;
        justify-items: center;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        margin-right: 9rem;
        padding: 10px;
        cursor: pointer;
        border-radius: 12px;
        
        .open{
            display: flex;
            flex-direction: row;
            justify-content: center;
            text-align: center;
            gap: 5px;
            align-items: center;
            font-size: 25px;
            color: #2b2b2b;
            opacity: 0.9;
        }
        .prompted-date{
            display: flex;
            flex-direction: row;
            text-align: center;
            justify-content: center;
            width: 100%;
            


            .day{
                font-size: 25px;
                font-weight: bold;
                color: #2b2b2b;
                opacity: 0.9;
                padding: 0 10px;
             

            }
            .month-year{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: start;
                font-size: 10px;
              
                .year{
                    color:#5e5e5e
                }
            }
        }
    }
    
}
</style>