<template>
  <div class="time-benders-c">
    <!-- selectedDate comes from UIDateRangePicker with v-model implementation -->
    <UIDateRangePicker v-model="selectedDate" :isMultiDatePicker="true" initialDate="2024-08-20" />
  </div>
</template>

<script lang="ts">
//Imports the needed components and interfaces
import UIDateRangePicker from '../components/UIDateRangePicker.vue'
export default {
  name: 'TimeBenders',
  components: {
    UIDateRangePicker
  },
  data() {
    return {
      //Creating initial date
      selectedDate: ' '
    }
  },
  methods: {},
  //To check if the selected date is changing by v-model implementation as requested
  watch: {
    selectedDate: function (val: string) {
      console.log(val)
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
}
</style>
