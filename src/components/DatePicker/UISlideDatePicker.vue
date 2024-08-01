<template>
  <div class="date-picker">
    <div class="picker" ref="months" @scroll="onScroll('months')">
      <div
        v-for="(month, index) in months"
        :key="index"
        :class="{ selected: selectedMonthIndex === index }">
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

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DateModel from '../../interface/IUISlideDatePicker'

export default defineComponent({
  name: 'UISlideDatePicker',
  props: {
    value: {
      type: Object as PropType<DateModel>,
      default: () => ({
        month: '10',
        day: '6',
        year: new Date().getFullYear().toString()
      })
    }
  },
  data() {
    return {
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      days: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
      years: Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 5 + i).toString()),
      selectedMonthIndex: parseInt(this.value.month) - 1,
      selectedDay: this.value.day,
      selectedYear: this.value.year
    }
  },
  methods: {
    onScroll(refName: string) {
      const element = this.$refs[refName] as HTMLElement
      const items = Array.from(element.children) as HTMLElement[]
      const center = element.clientHeight / 2

      let closestIndex = 0
      let minDistance = Infinity

      items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect()
        const itemCenter = itemRect.top + itemRect.height / 2
        const distance = Math.abs(itemCenter - center)

        if (distance < minDistance) {
          minDistance = distance
          closestIndex = index
        }
      })

      if (refName === 'months') {
        this.selectedMonthIndex = closestIndex
      } else if (refName === 'days') {
        this.selectedDay = this.days[closestIndex]
      } else if (refName === 'years') {
        this.selectedYear = this.years[closestIndex]
      }

      this.emitChange()
    },
    emitChange() {
      this.$emit('input', {
        month: (this.selectedMonthIndex + 1).toString(),
        day: this.selectedDay,
        year: this.selectedYear
      })
    }
  },
  watch: {
    value: {
      deep: true,
      handler(newVal) {
        this.selectedMonthIndex = parseInt(newVal.month) - 1
        this.selectedDay = newVal.day
        this.selectedYear = newVal.year
      }
    }
  }
})
</script>

<style scoped>
.date-picker {
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  height: 250px;
}

.picker {
  height: 100%;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  scroll-snap-type: y mandatory;
  transform-style: preserve-3d;
  width: 100px;
}

.picker div {
  width: 100%;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  scroll-snap-align: center;
  font-size: 18px;
  transform: rotateX(0deg) translateZ(100px);
  transition:
    transform 0.3s,
    background-color 0.3s,
    opacity 0.3s;
}

.picker div.selected {
  background-color: #d4d4d4;
  font-weight: bold;
  font-size: 22px;
  transform: rotateX(0deg) translateZ(120px);
}

.picker::-webkit-scrollbar {
  display: none;
}

.picker div:not(.selected) {
  opacity: 0.5;
  transform: rotateX(30deg) translateZ(80px);
}

.picker div:nth-child(n + 2):not(.selected) {
  transform: rotateX(60deg) translateZ(60px);
}

.picker div:first-child.selected ~ div {
  transform: rotateX(-30deg) translateZ(80px);
  opacity: 0.5;
}

.picker div:first-child ~ div:nth-child(2):not(.selected) {
  transform: rotateX(-60deg) translateZ(60px);
  opacity: 0.5;
}

.picker div:nth-child(-n + 1):not(.selected) {
  transform: rotateX(-30deg) translateZ(80px);
  opacity: 0.5;
}
</style>
