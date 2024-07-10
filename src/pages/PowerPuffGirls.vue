<template>
  <div class="button-c">
    <!--  UIButton:
     - className: Optional class name
     - text: Button text
     - :isSpinnerActive: Binds the button's loading spinner activity to the loading state of the data used (e.g. flight)
     - :isDisabled: Binds the button's disabled state to the loading state of the data used (e.g. flight)
     - @click: Sets the loading state of the button that passed to setLoadingState when it is clicked
     - :isRouter: Indicates that this button uses router navigation
     - routerUrl: URL to navigate to when the button is clicked
   -->

    <UIButton className="" text="Home" :isSpinnerActive="loadingStates.home.isLoading"
      :isDisabled="loadingStates.home.isDisabled" @click="setLoadingState('home')" :isRouter="true" routerUrl="/" />
    <UIButton className="flight" text="Flight Button - default (medium) icon" :icon="'refresh'"
      :isSpinnerActive="loadingStates.flight.isLoading" :isDisabled="loadingStates.flight.isDisabled"
      @click="setLoadingState('flight')" />
    <UIButton className="hotel" text="Hotel Button - small icon" :icon="'refresh'" :iconSize="'s'"
      :isSpinnerActive="loadingStates.hotel.isLoading" :isDisabled="loadingStates.hotel.isDisabled"
      @click="setLoadingState('hotel')" />

    <UIButton className="reisetech-btn" text="Default Button - large icon" :icon="'refresh'" :iconSize="'l'"
      :isSpinnerActive="loadingStates.default.isLoading" :isDisabled="loadingStates.default.isDisabled"
      @click="setLoadingState('default')" />

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
      // Defining the initial loading and disabled states for different buttons
      loadingStates: {
        home: { isLoading: false, isDisabled: false }, // Initial state for home button
        flight: { isLoading: false, isDisabled: false },
        hotel: { isLoading: false, isDisabled: false },
        default: { isLoading: false, isDisabled: false },
        flightOutline: { isLoading: false, isDisabled: false },
        hotelOutline: { isLoading: false, isDisabled: false },
        disabledButton: { isLoading: false, isDisabled: true } // This button is disabled so its isDisabled property is initially true
      }
    }
  },
  methods: {
    // Method to set the loading state of a button and reset it after 2 seconds
    setLoadingState(buttonName: string) {
      // Set the isLoading property to true for the specified button
      this.loadingStates[buttonName].isLoading = true
      // After 2 seconds, reset the isLoading property to false
      setTimeout(() => {
        this.loadingStates[buttonName].isLoading = false
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
//Style to add gap between buttons
.button-c {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
