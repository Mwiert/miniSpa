<template>
  <div class="button-grid-c">
    
    <UIButton
      className="flight"
      text="Timebenders"
      :isSpinnerActive="loadingStates.flight.isLoading"
      :isDisabled="loadingStates.flight.isDisabled"
      @click="setLoadingState('flight')"
      :isRouter="true"
      routerUrl="/timebenders"
    />

    <UIButton
      className="flight"
       text="PowerPuffGirls"
      :isSpinnerActive="loadingStates.flight2.isLoading"
      :isDisabled="loadingStates.flight2.isDisabled"
      @click="setLoadingState('flight2')"
      :isRouter="true"
      routerUrl="/powerpuffgirls"
    />

    <UIButton
      className="hotel"
      text="SummerLovers"
      :isSpinnerActive="loadingStates.hotel.isLoading"
      :isDisabled="loadingStates.hotel.isDisabled"
      @click="setLoadingState('hotel')"
      :isRouter="true"
      routerUrl="/summerLovers"
    />

    <UIButton
      className="reisetech-btn"
      text="PinkPanthers"
      :isSpinnerActive="loadingStates.default.isLoading"
      :isDisabled="loadingStates.default.isDisabled"
      @click="setLoadingState('default')"
      :isRouter="true"
      routerUrl="/pinkpanthers"
    />
  </div>
</template>

<script lang="ts">
import UIButton from '../components/UIButton.vue'
export default {
  name: 'HomeView',
  components:{
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
.button-grid-c{
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 10px;
}
</style>

