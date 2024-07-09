<template>
  <div class="button-c">
    <UIButton
      className="flight"
      text="Flight Button"
      :isSpinnerActive="loadingStates.flight"
      :isDisabled="loadingStates.flight"
      @click="setLoadingState('flight')"
    />
    <UIButton
      className="hotel"
      text="Hotel Button"
      :isSpinnerActive="loadingStates.hotel"
      :isDisabled="loadingStates.hotel"
      @click="setLoadingState('hotel')"
    />
    <UIButton
      className="reisetech-btn"
      text="Default Button"
      :isSpinnerActive="loadingStates.default"
      :isDisabled="loadingStates.default"
      @click="setLoadingState('default')"
    />
    <UIButton
      className="flight outline"
      text="Flight Outline Button"
      :isSpinnerActive="loadingStates.flightOutline"
      :isDisabled="loadingStates.flightOutline"
      @click="setLoadingState('flightOutline')"
    />
    <UIButton
      className="hotel outline"
      text="Hotel Outline Button"
      :isSpinnerActive="loadingStates.hotelOutline"
      :isDisabled="loadingStates.hotelOutline"
      @click="setLoadingState('hotelOutline')"
      :isRouter="true"
      routerUrl="/"
    />
    <UIButton
      className="disabled"
      text="Disabled Button"
      :isSpinnerActive="loadingStates.disableButton"
      :isDisabled="loadingStates.disableButton"
      @click="setLoadingState('disabledButton')"
    />
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
        flight: false,
        hotel: false,
        default: false,
        flightOutline: false,
        hotelOutline: false,
        disabledButton: true
      }
    }
  },
  methods: {
    setLoadingState(buttonName: string) {
      this.loadingStates[buttonName] = true
      setTimeout(() => {
        this.loadingStates[buttonName] = false
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
