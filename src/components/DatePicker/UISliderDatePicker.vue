<template>
  <div class="datepicker-container">
    <div
      class="picker-column"
      @mousedown="startDrag('days')"
      @mousemove="onDrag('days')"
      @mouseup="endDrag('days')"
      @mouseleave="endDrag('days')"
      @scroll="handleScroll('days')"
      ref="days">
      <ul>
        <li
          v-for="(day, index) in loopedDays"
          :key="index"
          :class="{ active: day - 1 === selectedDayIndex }">
          {{ day }}
        </li>
      </ul>
    </div>

    <div
      class="picker-column"
      @mousedown="startDrag('months')"
      @mousemove="onDrag('months')"
      @mouseup="endDrag('months')"
      @mouseleave="endDrag('months')"
      @scroll="handleScroll('months')"
      ref="months">
      <ul>
        <li
          v-for="(month, index) in loopedMonths"
          :key="index"
          :class="{ active: (index % 13) + 1 === selectedMonthIndex }">
          {{ month }}
        </li>
      </ul>
    </div>
    <div
      class="picker-column"
      @mousedown="startDrag('years')"
      @mousemove="onDrag('years')"
      @mouseup="endDrag('years')"
      @mouseleave="endDrag('years')"
      @scroll="handleScroll('years')"
      ref="years">
      <ul>
        <li
          v-for="(year, index) in years"
          :key="index"
          :class="{ active: index === selectedYearIndex }">
          {{ year }}
        </li>
      </ul>
    </div>
    <div class="highlight-overlay"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: Array.from({ length: 31 }, (v, k) => k + 1),
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
      years: Array.from({ length: 100 }, (v, k) => new Date().getFullYear() - k),
      selectedDayIndex: new Date().getDate(),
      selectedMonthIndex: new Date().getMonth(),
      selectedYearIndex: 0,
      dragging: false,
      lastY: 0,
      scrollTimeout: null
    }
  },
  computed: {
    loopedDays() {
      return [...this.days, ...this.days, ...this.days]
    },
    loopedMonths() {
      return [...this.months, ...this.months, ...this.months]
    }
  },
  mounted() {
    this.scrollToDefault()
  },
  methods: {
    scrollToDefault() {
      this.$refs.days.scrollTop = (this.selectedDayIndex + this.days.length) * 44
      this.$refs.months.scrollTop = (this.selectedMonthIndex + this.months.length) * 44
      this.$refs.years.scrollTop = this.selectedYearIndex * 44
    },
    handleScroll(type) {
      clearTimeout(this.scrollTimeout)

      const maxScrollTop = this[type === 'days' ? 'loopedDays' : 'loopedMonths'].length * 44
      if (
        this.$refs[type].scrollTop >=
        maxScrollTop - 44 * this[type === 'days' ? 'days' : 'months'].length
      ) {
        this.$refs[type].scrollTop = 44 * this[type === 'days' ? 'days' : 'months'].length
      } else if (this.$refs[type].scrollTop <= 0) {
        this.$refs[type].scrollTop =
          maxScrollTop - 44 * this[type === 'days' ? 'days' : 'months'].length * 2
      }

      this.scrollTimeout = setTimeout(() => {
        let scrollTop = this.$refs[type].scrollTop
        let index = Math.round(
          (scrollTop % (this[type === 'days' ? 'days' : 'months'].length * 44)) / 44
        )

        if (type === 'days') {
          this.selectedDayIndex = index
        } else if (type === 'months') {
          this.selectedMonthIndex = index
        }

        this.$refs[type].scrollTo({
          top: index * 44 + this[type === 'days' ? 'days' : 'months'].length * 44,
          behavior: 'smooth'
        })
      }, 100)
    },
    startDrag(type) {
      this.dragging = true
      this.lastY = event.clientY
      clearTimeout(this.scrollTimeout) // Drag sırasında kaydırma hizalamayı durdur
    },
    onDrag(type) {
      if (this.dragging) {
        const deltaY = event.clientY - this.lastY
        this.$refs[type].scrollTop -= deltaY
        this.lastY = event.clientY
      }
    },
    endDrag() {
      this.dragging = false
      this.handleScroll('days') // Bırakıldığında otomatik hizalama
      this.handleScroll('months')
      this.handleScroll('years')
    }
  }
}
</script>

<style scoped>
.datepicker-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  perspective: 1000px;
  background-color: white;

  .picker-column {
    width: 33.33%;
    height: 100%;
    overflow-y: scroll;
    text-align: center;
    scrollbar-width: none; /* Firefox */
  }

  .picker-column::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    padding-top: 80px;
    padding-bottom: 80px;
  }

  li {
    height: 44px;
    line-height: 44px;
    font-size: 20px;
    transition:
      transform 0.2s,
      opacity 0.2s;
    transform-origin: center center;
    opacity: 0.5;
  }

  li.active {
    font-size: 24px;
    opacity: 1;
    transform: rotateX(0deg) translateY(0);
  }
  li :not(.active) {
    transform: rotateX(30deg) translateY(-10px);
    opacity: 0.3;
  }
  li:nth-child(1),
  li:nth-child(2),
  li:nth-child(3) {
    transform: rotateX(30deg) translateY(-10px);
    opacity: 0.3;
  }

  li:nth-last-child(1),
  li:nth-last-child(2),
  li:nth-last-child(3) {
    transform: rotateX(-30deg) translateY(10px);
    opacity: 0.3;
  }

  .highlight-overlay {
    position: absolute;
    top: 50%;
    width: 90%;
    transform: translateY(-50%);
    background-color: rgba(200, 200, 200, 0.3);
    pointer-events: none;
    left: 5%;
    height: 40px;
    border-radius: 10px;
  }
}
</style>
