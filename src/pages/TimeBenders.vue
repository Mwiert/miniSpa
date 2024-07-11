<template>
    <div class="time-benders-c">
        <!-- We connect UIDatePicker with TimeBenders here with sending yearRange and initialDate as props to UIDatePicker -->
        <!-- dateSelected comes from UIDatePicker where we handle the selected date from handleDateSelected -->
        <UIDateRangePicker :isSingleDatePicker="true" :isMultiDatePicker="true"/>
   
    </div>
  </template>

  <script lang="ts">
  import UIDateRangePicker from '../components/UIDateRangePicker.vue';
  import dayjs from 'dayjs';

  export default {
    name: 'TimeBenders',
    components: {
      UIDateRangePicker
    },
    data() {
      return {
        selectedDate: dayjs().format('YYYY-MM-DD'),
      }
    },
    methods: {
      handleDateSelected(firstDate: string) {
        // We get the selected date from UIDatePicker and set it to selectedDate
        this.selectedDate = firstDate;
      },
    }
  }
  </script>

  <style lang="scss" scoped>
  .time-benders-c {
    user-select: none;
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