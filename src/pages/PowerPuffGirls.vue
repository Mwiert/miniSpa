<template>
  <div class="button-c">
    <!-- UIButton instances as previously defined -->

    <UIButton
      className=""
      text="Home"
      :isSpinnerActive="loadingStates.home.isLoading"
      :isDisabled="loadingStates.home.isDisabled"
      @click="setLoadingState('home')"
      :isRouter="true"
      routerUrl="/"
    />
    <UIButton
      className="flight"
      text="Flight"
      :icon="'refresh'"
      :isSpinnerActive="loadingStates.flight.isLoading"
      :isDisabled="loadingStates.flight.isDisabled"
      @click="setLoadingState('flight')"
    />
    <UIButton
      className="hotel"
      text="Hotel"
      :icon="'refresh'"
      :iconSize="'s'"
      :isSpinnerActive="loadingStates.hotel.isLoading"
      :isDisabled="loadingStates.hotel.isDisabled"
      @click="setLoadingState('hotel')"
    />

    <!-- Since the class name is not added, the default class will be used. -->
    <UIButton
      text="PowerPuffGirls"
      :icon="'refresh'"
      :iconSize="'l'"
      :isSpinnerActive="loadingStates.default.isLoading"
      :isDisabled="loadingStates.default.isDisabled"
      @click="setLoadingState('default')"
    />

    <UIButton
      className="flight outline"
      text="Flight"
      :isSpinnerActive="loadingStates.flightOutline.isLoading"
      :icon="'refresh'"
      :isDisabled="loadingStates.flightOutline.isDisabled"
      @click="setLoadingState('flightOutline')"
    />

    <UIButton
      className="hotel outline"
      text="Hotel"
      :isSpinnerActive="loadingStates.hotelOutline.isLoading"
      :isDisabled="loadingStates.hotelOutline.isDisabled"
      @click="setLoadingState('hotelOutline')"
    />

    <UIButton
      className="disabled"
      text="Disabled"
      :isSpinnerActive="loadingStates.disabledButton.isLoading"
      :isDisabled="loadingStates.disabledButton.isDisabled"
      @click="setLoadingState('disabledButton')"
    />

    <!-- Add UIToggle component -->
    <div>
      <UIToggle
        :id="'toggle1'"
        :label="'Toggle'"
        :checked="toggleState.checked"
        :disabled="toggleState.disabled"
        @update:checked="toggleChange"
      />
    </div>

    <div class="hotel-radio-buttons">
      <UIRadioButton
        v-for="radio in radioButtonsHotel"
        :key="radio.label"
        :className="'hotel'"
        :label="radio.label"
        :value="radio.value"
        v-model="pickedRadioHotel"
      />
    </div>
    <div class="flight-radio-buttons">
      <UIRadioButton
        v-for="radio in radioButtonsFlight"
        :key="radio.label"
        :className="'flight'"
        :label="radio.label"
        :value="radio.value"
        :after="true"
        v-model="pickedRadioFlight"
      />
    </div>

    <UICheckbox
      :label="'Disabled'"
      :className="'hotel'"
      :after="false"
      :disabled="true"
      :name="'disabled'"
      :id="'deneme'"
    />
    <UICheckbox
      :label="'Disabled After'"
      :className="'hotel'"
      :after="true"
      :disabled="true"
      :name="'disabled'"
      :id="'deneme2'"
    />
    <UICheckbox
      :label="'Hotel'"
      :className="'hotel'"
      :after="true"
      :name="'hotel'"
      :id="'hotel_1'"
      @takeCheckedInfo="takeCheckedInfo"
    />
    <UICheckbox
      :label="'Flight'"
      :className="'flight'"
      :name="'flight'"
      :id="'flight_1'"
      @takeCheckedInfo="takeCheckedInfo"
    />
  </div>
</template>

<script lang="ts">
import UIButton from '../components/UIButton.vue'
import UIToggle from '../components/UIToggle.vue'
import UIRadioButton from '../components/UIRadioButton.vue'
import UICheckbox from '../components/UICheckbox.vue'

export default {
  name: 'PowerPuffGirls',
  components: {
    UIButton,
    UIToggle,
    UIRadioButton,
    UICheckbox
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
      },
      // Initial state for toggle switch
      toggleState: {
        checked: false,
        disabled: false
      },
      pickedRadioHotel: '',
      pickedRadioFlight: '',
      radioButtonsHotel: [
        { label: 'Radio 1', value: 'radio1' },
        { label: 'Radio 2', value: 'radio2' },
        { label: 'Radio 3', value: 'radio3' }
      ],
      radioButtonsFlight: [
        { label: 'Radio 1', value: 'radio1' },
        { label: 'Radio 2', value: 'radio2' },
        { label: 'Radio 3', value: 'radio3' }
      ]
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
    },
    // Method to handle toggle state change
    toggleChange(newChecked) {
      this.toggleState.checked = newChecked
    },
    takeCheckedInfo(info) {
      console.log(info)
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
.hotel-radio-buttons {
  display: flex;
  justify-content: center;
  flex-direction: row;
}
.flight-radio-buttons {
  display: flex;
  justify-content: center;
  flex-direction: row;
}
</style>
