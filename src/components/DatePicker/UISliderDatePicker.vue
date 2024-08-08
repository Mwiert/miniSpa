<template>
  <div class="ui-slider-date-picker-c">
    <div class="center-overlay"></div>
    <div class="day" @mousedown="startDrag($event)" ref="dayContainer">
      <span v-for="day in days" :key="day" :class="{ selected: day === selectedDay }">
        {{ day }}
      </span>
    </div>
    <div class="month" @mousedown="startDrag($event)" ref="monthContainer">
      <span
        v-for="(month, index) in months"
        :key="month"
        :class="{ selected: index === selectedMonth }">
        {{ month }}
      </span>
    </div>
    <div class="year" @mousedown="startDrag($event)" ref="yearContainer">
      <span v-for="year in years" :key="year" :class="{ selected: year === selectedYear }">
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
      scrolling: false,
      scrollTimeout: null as number | null,
      lastScrollTop: 0,
      isDragging: false
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
      this.emitSelectedDate()
    },
    selectedMonth() {
      this.updateDays()
      this.centerSelectedItem()
      this.emitSelectedDate()
    },
    selectedYear() {
      this.updateDays()
      this.centerSelectedItem()
      this.emitSelectedDate()
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
    startDrag(event: MouseEvent) {
      event.preventDefault()
      const target = event.currentTarget as HTMLElement
      this.isDragging = true

      const startY = event.clientY
      const initialScrollTop = target.scrollTop

      const onDrag = (e: MouseEvent) => {
        const moveY = e.clientY - startY
        target.scrollTop = initialScrollTop - moveY
      }

      const onEndDrag = () => {
        this.isDragging = false
        document.removeEventListener('mousemove', onDrag)
        document.removeEventListener('mouseup', onEndDrag)
        this.scrolling = false
        this.$nextTick(() => {
          this.selectCenteredItem()
        })
      }

      document.addEventListener('mousemove', onDrag)
      document.addEventListener('mouseup', onEndDrag)
      this.scrolling = true
    },
    centerSelectedItem() {
      this.$nextTick(() => {
        const containers = [
          this.$refs.dayContainer,
          this.$refs.monthContainer,
          this.$refs.yearContainer
        ]

        containers.forEach((container) => {
          const items = Array.from(container.children) as HTMLElement[]
          const containerHeight = container.clientHeight
          const containerTop = container.scrollTop
          const centerPosition = containerHeight / 2 + containerTop

          items.forEach((item) => {
            const itemTop = item.offsetTop
            const itemBottom = itemTop + item.clientHeight
            const itemCenter = (itemTop + itemBottom) / 2
            const distance = Math.abs(itemCenter - centerPosition)

            const normalizedDistance = Math.min(distance / (containerHeight / 2), 1)

            const rotationAngle = 60 * normalizedDistance
            item.style.transform = `rotateX(${rotationAngle}deg)`

            if (itemCenter === centerPosition) {
              item.style.transform = `rotateX(0deg)`
            }
          })
        })
      })
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
    },
    emitSelectedDate() {
      const formattedDate = dayjs()
        .year(this.selectedYear)
        .month(this.selectedMonth)
        .date(this.selectedDay)
        .format('DD-MM-YYYY')
      this.$emit('selected-date', formattedDate)
    },
    onScroll() {
      if (this.isDragging) return

      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout)
      }

      this.scrollTimeout = setTimeout(() => {
        this.selectCenteredItem()
      }, 100)
    }
  },
  mounted() {
    this.$refs.dayContainer.addEventListener('scroll', this.onScroll)
    this.$refs.monthContainer.addEventListener('scroll', this.onScroll)
    this.$refs.yearContainer.addEventListener('scroll', this.onScroll)
  },
  beforeUnmount() {
    this.$refs.dayContainer.removeEventListener('scroll', this.onScroll)
    this.$refs.monthContainer.removeEventListener('scroll', this.onScroll)
    this.$refs.yearContainer.removeEventListener('scroll', this.onScroll)
  }
}
</script>

<style lang="scss" scoped>
.ui-slider-date-picker-c {
  display: grid;
  grid-template-columns: 1fr 3fr 1.5fr;
  height: calc(9 * 1.5rem + 2 * 16px);
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  gap: 16px;
  position: relative;
  perspective: 1000px;

  .center-overlay {
    position: absolute;
    top: 43%;
    left: 5%;
    width: 90%;
    height: 2rem;
    border-radius: 10px;
    background: #f4f4f4;
    pointer-events: none;
  }

  .day,
  .month,
  .year {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    align-items: center;
    position: relative;
    scroll-behavior: smooth;
    user-select: none;
    transform-style: preserve-3d;
    perspective: inherit;

    &::-webkit-scrollbar {
      width: 0;
      background: transparent;
    }
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
    transform: rotateX(0deg);
    transform-origin: center;
  }

  .day span.selected,
  .month span.selected,
  .year span.selected {
    font-weight: 500;
    transform: scale(1.2) rotateX(0deg);
    opacity: 1;
  }
}
</style>
