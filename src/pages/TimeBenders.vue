<template>
  <div class="time-benders-c">
    <!-- <div style="width: 30%"><slider /></div> -->

    <div class="single">
      <UIDateRangePicker v-model="selectDate" :validateBackYear="10" label="Default calendar" />
      <UIDateRangePicker v-model="selectDate" isPast label="Single isPast" />
      <UIDateRangePicker
        v-model="selectDate"
        isFuture
        :validateForwardMonth="2"
        label="Single isFuture" />
    </div>
    <div class="multi-row">
      <UIDateRangePicker v-model="selectDate" isMulti label="default " positionToRight />
      <UIDateRangePicker
        v-model="selectDate"
        isMulti
        :maxSelectableDays="5"
        :validateForwardDay="10"
        :validateBackDay="7"
        label="maxSelectable:5" />
      <UIDateRangePicker
        v-model="selectDate"
        isMulti
        :validateForwardDay="20"
        label="Forward Day:20"
        positionToLeft />
    </div>

    <div class="multi-column">
      <UIDateRangePicker
        v-model="selectDate"
        isMulti
        isPast
        :validateBackYear="4"
        label="isPast + backMonth:2" />
      <UIDateRangePicker
        v-model="selectDate"
        isMulti
        isFuture
        :validateForwardYear="2"
        label="isFuture " />
    </div>
  </div>
</template>

<script lang="ts">
//Imports the needed components and interfaces
import UIDateRangePicker from '../components/DatePicker/UIDateRangePicker.vue'
//import slider from '../components/DatePicker/UISliderDatePicker.vue'
export default {
  name: 'TimeBenders',
  components: {
    UIDateRangePicker
    //slider
  },
  data() {
    return {
      selectDate: {}
    }
  }
}
</script>

<style lang="scss" scoped>
//Styling the parent component
.time-benders-c {
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  padding: 1rem;
  width: 100%;
  height: 100%;

  .single {
    display: flex;
    flex-direction: row;
  }
  .multi-row {
    display: flex;
    flex-direction: row;
  }
  .multi-column {
    display: flex;
    flex-direction: column;
  }
}
</style>
