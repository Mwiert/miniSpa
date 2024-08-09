<template>
  {{ selectDate }}
  <div class="time-benders-c">
    <div class="single">
      <UIDateRangePicker v-model="selectDate" label="Default calendar" />
      <UIDateRangePicker v-model="selectDate" isPast label="Single isPast" />
      <UIDateRangePicker
        v-model="selectDate"
        isFuture
        :validateForwardMonth="2"
        label="Single isFuture" />
    </div>
    <div class="multi-row">
      <UIDateRangePicker v-model="selectDate" isMulti label="Right position" positionToRight />
      <UIDateRangePicker
        v-model="selectDate"
        isMulti
        :maxSelectibleDay="5"
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
        :validateBackMonth="2"
        label="isPast + backMonth:2" />
      <UIDateRangePicker
        v-model="selectDate"
        isMulti
        isFuture
        :validateForwardMonth="3"
        label="isFuture + forwardMonth:3" />
    </div>
  </div>
</template>

<script lang="ts">
//Imports the needed components and interfaces
import UIDateRangePicker from '../components/DatePicker/UIDateRangePicker.vue'
export default {
  name: 'TimeBenders',
  components: {
    UIDateRangePicker
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
