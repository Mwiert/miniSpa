<template>
  <div class="ui-time-picker-c">
    <div class="button" @click="toggleTimePicker()" ref="dateRangePicker">
      <div class="button-items">
        <i class="icon-rent-a-car-timepicker"> </i>
        <span class="time">{{ selectedTime }} </span>
      </div>
    </div>
    <UISingleTimePicker
      v-show="isTimePickerEnable"
      @emitSelectedTime="handleSelectedTime"
      @closeSlider="closeTimePicker"
      :selectedTime="selectedTime"
      :minuteRange="validateMinutes"
      @click="sendTimeToParent" />
  </div>
</template>

<script>
import UISingleTimePicker from './UISingleTimePicker.vue'

export default {
  name: 'UIDateRangePicker',
  components: {
    UISingleTimePicker
  },
  props: {
    validateMinutes: { type: Number, default: 5 }
  },
  data() {
    return {
      isTimePickerEnable: false,
      selectedTime: ''
    }
  },
  watch: {
    selectedTime() {
      this.sendTimeToParent()
    }
  },
  methods: {
    handleSelectedTime(newTime) {
      this.selectedTime = newTime
    },
    toggleTimePicker() {
      this.isTimePickerEnable = !this.isTimePickerEnable
    },
    closeTimePicker() {
      this.isTimePickerEnable = false
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        setTimeout(() => {
          this.isTimePickerEnable = false
        }, 100)
      }
    },
    sendTimeToParent() {
      this.$emit('update:modelValue', this.selectedTime)
    },
    mounted() {
      document.addEventListener('click', this.handleClickOutside)
    },
    beforeUnmount() {
      document.removeEventListener('click', this.handleClickOutside)
    },
    created() {
      this.sendTimeToParent()
    }
  }
}
</script>

<style>
.ui-time-picker-c {
  user-select: none;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-around;
  align-self: center;
  text-align: center;
  padding: 1rem;
  gap: 0.5rem;
  width: 100px;
  position: relative;

  .button {
    background: #f8f8f8;
    box-shadow: 2px 2px 6px #5858581a;
    border: 1px solid #b6b6b6;

    opacity: 1;
    height: 24px;

    justify-items: center;
    text-align: center;
    text-decoration: none;
    font-size: 14px;
    padding: 10px;
    cursor: pointer;
    border-radius: 12px;

    .button-items {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;

      .time {
        text-align: center;
        padding: 0px 5px;
        font-size: 18px;
        font-weight: 400;
        cursor: pointer;
        margin-left: 2px;
      }
      .icon-rent-a-car-timepicker {
        width: 18px;
        height: 18px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtODMyIC00MDApIj48cGF0aCBkPSJNMCw0Ljc1QS43NS43NSwwLDAsMS0uNzUsNFYwQS43NS43NSwwLDAsMSwwLS43NS43NS43NSwwLDAsMSwuNzUsMFY0QS43NS43NSwwLDAsMSwwLDQuNzVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4NDAgNDA0KSIgZmlsbD0iIzM2MzYzNiIvPjxwYXRoIGQ9Ik0yLDMuNzVhLjc0OS43NDksMCwwLDEtLjYyNS0uMzM0bC0yLTNBLjc1Ljc1LDAsMCwxLS40MTYtLjYyNGEuNzUuNzUsMCwwLDEsMS4wNC4yMDhsMiwzQS43NS43NSwwLDAsMSwyLDMuNzVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4NDAgNDA4KSIgZmlsbD0iIzM2MzYzNiIvPjxwYXRoIGQ9Ik04LDEuNUE2LjUsNi41LDAsMSwwLDE0LjUsOCw2LjUwNyw2LjUwNywwLDAsMCw4LDEuNU04LDBBOCw4LDAsMSwxLDAsOCw4LDgsMCwwLDEsOCwwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoODMyIDQwMCkiIGZpbGw9IiMzNjM2MzYiLz48L2c+PC9zdmc+');
      }
    }
  }
}
</style>
