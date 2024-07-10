<template>
  <div class="button-c">
    <UIButton className="" text="Home" :isSpinnerActive="loadingStates.default.isLoading"
      :isDisabled="loadingStates.default.isDisabled" @click="setLoadingState('flight')" :isRouter="true"
      routerUrl="/" />
    <UIButton className="flight" text="Flight Button" :icon="'arrow-right'"
      :isSpinnerActive="loadingStates.flight.isLoading" :isDisabled="loadingStates.flight.isDisabled"
      @click="setLoadingState('flight')" />
    <UIButton className="hotel" text="Hotel Button" :isSpinnerActive="loadingStates.hotel.isLoading"
      :isDisabled="loadingStates.hotel.isDisabled" @click="setLoadingState('hotel')" />

    <UIButton className="reisetech-btn" text="Default Button" :isSpinnerActive="loadingStates.default.isLoading"
      :isDisabled="loadingStates.default.isDisabled" @click="setLoadingState('default')" />

    <UIButton className="flight outline" text="Flight Outline Button"
      :isSpinnerActive="loadingStates.flightOutline.isLoading" :isDisabled="loadingStates.flightOutline.isDisabled"
      @click="setLoadingState('flightOutline')" />

    <UIButton className="hotel outline" text="Hotel Outline Button"
      :isSpinnerActive="loadingStates.hotelOutline.isLoading" :isDisabled="loadingStates.hotelOutline.isDisabled"
      @click="setLoadingState('hotelOutline')" />

    <UIButton className="disabled" text="Disabled Button" :isSpinnerActive="loadingStates.disabledButton.isLoading"
      :isDisabled="loadingStates.disabledButton.isDisabled" @click="setLoadingState('disabledButton')" />
  </div>
</template>

<script lang="ts">
import UIButton from '../components/UIButton.vue'

export default {
  name: 'PowerPuffGirls',
  components: {
    UIButton
  },
  data() {
    return {
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
}
</script>

<style lang="scss" scoped>
.button-c {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>