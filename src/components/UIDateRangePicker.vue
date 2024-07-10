<template>
    <div class="ui-date-range-picker-c"> 
        <div class="button" @click="toggleCalendar">
           <div v-if="!openCalendar" class="open">Aç</div>
              <div v-else class="prompted-date">
                <div class="day">
                    {{ selectedDate.split('-')[0] }}
                </div>
                <div class='month-year'>
                    <div class="month">
                        {{ formatMonth(selectedDate.split('-')[1]) }}
                    </div>
                    <div class="year"> 
                        {{ selectedDate.split('-')[2] }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';

export default {
    name: 'UIDateRangePicker',
    props: {
        selectedDate: { type: String, default: dayjs().format('DD-MM-YYYY') },
    },
    data() {
        return {
            openCalendar: false,
        };
    },
    methods: {
        toggleCalendar() {
            this.openCalendar = !this.openCalendar;
            this.$emit('closeCalendar', this.openCalendar);
        },
        formatMonth(month) {
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
            return months[month] || month;
        },
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

   

    .button {
      background: #ffffff;
      box-shadow: 2px 2px 6px #5858581a;
      border: 1px solid #b6b6b6;
      border-radius: $border-radius-medium;
      opacity: 1;
      width: 100px;
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