<template>
    <div>
    <MenuDropdown :items="items" label="Team Pages">
        <template #labelSlot>
          <SvgIcon name="eye" />
        </template>
      </MenuDropdown>
      <MenuDropdown :items="items" directRight>
        <template #labelSlot>
          <SvgIcon name="eye" />
        </template>
      </MenuDropdown>
  </div>
  <div class="button-grid-container">
    <div class="button-grid">
      <!-- Icon's name should be the name of the .svg file-->
      <UIButton
        className="time-benders"
        text="Timebenders"
        :icon="'search'"
        :isSpinnerActive="loadingStates.flight.isLoading"
        :isDisabled="loadingStates.flight.isDisabled"
        @click="setLoadingState('flight')"
        :isRouter="true"
        routerUrl="/timebenders" />

      <UIButton
        className="powerpuff-girls"
        text="PowerPuffGirls"
        :icon="'arrow-right'"
        :isSpinnerActive="loadingStates.flight2.isLoading"
        :isDisabled="loadingStates.flight2.isDisabled"
        @click="setLoadingState('flight2')"
        :isRouter="true"
        routerUrl="/powerpuffgirls" />

      <UIButton
        className="summer-lovers"
        text="SummerLovers"
        :icon="'arrow-selector-h'"
        :isSpinnerActive="loadingStates.hotel.isLoading"
        :isDisabled="loadingStates.hotel.isDisabled"
        @click="setLoadingState('hotel')"
        :isRouter="true"
        routerUrl="/summerLovers" />

      <UIButton
        className="pink-panthers"
        text="PinkPanthers"
        :icon="'x'"
        :isSpinnerActive="loadingStates.default.isLoading"
        :isDisabled="loadingStates.default.isDisabled"
        @click="setLoadingState('default')"
        :isRouter="true"
        routerUrl="/pinkpanthers" />

    </div>

  </div>

</template>

<script lang="ts">
import UIButton from '../components/UIButton.vue'
import MenuDropdown from '../components/Dropdown/MenuDropdown.vue'
export default {
  name: 'HomeView',
  components: {
    UIButton,
    MenuDropdown
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
      },
      items: [
        {
          name: 'Timebenders',
          iconImage: 'search',
          action: () => {
            window.location.assign('/timebenders')
          }
        },
        {
          name: 'PowerPuffGirls',
          iconImage: 'arrow-right',
          action: () => {
            window.location.assign('/powerpuffgirls')
          }
        },
        {
          name: 'SummerLovers',
          iconImage: 'arrow-selector-h',
          action: () => {
            window.location.assign('/summerLovers')
          }
        },
        {
          name: 'PinkPanthers',
          iconImage: 'x',
          action: () => {
            window.location.assign('/pinkpanthers')
          }
        }
      ]
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
.button-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 80%;
}

.button-grid-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
</style>
