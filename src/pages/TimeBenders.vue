<template>
  <div class="time-benders-c">
    {{ selectDate }}
    <!-- selectedDate comes from UIDateRangePicker with v-model implementation -->
    <UIDateRangePicker
      v-model="selectDate"
      :isMultiDatePicker="true"
      :validateBackMonth="3"
      :validateForwardMonth="2" 
      :spaceBetweenDays="4"
      />
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
}
</style>
