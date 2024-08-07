<template>
  <div class="ui-slider-date-picker-c">
    <div class="day" @mousedown="startDrag($event, 'y')" ref="dayContainer">
      <span
        v-for="day in days"
        :key="day"
        :class="{ selected: day === selectedDay }">
        {{ day }}
      </span>
    </div>
    <div class="month" @mousedown="startDrag($event, 'y')" ref="monthContainer">
      <span
        v-for="(month, index) in months"
        :key="month"
        :class="{ selected: index === selectedMonth }">
        {{ month }}
      </span>
    </div>
    <div class="year" @mousedown="startDrag($event, 'y')" ref="yearContainer">
      <span
        v-for="year in years"
        :key="year"
        :class="{ selected: year === selectedYear }">
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
      selectedYear: dayjs().year(),
      scrolling: false
    }
  },
  created() {
    this.generateMonths()
    this.generateYears()
    this.updateDays()
    this.centerSelectedItem()
  },
  watch: {
    selectedDay() {
      this.centerSelectedItem()
    },
    selectedMonth() {
      this.updateDays()
      this.centerSelectedItem()
    },
    selectedYear() {
      this.updateDays()
      this.centerSelectedItem()
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
    updateDays() {
      this.generateDays()
    },
    centerSelectedItem() {
      this.$nextTick(() => {
        const dayContainer = this.$refs.dayContainer as HTMLElement
        const monthContainer = this.$refs.monthContainer as HTMLElement
        const yearContainer = this.$refs.yearContainer as HTMLElement

        const scrollIntoView = (container: HTMLElement, selectedItem: number | string) => {
          const items = Array.from(container.children) as HTMLElement[]
          const selectedElement = items.find(item => item.textContent?.trim() === selectedItem.toString())
          
          if (selectedElement) {
            container.scrollTop = selectedElement.offsetTop - container.clientHeight / 2 + selectedElement.clientHeight / 2
          }
        }

        scrollIntoView(dayContainer, this.selectedDay)
        scrollIntoView(monthContainer, this.months[this.selectedMonth])
        scrollIntoView(yearContainer, this.selectedYear)
      })
    },
    startDrag(event: MouseEvent, axis: 'y' | 'x') {
      event.preventDefault()
      const start = axis === 'y' ? event.clientY : event.clientX
      const target = event.currentTarget as HTMLElement
      const sensitivity = 0.4

      const onDrag = (e: MouseEvent) => {
        const move = (axis === 'y' ? start - e.clientY : start - e.clientX) * sensitivity
        target.scrollTop += move
        this.scrolling = true
      }

      const onEndDrag = () => {
        document.removeEventListener('mousemove', onDrag)
        document.removeEventListener('mouseup', onEndDrag)
        this.scrolling = false
        this.$nextTick(() => {
          this.selectCenteredItem()
        })
      }

      document.addEventListener('mousemove', onDrag)
      document.addEventListener('mouseup', onEndDrag)
    },
    selectCenteredItem() {
      if (this.scrolling) return

      const dayContainer = this.$refs.dayContainer as HTMLElement
      const monthContainer = this.$refs.monthContainer as HTMLElement
      const yearContainer = this.$refs.yearContainer as HTMLElement

      const centerItem = (container: HTMLElement, type: 'day' | 'month' | 'year') => {
        const items = Array.from(container.children) as HTMLElement[]
        const containerHeight = container.clientHeight
        const containerTop = container.scrollTop
        const centerPosition = containerHeight / 2 + containerTop

        let closestElement: HTMLElement | null = null
        let closestDistance = Infinity

        for (const item of items) {
          const itemTop = item.offsetTop
          const itemBottom = itemTop + item.clientHeight
          const itemCenter = (itemTop + itemBottom) / 2
          const distance = Math.abs(itemCenter - centerPosition)

          if (distance < closestDistance) {
            closestDistance = distance
            closestElement = item
          }
        }

        if (closestElement) {
          const centeredText = closestElement.textContent?.trim()
          if (type === 'day' && centeredText) {
            this.selectedDay = parseInt(centeredText, 10)
          } else if (type === 'month' && centeredText) {
            this.selectedMonth = this.months.indexOf(centeredText)
          } else if (type === 'year' && centeredText) {
            this.selectedYear = parseInt(centeredText, 10)
          }
        }
      }

      centerItem(dayContainer, 'day')
      centerItem(monthContainer, 'month')
      centerItem(yearContainer, 'year')
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
    font-weight: 500;
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
