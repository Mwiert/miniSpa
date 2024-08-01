<template>
    <div class="date-picker">
      <div class="picker" ref="months" @wheel="scroll('months', $event)">
        <div v-for="(month, index) in months" :key="index" :class="{ selected: selectedMonthIndex === index }" @click="selectMonth(index)">
          {{ month }}
        </div>
      </div>
      <div class="picker" ref="days" @wheel="scroll('days', $event)">
        <div v-for="day in days" :key="day" :class="{ selected: selectedDay === day }" @click="selectDay(day)">
          {{ day }}
        </div>
      </div>
      <div class="picker" ref="years" @wheel="scroll('years', $event)">
        <div v-for="year in years" :key="year" :class="{ selected: selectedYear === year }" @click="selectYear(year)">
          {{ year }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      value: {
        type: Object,
        default: () => ({
          month: 2,
          day: 3,
          year: new Date().getFullYear(),
        }),
      },
    },
    data() {
      return {
        months: [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ],
        days: Array.from({ length: 31 }, (_, i) => i + 1),
        years: Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i),
        selectedMonthIndex: this.value.month,
        selectedDay: this.value.day,
        selectedYear: this.value.year,
      };
    },
    methods: {
      selectMonth(index) {
        this.selectedMonthIndex = index;
        this.emitChange();
      },
      selectDay(day) {
        this.selectedDay = day;
        this.emitChange();
      },
      selectYear(year) {
        this.selectedYear = year;
        this.emitChange();
      },
      emitChange() {
        this.$emit("input", {
          month: this.selectedMonthIndex,
          day: this.selectedDay,
          year: this.selectedYear,
        });
      },
      scroll(refName, event) {
        const element = this.$refs[refName];
        element.scrollTop += event.deltaY;
      },
    },
    watch: {
      value: {
        deep: true,
        handler(newVal) {
          this.selectedMonthIndex = newVal.month;
          this.selectedDay = newVal.day;
          this.selectedYear = newVal.year;
        },
      },
    },
  };
  </script>
  
  <style scoped>
  .date-picker {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .picker {
    height: 200px;
    overflow-y: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .picker div {
    width: 100%;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    user-select: none;
  }
  
  .selected {
    background-color: #d4d4d4;
    font-weight: bold;
  }
  
  .picker::-webkit-scrollbar {
    display: none;
  }
  </style>
  