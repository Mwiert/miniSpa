<template>
    <div class="ui-date-range-picker-c"> 
        <!-- This is for opening and closing the calendar -->
        <div class="button" @click="toggleDatePicker()" >
        
           <div class="button-items">
            <!-- This is where we are checking if it is single calendar or multi calendar -->
            <div class="is-single-date">
                    <div class="single-date-box">
                    <span class="day">
                    <!-- This is where we are getting the day -->
                    {{ singleSelectedDate.number }} 
                </span>
                <div class='month-year'>
                    <span class="month">
                    <!-- This is where we are getting the month -->                
                        {{ formatMonth(singleSelectedDate.month) }}
                    </span>
                    <span class="year"> 
                    <!-- This is where we are getting the year -->                
                        {{ singleSelectedDate.year }}
                    </span>
                </div>
                </div>
                <div class="single-date-box divider" v-if="isMultiDatePicker">
                    <span class="day">
                    <!-- This is where we are getting the day -->
                    {{ singleSelectedDate.number }} 
                </span>
                <div class='month-year'>
                    <span class="month">
                    <!-- This is where we are getting the month -->                
                        {{ formatMonth(singleSelectedDate.month) }}
                    </span>
                    <span class="year"> 
                    <!-- This is where we are getting the year -->                
                        {{ singleSelectedDate.year }}
                    </span>
                </div>
                </div>
            </div>
        
            </div> 
        </div>
    <div class="date-picker">
            <!-- This is where we are sending the needed probs into the child named UIDatePicker and for future implementation UIMultiDatePicker -->
            <UIDatePicker v-if="isSingleDatePickerEnable" :yearRange="validateYear" :monthRange ="validateMonth" :saveDate="singleSelectedDate.date" @sendDateToParent="setCurrentDate" @dateSelected="handleDateSelected" @click="sendDateToParent()"/>
            <UIMultiDatePicker v-if="isMultiDatePickerEnable" :yearRange= "validateYear" :monthRange = "validateMonth"  :saveDate="singleSelectedDate.date" @sendDateToParent="setCurrentDate" @dateSelected="handleDateSelected"/>
        </div>
    </div>
</template>

<script lang="ts">
//Imports the needed components and interfaces
import UIDatePicker from '../components/UIDatePicker.vue';
import UIMultiDatePicker from '../components/UIMultiDatePicker.vue';
import date from '../interface/IUIDatePicker';
import dayjs from 'dayjs';

export default {
    name: 'UIDateRangePicker',
    components: {
        UIDatePicker,
        UIMultiDatePicker
        
    },
    props: {
        isMultiDatePicker: { type: Boolean, default: false }, //This is for asking to parent whether should the multi date picker available in this implementation
        isSingleDatePicker: { type: Boolean, default: false }, //This is for asking to parent whether should the single date picker available in this implementation
        validateMonth: { type: Number, default: 9999}, //This is for validating the month range by giving it 9999 as default value since this is one of the maximum value
        validateYear: { type: Number, default: 9999}, //This is for validating the year range by giving it 9999 as default value since this is one of the maximum value
        value: {} //This is for getting the selected date from the parent component TimeBenders
    },
    data() {
        return {
            singleSelectedDate: {} as date, //This is for getting the selected date from UIDatePicker
            isSingleDatePickerEnable: false, //This is for enabling the single date picker as default false
            isMultiDatePickerEnable: false, //This is for enabling the multi date picker as default false
        };
    },
    methods: {
      
        sendDateToParent() {
            //We are sending the selected date to the parent component with v-model implementation.
            this.$emit('update:modelValue', this.singleSelectedDate.date);
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
            //We are returning the month name if not available just return the month's number like on top.
            return months[month] || month;
        },
        handleDateSelected(firstDate: date) {
        // We get the selected date from UIDatePicker and set it to selectedDate (Handling the emit from UIDatePicker to UIDateRangePicker)
        this.singleSelectedDate = firstDate;
        },
        setCurrentDate(presentDate: date){
        //We are setting the current date to the present date (Handling the emit from UIDatePicker to UIDateRangePicker)
            this.presentDate = presentDate;
        },
        toggleDatePicker(){
            
            //If the single date picker is enabled on TimeBenders, we are toggling the single date picker
            if(this.isSingleDatePicker === true){
                //We can implement it by this.isSingleDatePickerEnable = !this.isSingleDatePickerEnable; but it will create problem in muldi date picker implementation
                if(this.isSingleDatePickerEnable === false){
                    this.isSingleDatePickerEnable = true;
                }
                else{
                    this.isSingleDatePickerEnable = false;
                }
            }
            
            //If the multi date picker is enabled on TimeBenders, we are toggling the multi date picker with related single date picker logic
            if(this.isMultiDatePicker === true){
                
                if(this.isMultiDatePickerEnable === false){
                    this.isMultiDatePickerEnable = true;
                }
                else{
                    this.isSingleDatePickerEnable = false;
                    this.isMultiDatePickerEnable = false;
                }
            }
    },
    //This is for filling the initial date to the singleSelectedDate since it comes empty as default so we need to use our TypeScript interface to fill it.
    fillInitialDate(){
        this.singleSelectedDate = {
            number: dayjs().format('DD'),
            month: dayjs().format('MM'),
            year: dayjs().format('YYYY'),
            date: dayjs().format('YYYY-MM-DD'),
        };
    }
    },
created() {

    //We are filling the initial date when the component is created because we want to see today's date in button when we open our web page.
    this.fillInitialDate();
},
}
;
</script>

<style lang="scss" scoped>

@import '../assets/css/variables.scss';
@import '../assets/css/_fonts.scss';

//This is main container
.ui-date-range-picker-c {
    display: flex;
    flex-direction: column;
    align-self: center;
    text-align: center;
    padding: 1rem;
    gap: 0.75rem;
    //This is our button container
    .button {
      background: #F8F8F8;
      box-shadow: 2px 2px 6px #5858581a;
      border: 1px solid #b6b6b6;
      
      opacity: 1;
      width: 175px;
      height: 24px;
        
        justify-items: center;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        margin-right: 9rem;
        padding: 10px;
        cursor: pointer;
        border-radius: 12px;
        //This is content inside of button
        .button-items{
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            text-align: center;
            width: 100%;
            align-items: center;
            font-size: 12px;
            color: #2b2b2b;
            opacity: 0.9;
            //The output for single date picker if it is single
            .is-single-date{
                width: 100%;
                display: flex;
            //Date format box
            .single-date-box{

                display: flex;
                justify-content: center;
                flex-direction: row;
                width: 100%;
                
                .day{
                font-size: 20px;
                font-weight: bold;
                color: #2b2b2b;
                padding: 0 5px;

                }
                //Month and Year Box To Design
                .month-year{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: start;
                font-size: 10px;
                    .month{
                    color: #2e2e2e
                    }
                    .year{
                    color:#7F7F7F
                    }
                }

                //Divider for multi date picker
                &.divider{
                    border-left: 1px solid #b6b6b6;
                }
            }
        }

        }    
    }
    }

</style>