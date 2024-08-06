<template>
  <div class="ui-slider-date-picker-c">
    <div class="day" @mousedown="startDrag($event, 'y')">
      <span
        v-for="day in days"
        :key="day"
        :class="{ selected: day === selectedDay }"
        @click="selectDay(day)">
        {{ day }}
      </span>
    </div>
    <div class="month" @mousedown="startDrag($event, 'y')">
      <span
        v-for="(month, index) in months"
        :key="month"
        :class="{ selected: index === selectedMonth }"
        @click="selectMonth(index)">
        {{ month }}
      </span>
    </div>
    <div class="year" @mousedown="startDrag($event, 'y')">
      <span
        v-for="year in years"
        :key="year"
        :class="{ selected: year === selectedYear }"
        @click="selectYear(year)">
        {{ year }}
      </span>
    </div>
  </div>
</template>



<script lang="ts">
import dayjs from 'dayjs'

export default {
  name: 'UISliderDatePicker',
  data() {
    return {
      days: [] as number[],
      months: [] as string[],
      years: [] as number[],
      selectedDay: dayjs().date(),
      selectedMonth: dayjs().month(),
      selectedYear: dayjs().year()
    }
  },
  created() {
    this.generateMonths()
    this.generateYears()
    this.updateDays()
  },
  watch: {
    selectedMonth() {
      this.updateDays()
    },
    selectedYear() {
      this.updateDays()
    }
  },
  methods: {
    generateDays() {
      const days: number[] = []
      const daysInMonth = dayjs().year(this.selectedYear).month(this.selectedMonth).daysInMonth()

      days.push(null, null, null)
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(i)
      }
      days.push(null, null, null)
      
      this.days = days

      if (this.selectedDay > daysInMonth) {
        this.selectedDay = daysInMonth
      }
    },
    generateMonths() {
      const months: string[] = [] 
      
      months.push(null, null, null)
      for (let i = 0; i < 12; i++) {
        months.push(dayjs().month(i).format('MMMM'))
      }
      months.push(null, null, null)
      
      this.months = months
    },
    generateYears() {
      const years: number[] = []
      const currentYear = dayjs().year()
      
      years.push(null, null, null)
      for (let i = currentYear - 50; i <= currentYear + 50; i++) {
        years.push(i)
      }
      years.push(null, null, null)

      this.years = years
    },
    selectDay(day: number) {
      this.selectedDay = day
    },
    selectMonth(index: number) {
      this.selectedMonth = index
    },
    selectYear(year: number) {
      this.selectedYear = year
    },
    updateDays() {
      this.generateDays()
    },
    startDrag(event: MouseEvent, axis: 'y' | 'x') {
      event.preventDefault()
      const start = axis === 'y' ? event.clientY : event.clientX
      const target = event.currentTarget as HTMLElement
      const sensitivity = 0.4

      const onDrag = (e: MouseEvent) => {
        const move = (axis === 'y' ? start - e.clientY : start - e.clientX) * sensitivity
        target.scrollTop += move
      }

      const onEndDrag = () => {
        document.removeEventListener('mousemove', onDrag)
        document.removeEventListener('mouseup', onEndDrag)
      }

      document.addEventListener('mousemove', onDrag)
      document.addEventListener('mouseup', onEndDrag)
    }
  }
}
</script>


<style lang="scss" scoped>
.ui-slider-date-picker-c {
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;

  .day,
  .month,
  .year {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: hidden;
    scroll-snap-type: y mandatory;
    align-items: center;
    position: relative;
    scroll-behavior: smooth;
    user-select: none;
  }

  .day span,
  .month span,
  .year span {
    padding: 4px;
    cursor: pointer;
    scroll-snap-align: center;
    transition: transform 0.3s ease, opacity 0.3s ease;
    opacity: 0.5;
    min-height: 1.5rem;
    line-height: 1.5rem;
  }

  .day span.selected,
  .month span.selected,
  .year span.selected {
    font-weight: bold;
    transform: scale(1.2);
    opacity: 1;
  }

  .day {
    flex: 2;
  }
  .month {
    flex: 6;
  }
  .year {
    flex: 3;
  }
}
</style>
