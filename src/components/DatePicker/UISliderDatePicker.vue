<template>
  <div class="ui-slider-date-picker-c">
    <div class="day" @mousedown="startScroll($event, 'day')">
      <span v-for="day in days" :key="day" :class="{ selected: day === selectedDay }" @click="selectDay(day)">
        {{ day }}
      </span>
    </div>
    <div class="month" @mousedown="startScroll($event, 'month')">
      <span v-for="(month, index) in months" :key="month" :class="{ selected: index === selectedMonth }"
        @click="selectMonth(index)">
        {{ month }}
      </span>
    </div>
    <div class="year" @mousedown="startScroll($event, 'year')">
      <span v-for="year in years" :key="year" :class="{ selected: year === selectedYear }" @click="selectYear(year)">
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
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(i)
      }
      this.days = days

      if (this.selectedDay > daysInMonth) {
        this.selectedDay = daysInMonth
      }
      this.$nextTick(() => {
        this.scrollToSelected('day')
      })
    },
    generateMonths() {
      const months: string[] = []
      for (let i = 0; i < 12; i++) {
        months.push(dayjs().month(i).format('MMMM'))
      }
      this.months = months
    },
    generateYears() {
      const years: number[] = []
      const currentYear = dayjs().year()
      for (let i = currentYear - 50; i <= currentYear + 50; i++) {
        years.push(i)
      }
      this.years = years
    },
    selectDay(day: number) {
      this.selectedDay = day
      this.$nextTick(() => {
        this.scrollToSelected('day')
      })
    },
    selectMonth(index: number) {
      this.selectedMonth = index
      this.$nextTick(() => {
        this.scrollToSelected('month')
      })
    },
    selectYear(year: number) {
      this.selectedYear = year
      this.$nextTick(() => {
        this.scrollToSelected('year')
      })
    },
    updateDays() {
      this.generateDays()
    },
    scrollToSelected(category: 'day' | 'month' | 'year') {
      const container = this.$el.querySelector(`.${category} span.selected`)
      if (container) {
        container.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        })
      }
    },
    startScroll(e: MouseEvent, category: 'day' | 'month' | 'year') {
      this.isScrolling = true
      this.startY = e.clientY
      this.scrollTop = this.$el.querySelector(`.${category}`)!.scrollTop

      const onMouseMove = (moveEvent: MouseEvent) => {
        if (this.isScrolling) {
          const deltaY = moveEvent.clientY - this.startY
          const container = this.$el.querySelector(`.${category}`) as HTMLElement
          container.scrollTop = this.scrollTop - deltaY
        }
      }

      const onMouseUp = () => {
        this.isScrolling = false
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
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
    overflow: hidden;
    scroll-snap-type: y mandatory;
    align-items: center;
    position: relative;
    scroll-behavior: smooth;
  }

  .day span,
  .month span,
  .year span {
    padding: 4px;
    cursor: pointer;
    scroll-snap-align: center;
  }

  .day span.selected,
  .month span.selected,
  .year span.selected {
    font-weight: bold;
    color: red;
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
