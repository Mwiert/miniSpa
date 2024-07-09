<template>
  <div class="button-c">
    <UIButton
      className="flight"
      text="Flight Button"
      :icon="flightIcon"
      :isSpinnerActive="loadingStates.flight.isLoading"
      :isDisabled="loadingStates.flight.isDisabled"
      @click="setLoadingState('flight')"
    />

    <UIButton
      className="flight"
      :icon="flightIcon"
      :isSpinnerActive="loadingStates.flight2.isLoading"
      :isDisabled="loadingStates.flight2.isDisabled"
      @click="setLoadingState('flight2')"
    />

    <UIButton
      className="hotel"
      text="Hotel Button"
      :isSpinnerActive="loadingStates.hotel.isLoading"
      :isDisabled="loadingStates.hotel.isDisabled"
      @click="setLoadingState('hotel')"
    />

    <UIButton
      className="reisetech-btn"
      text="Default Button"
      :isSpinnerActive="loadingStates.default.isLoading"
      :isDisabled="loadingStates.default.isDisabled"
      @click="setLoadingState('default')"
    />

    <UIButton
      className="flight outline"
      text="Flight Outline Button"
      :isSpinnerActive="loadingStates.flightOutline.isLoading"
      :isDisabled="loadingStates.flightOutline.isDisabled"
      @click="setLoadingState('flightOutline')"
    />

    <UIButton
      className="hotel outline"
      text="Hotel Outline Button"
      :isSpinnerActive="loadingStates.hotelOutline.isLoading"
      :isDisabled="loadingStates.hotelOutline.isDisabled"
      @click="setLoadingState('hotelOutline')"
      :isRouter="true"
      routerUrl="/"
    />

    <UIButton
      className="disabled"
      text="Disabled Button"
      :isSpinnerActive="loadingStates.disabledButton.isLoading"
      :isDisabled="loadingStates.disabledButton.isDisabled"
      @click="setLoadingState('disabledButton')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UIButton from '../components/UIButton.vue'
import flightIcon from '../assets/images/flight.png'

export default defineComponent({
  name: 'PowerPuffGirls',
  components: {
    UIButton
  },
  data() {
    return {
      flightIcon,
      loadingStates: {
        flight: { isLoading: false, isDisabled: false },
        flight2: { isLoading: false, isDisabled: false },
        hotel: { isLoading: false, isDisabled: false },
        default: { isLoading: false, isDisabled: false },
        flightOutline: { isLoading: false, isDisabled: false },
        hotelOutline: { isLoading: false, isDisabled: false },
        disabledButton: { isLoading: false, isDisabled: true }
      }
    }
  },
  methods: {
    setLoadingState(buttonName: string) {
      this.loadingStates[buttonName].isLoading = true
      setTimeout(() => {
        this.loadingStates[buttonName].isLoading = false
      }, 2000)
    }
  }
})
</script>

<style lang="scss" scoped>
.button-c {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
