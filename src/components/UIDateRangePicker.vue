<template>
    <div class="ui-date-range-picker-c"> 
      
       

        <!-- This is for opening and closing the calendar -->
        <div class="button" @click="closeDatePicker">
           <div v-if="!isSingleDatePickerEnable && !isMultiDatePickerEnable" class="button-items">Aç</div>
           
              <div v-else class="prompted-date">
                <div v-show="isSingleDatePickerEnable" class="is-single-date">
                    <div class="single-date-box">
                    <span class="day">
                    <!-- This is where we are getting the day -->
                    {{ singleSelectedDate.split('-')[0] }}
                </span>
                <div class='month-year'>
                    <span class="month">
                    <!-- This is where we are getting the month -->                
                        {{ formatMonth(singleSelectedDate.split('-')[1]) }}
                    </span>
                    <span class="year"> 
                    <!-- This is where we are getting the year -->                
                        {{ singleSelectedDate.split('-')[2] }}
                    </span>
                </div>
                </div>
                </div> 
                <div v-show="isMultiDatePickerEnable" class="is-multi-date">
            
                    <div class="single-date-box">
                    <span class="day">
                    <!-- This is where we are getting the day -->
                    {{ singleSelectedDate.split('-')[0] }}
                </span>
                <div class='month-year'>
                    <span class="month">
                    <!-- This is where we are getting the month -->                
                        {{ formatMonth(singleSelectedDate.split('-')[1]) }}
                    </span>
                    <span class="year"> 
                    <!-- This is where we are getting the year -->                
                        {{ singleSelectedDate.split('-')[2] }}
                    </span>
                </div>
                </div>
                
                    <div class="multi-date-box">
                
                <span class="day">
                    <!-- This is where we are getting the day -->
                    {{ singleSelectedDate.split('-')[0] }}
                </span>
                <div class='month-year'>
                    <span class="month">
                    <!-- This is where we are getting the month -->                
                        {{ formatMonth(singleSelectedDate.split('-')[1]) }}
                    </span>
                    <span class="year"> 
                    <!-- This is where we are getting the year -->                
                        {{ singleSelectedDate.split('-')[2] }}
                    </span>
                    </div>
                    </div>
                </div>
            
            </div>
        
        </div>
    <div class="date-picker">
            <UIDatePicker v-if="isSingleDatePickerEnable" :yearRange="4" :saveDate="singleSelectedDate" @dateSelected="handleDateSelected"/>
            <UIMultiDatePicker v-if="isMultiDatePickerEnable" :yearRange="4" :saveDate="singleSelectedDate" @dateSelected="handleDateSelected"/>
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
            this.isMultiDatePickerEnable = !this.isMultiDatePickerEnable;
            this.$emit('closeCalendar', this.isSingleDatePickerEnable, this.isMultiDatePickerEnable);
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
            console.log(this.isSingleDatePicker)
            if(this.isSingleDatePicker === true){
                if(this.isSingleDatePickerEnable === false){
                    this.isSingleDatePickerEnable = true;
                }
                else{
                    this.isSingleDatePickerEnable = false;
                    }
            }
            console.log(this.isMultiDatePicker)
            if(this.isMultiDatePicker === true){
                if(this.isMultiDatePickerEnable === false){
                    this.isMultiDatePickerEnable = true;
            }
            else{
                this.isSingleDatePickerEnable = false;
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
    align-self: center;
    text-align: center;
    padding: 1rem;

   
    .date-picker{
        margin-top: 1.5rem;
    }

    .button {
      background: #F8F8F8;
      box-shadow: 2px 2px 6px #5858581a;
      border: 1px solid #b6b6b6;
      border-radius: $border-radius-medium;
      opacity: 1;
      width: 175px;
      height: 24px;
        justify-content: space-between;
        align-items: center;
        justify-items: center;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        margin-right: 9rem;
        padding: 10px;
        cursor: pointer;
        border-radius: 12px;
        
        .button-items{
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            text-align: center;
            width: 100%;
            align-items: center;
            font-size: 16px;
            color: #2b2b2b;
            opacity: 0.9;
        }

        .prompted-date{
            display: flex;
            flex-direction: row;
            text-align: center;
            justify-content: center;
            width: 100%;
            height: auto;            
            .is-single-date{
                width: 100%;

            .single-date-box{

                display: flex;
                justify-content: center !important;
                flex-direction: row;
                width: 100%;

                

                .day{
                font-size: 20px;
                font-weight: bold;
                color: #2b2b2b;
                opacity: 0.9;
                padding: 0 5px;
             

                }

                .month-year{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: start;
                font-size: 10px;
                    .month{
                    color:#5D5660
                    }
                    .year{
                    color:#7F7F7F
                    }
                }
            }
        }
         .is-multi-date{   
            width: 100%;
            display: flex;
            flex-direction: row;


            .single-date-box{

                display: flex;
                justify-content: center !important;
                flex-direction: row;
                width: 100%;



                .day{
                font-size: 20px;
                font-weight: bold;
                color: #2b2b2b;
                opacity: 0.9;
                padding: 0 5px;


                }

                .month-year{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: start;
                font-size: 10px;
                    .month{
                    color:#5D5660
                    }
                    .year{
                    color:#7F7F7F
                    }
                }
                }

            .multi-date-box{
                display: flex;
                flex-direction: row;
                justify-content: center !important;
                width: 100%;
                border-left: #D3D4D5 1px solid;



                .day{
                font-size: 20px;
                font-weight: bold;
                color: #363636;
                opacity: 0.9;
                padding: 0 5px;
             

                }

                .month-year{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: start;
                .month{
                    color:#5D5660;
                    font-size: 10px;
                    }
                    .year{
                    color:#5e5e5e;
                    font-size: 8px;
                    }
                }
                
            }

        }
    }
    }
    
}
</style>