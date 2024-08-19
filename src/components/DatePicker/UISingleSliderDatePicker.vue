<template>
  <div class="ui-slider-date-picker-c">
    <div class="center-overlay"></div>
    <div class="day" @mousedown="startDrag($event)" ref="dayContainer">
      <span
        v-for="day in days"
        :key="day"
        :class="{ selected: day === selectedDay }"
        :style="getRotationStyle(day, selectedDay)">
        {{ day }}
      </span>
    </div>
    <div class="month" @mousedown="startDrag($event)" ref="monthContainer">
      <span
        v-for="(month, index) in months"
        :key="month"
        :class="{ selected: index === selectedMonth + 3 }"
        :style="getRotationStyle(index - 3, selectedMonth)">
        {{ month }}
      </span>
    </div>
    <div class="year" @mousedown="startDrag($event)" ref="yearContainer">
      <span
        v-for="year in years"
        :key="year"
        :class="{ selected: year === selectedYear }"
        :style="getRotationStyle(year, selectedYear)">
        {{ year }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'

export default {
  name: 'UISingleSliderDatePicker',
  data() {
    return {
      days: [] as number[],
      months: [] as string[],
      years: [] as number[],
      selectedDay: dayjs(this.selectedDate).date(),
      selectedMonth: dayjs(this.selectedDate).month(),
      selectedYear: dayjs(this.selectedDate).year(),
      scrolling: false,
      scrollTimeout: null as number | null,
      isDragging: false,
      selectedIndex: []
    }
  },
  props: {
    selectedDate: { type: String, default: null },
    minDate: {},
    maxDate: {}
  },

  created() {
    this.generateMonths()
    this.generateYears()
    this.updateDays()
  },
  watch: {
    selectedDate(newDate) {
      const date = dayjs(newDate)

      this.selectedDay = date.date()
      this.selectedMonth = date.month()
      this.selectedYear = date.year()
      this.updateDays()
      this.generateMonths()
      this.generateYears()
      this.$nextTick(() => {
        this.scrollToSelected()
        this.centerSelectedItem()
      })
    },
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
    sendModelValue() {
      this.$emit('update:modelValue', this.selectedDate)
    },
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

      const startYear = parseInt(this.minDate.split('-')[0], 10)
      const endYear = parseInt(this.maxDate.split('-')[0], 10)

      years.push(null, null, null) // Empty slots for padding

      for (let i = startYear; i <= endYear; i++) {
        years.push(i)
      }

      years.push(null, null, null) // Empty slots for padding

      this.years = years

      // Ensure that selectedYear is within the range of years generated
      if (this.selectedYear < startYear) {
        this.selectedYear = startYear
      } else if (this.selectedYear > endYear) {
        this.selectedYear = endYear
      }
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

        containers.forEach((container, containerIndex) => {
          // Kontrol: Container mevcut mu ve çocuk elemanları var mı?
          if (container && container.children && container.children.length > 0) {
            const items = Array.from(container.children) as HTMLElement[]

            items.forEach((item, index) => {
              const style = this.getRotationStyle(index, this.selectedIndex[containerIndex])
              if (style) {
                Object.assign(item.style, style)
              }
            })
          } else {
            console.warn('Container is missing or has no children:', containerIndex)
          }
        })
      })
    },
    getRotationStyle(index: number, selectedIndex: number) {
      const totalItems = 7 // Görünür olan toplam öğe sayısı
      const middleIndex = Math.ceil(totalItems / 2)
      const maxRotation = 72 // Maksimum döndürme açısı
      const rotationStep = maxRotation / (middleIndex - 1)

      const position = index - selectedIndex + middleIndex

      let angle = (position - middleIndex) * rotationStep

      if (angle < -maxRotation) angle = -maxRotation
      if (angle > maxRotation) angle = maxRotation

      return {
        transform: `rotateX(${angle}deg)`
        //opacity: position === middleIndex + 1 ? 1 : 0.7
      }
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
            this.selectedMonth = this.months.indexOf(centeredText) - 3
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
      let formattedDate = dayjs()
        .year(this.selectedYear)
        .month(this.selectedMonth)
        .date(this.selectedDay)
        .format('YYYY-MM-DD')

      if (formattedDate < this.minDate) {
        formattedDate = this.minDate
      }
      if (formattedDate > this.maxDate) {
        formattedDate = this.maxDate
      }
      this.$emit('emitSelectedDate', formattedDate)
    },
    onScroll() {
      if (this.isDragging) return

      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout)
      }

      this.scrollTimeout = setTimeout(() => {
        this.selectCenteredItem()
      }, 100)
    },

    scrollToSelected() {
      const dayContainer = this.$refs.dayContainer as HTMLElement
      const monthContainer = this.$refs.monthContainer as HTMLElement
      const yearContainer = this.$refs.yearContainer as HTMLElement

      this.$nextTick(() => {
        const dayElement = dayContainer.children[this.selectedDay + 2] as HTMLElement
        const monthElement = monthContainer.children[this.selectedMonth + 3] as HTMLElement
        const yearIndex = this.years.indexOf(this.selectedYear)

        // Ensure the index is within bounds for the year container
        if (yearIndex >= 0 && yearIndex < yearContainer.children.length) {
          const yearElement = yearContainer.children[yearIndex] as HTMLElement

          // Calculate scroll positions
          dayContainer.scrollTop =
            dayElement.offsetTop - dayContainer.clientHeight / 2 + dayElement.clientHeight / 2
          monthContainer.scrollTop =
            monthElement.offsetTop - monthContainer.clientHeight / 2 + monthElement.clientHeight / 2
          yearContainer.scrollTop =
            yearElement.offsetTop - yearContainer.clientHeight / 2 + yearElement.clientHeight / 2

          if (yearContainer.scrollTop < 0) {
            yearContainer.scrollTop = 0
          } else if (
            yearContainer.scrollTop >
            yearContainer.scrollHeight - yearContainer.clientHeight
          ) {
            yearContainer.scrollTop = yearContainer.scrollHeight - yearContainer.clientHeight
          }
        } else {
          console.warn('Year index out of bounds:', yearIndex)
        }
      })
    }
  },
  mounted() {
    this.$refs.dayContainer.addEventListener('scroll', this.onScroll)
    this.$refs.monthContainer.addEventListener('scroll', this.onScroll)
    this.$refs.yearContainer.addEventListener('scroll', this.onScroll)
    this.$nextTick(() => {
      this.scrollToSelected() // Scroll to the selected item
      this.centerSelectedItem()
    })
  },
  beforeUnmount() {
    this.$refs.dayContainer.removeEventListener('scroll', this.onScroll)
    this.$refs.monthContainer.removeEventListener('scroll', this.onScroll)
    this.$refs.yearContainer.removeEventListener('scroll', this.onScroll)
  },
  updated() {
    this.$nextTick(() => {
      this.scrollToSelected() // Ensure scroll position after updates
    })
  }
}
</script>

<style lang="scss" scoped>
.ui-slider-date-picker-c {
  display: grid;
  grid-template-columns: 1fr 3fr 1.5fr;
  height: calc(11rem + 25px);
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  gap: 16px;
  position: relative;
  perspective: 1000px;

  .center-overlay {
    position: absolute;
    top: 42%;
    left: 3%;
    width: 96%;
    height: 1.75rem;
    border-radius: 10px;
    background: #ececec;
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
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
    opacity: 0.5;
    min-height: 1.25rem;
    line-height: 1.25rem;
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
