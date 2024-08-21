<template>
  <div class="ui-slider-date-picker-c">
    <div class="center-overlay"></div>
    <div class="hour" @mousedown="startDrag($event)" ref="hourContainer">
      <span
        v-for="hour in hours"
        :key="hour"
        :class="{ selected: hour === selectedHour }"
        :style="getRotationStyle(hour, selectedHour)">
        {{ hour }}
      </span>
    </div>
    <div class="separator">:</div>
    <div class="minute" @mousedown="startDrag($event)" ref="minuteContainer">
      <span
        v-for="minute in minutes"
        :key="minute"
        :class="{ selected: minute === selectedMinute }"
        :style="getRotationStyle(minute, selectedMinute)">
        {{ minute }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'

export default {
  name: 'UISingleTimePicker',
  data() {
    return {
      hours: [] as number[],
      minutes: [] as number[],

      selectedHour: dayjs().hour(),
      selectedMinute: Math.ceil(dayjs().minute() / this.minuteRange) * this.minuteRange,

      scrolling: false,
      scrollTimeout: null as number | null,
      isDragging: false,
      selectedIndex: []
    }
  },

  props: {
    selectedTime: { type: String, default: null },
    minuteRange: { type: Number, default: 5 }
  },
  methods: {
    generateHours() {
      const hours: number[] = []

      // Add placeholders (null) for spacing
      hours.push(null, null)

      // Generate hours using dayjs
      for (let i = 0; i < 24; i++) {
        hours.push(dayjs().hour(i).hour()) // Get hour from 0 to 23
      }

      // Add placeholders (null) for spacing
      hours.push(null, null)

      this.hours = hours
    },

    generateMinutes() {
      const minutes: number[] = []

      // Add placeholders (null) for spacing
      minutes.push(null, null)

      // Generate minutes using dayjs and minuteRange
      for (let i = 0; i < 60; i += this.minuteRange) {
        minutes.push(dayjs().minute(i).minute()) // Get minute with the given range
      }

      // Add placeholders (null) for spacing
      minutes.push(null, null)

      this.minutes = minutes
    },
    emitSelectedTime() {
      const timeString = `${String(this.selectedHour).padStart(2, '0')}:${String(this.selectedMinute).padStart(2, '0')}`

      this.$emit('emitSelectedTime', timeString)
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
        const containers = [this.$refs.hourContainer, this.$refs.minuteContainer]

        containers.forEach((container, containerIndex) => {
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
      const totalItems = 5 // Görünür olan toplam öğe sayısı
      const middleIndex = Math.floor(totalItems / 2)
      const maxRotation = 60 // Maksimum döndürme açısı
      const rotationStep = maxRotation / (middleIndex - 1)

      const position = index - selectedIndex + middleIndex

      let angle = (position - middleIndex) * rotationStep

      if (angle < -maxRotation) angle = -maxRotation
      if (angle > maxRotation) angle = maxRotation

      return {
        transform: `rotateX(${angle}deg)`
      }
    },
    selectCenteredItem() {
      if (this.scrolling) return

      const hourContainer = this.$refs.hourContainer as HTMLElement
      const minuteContainer = this.$refs.minuteContainer as HTMLElement

      const centerItem = (container: HTMLElement, type: 'hour' | 'minute') => {
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
          if (type === 'hour' && centeredText) {
            this.selectedHour = parseInt(centeredText, 10)
          } else if (type === 'minute' && centeredText) {
            this.selectedMinute = parseInt(centeredText, 10)
          }
        }
      }

      centerItem(hourContainer, 'hour')
      centerItem(minuteContainer, 'minute')
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
      const hourContainer = this.$refs.hourContainer as HTMLElement
      const minuteContainer = this.$refs.minuteContainer as HTMLElement

      this.$nextTick(() => {
        if (hourContainer && hourContainer.children.length > 0) {
          const hourIndex = this.selectedHour + 2 // 3 placeholder olduğu için
          const hourElement = hourContainer.children[hourIndex] as HTMLElement

          if (hourElement) {
            hourContainer.scrollTop =
              hourElement.offsetTop - hourContainer.clientHeight / 2 + hourElement.clientHeight / 2
          }
        }

        if (minuteContainer && minuteContainer.children.length > 0) {
          const minuteIndex = this.selectedMinute / this.minuteRange + 2 // 3 placeholder olduğu için
          const minuteElement = minuteContainer.children[minuteIndex] as HTMLElement

          if (minuteElement) {
            minuteContainer.scrollTop =
              minuteElement.offsetTop -
              minuteContainer.clientHeight / 2 +
              minuteElement.clientHeight / 2
          }
        }
      })
    }
  },
  mounted() {
    this.$refs.hourContainer.addEventListener('scroll', this.onScroll)
    this.$refs.minuteContainer.addEventListener('scroll', this.onScroll)
    this.$nextTick(() => {
      this.scrollToSelected() // Scroll to the selected item
      this.centerSelectedItem()
    })
  },
  beforeUnmount() {
    this.$refs.hourContainer.removeEventListener('scroll', this.onScroll)
    this.$refs.minuteContainer.removeEventListener('scroll', this.onScroll)
  },
  updated() {
    this.$nextTick(() => {
      this.scrollToSelected() // Ensure scroll position after updates
    })
  },
  watch: {
    selectedHour() {
      this.centerSelectedItem()
      this.emitSelectedTime()
    },
    selectedMinute() {
      this.centerSelectedItem()
      this.emitSelectedTime()
    }
  },
  created() {
    this.generateHours()
    this.generateMinutes()
  }
}
</script>
<style lang="scss" scoped>
.ui-slider-date-picker-c {
  display: grid;
  grid-template-columns: 1fr 0.5px 1fr; /* Orta kolon için otomatik genişlik */
  height: calc(9rem + 16px);
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  gap: 16px;
  position: relative;
  background-color: #ffffff;
  perspective: 1000px;
  border-radius: 10px;

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 40px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #ffffff;
  }

  .center-overlay {
    position: absolute;
    top: 36%;
    left: 3%;
    width: 96%;
    height: 1.75rem;
    border-radius: 10px;
    background: #dddcdc;
    pointer-events: none;
  }

  .hour,
  .minute {
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

  .hour span,
  .minute span {
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

  .hour span.selected,
  .minute span.selected {
    font-weight: 500;
    transform: scale(1.2) rotateX(0deg);
    opacity: 1;
  }

  .separator {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    height: fit-content;
    top: 36%;

    font-size: 1.25rem;
    color: #000;
    z-index: 1000;
  }
}
</style>
