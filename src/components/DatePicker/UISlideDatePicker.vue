<template>
    <div class="date-picker">
      <div class="picker" ref="months" @scroll="onScroll('months')">
        <div v-for="(month, index) in months" :key="index" :class="{ selected: selectedMonthIndex === index }">
          {{ month }}
        </div>
      </div>
      <div class="picker" ref="days" @scroll="onScroll('days')">
        <div v-for="day in days" :key="day" :class="{ selected: selectedDay === day }">
          {{ day }}
        </div>
      </div>
      <div class="picker" ref="years" @scroll="onScroll('years')">
        <div v-for="year in years" :key="year" :class="{ selected: selectedYear === year }">
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
          month: 10,
          day: 6,
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
      onScroll(refName) {
        const element = this.$refs[refName];
        const scrollHeight = element.scrollHeight;
        const clientHeight = element.clientHeight;
        const scrollTop = element.scrollTop;
  
        // Consider the bottom reached if scrolled within 1 pixel of the end
        if (scrollTop + clientHeight >= scrollHeight - 1) {
          this.selectLastVisibleItem(refName);
        }
      },
      selectLastVisibleItem(refName) {
        if (refName === 'months') {
          this.selectedMonthIndex = this.months.length - 1;
        } else if (refName === 'days') {
          this.selectedDay = this.days.length - 1;
        } else if (refName === 'years') {
          this.selectedYear = this.years.length - 1;
        }
        this.emitChange();
      },
      emitChange() {
        this.$emit("input", {
          month: this.selectedMonthIndex,
          day: this.selectedDay,
          year: this.selectedYear,
        });
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
    overflow-y: auto;
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
  