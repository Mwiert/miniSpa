<template>
  <div class="ui-slider-date-picker-c">
    <div class="center-overlay"></div>

    <div class="day" @mousedown="startDrag($event)" ref="dayContainer">
      <span
        v-for="(day, index) in loopedDays"
        :key="index"
        :class="{ selected: day === selectedDay }"
        :style="getRotationStyle(day, selectedDay)">
        {{ day }}
      </span>
    </div>

    <div class="month" @mousedown="startDrag($event)" ref="monthContainer">
      <span
        v-for="(month, index) in loopedMonths"
        :key="month"
        :class="{ selected: (index % 12) + 1 === selectedMonth }"
        :style="getRotationStyle((index % 12) + 1, selectedMonth)">
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
  name: 'UISliderDatePicker',
  data() {
    return {
      days: [] as number[],
      months: [] as string[],
      years: [] as number[],
      selectedDay: dayjs(this.selectedDate.day).date(),
      selectedMonth: dayjs(this.selectedDate.month).month(),
      selectedYear: dayjs(this.selectedDate.year).year(),
      scrolling: false,
      scrollTimeout: null as number | null,
      lastScrollTop: 0,
      isDragging: false
    }
  },
  props: {
    selectedDate: { type: Object, default: null }
  },
  computed: {
    loopedDays() {
      return [...this.days, ...this.days, ...this.days]
    },
    loopedMonths() {
      return [...this.months, ...this.months, ...this.months]
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
      // console.log(this.selectedDay)
      // console.log(this.selectedMonth)
      // console.log(this.selectedYear)
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(i)
      }
      this.days = days
      if (this.selectedDay > daysInMonth) {
        this.selectedDay = daysInMonth
      }
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
          const items = Array.from(container.children) as HTMLElement[]
          items.forEach((item, index) => {
            const style = this.getRotationStyle(index, this.selectedIndex[containerIndex])
            Object.assign(item.style, style)
          })
        })
      })
    },
    getRotationStyle(index: number, selectedIndex: number) {
      const totalItems = 7 // Görünür olan toplam öğe sayısı
      const middleIndex = Math.ceil(totalItems / 2) // Orta öğenin indeksi
      const maxRotation = 72 // Maksimum döndürme açısı
      const rotationStep = maxRotation / (middleIndex - 1) // Döndürme adımı

      const position = index - selectedIndex + middleIndex

      let angle = (position - middleIndex) * rotationStep

      if (angle < -maxRotation) angle = -maxRotation
      if (angle > maxRotation) angle = maxRotation

      return {
        transform: `rotateX(${angle}deg)`,
        opacity: position === middleIndex ? 1 : 0.7
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
            this.selectedMonth = this.months.indexOf(centeredText) + 1
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(9 * 1.5rem + 2 * 16px);
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  background-color: white;
  perspective: 900px;
  border-radius: 10px;

  .center-overlay {
    position: absolute;
    top: 43%;
    left: 5%;
    width: 90%;
    height: 2rem;
    border-radius: 8px;
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
    scroll-behavior: smooth;
    user-select: none;
    transform-style: preserve-3d;
    perspective: 900px;

    &::-webkit-scrollbar {
      width: 0;
      background: transparent;
    }
  }

  .month {
    margin-top: 15px;
  }

  .day span,
  .month span,
  .year span {
    padding: 4px 8px;
    cursor: pointer;
    scroll-snap-align: center;
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
    opacity: 0.5;
    min-height: 1.5rem;
    line-height: 1.5rem;
    transform-origin: center;
  }

  .day span.selected,
  .month span.selected,
  .year span.selected {
    font-weight: 500;
    transform: scale(1.2) rotateX(0deg);
    opacity: 1;
    margin: 2px 0px;
  }
}
</style>
