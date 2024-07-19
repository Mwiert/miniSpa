<template>
  <div class="input-box">
    <UIInput
      :id="'username'"
      :label="'UserName:'"
      :placeholder="'Enter your username'"
      :maxLength="70"
      :minLength="3"
      :iconE="iconNextToText"
    />
  </div>
  <div class="button-c">
    <!-- UIButton component instances -->
    <UIButton
      text="Home"
      :isSpinnerActive="loadingStates.home.isLoading"
      :isDisabled="loadingStates.home.isDisabled"
      @click="setLoadingState('home')"
      routerUrl="/"
    />
    <UIButton
      className="flight"
      text="Flight"
      :icon="'refresh'"
      :size="'small'"
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
      text="Disabled"
      :isSpinnerActive="loadingStates.disabledButton.isLoading"
      :isDisabled="loadingStates.disabledButton.isDisabled"
      @click="setLoadingState('disabledButton')"
    />

    <!-- UIToggle component instances -->
    <div>
      <UIToggle
        :id="'powerpuffGirls'"
        :label="'Powerpuff Girls'"
        :checked="powerpuffGirls.checked"
        :disabled="powerpuffGirls.disabled"
        @switchToggle="toggleChange1"
      />
    </div>

    <div>
      <UIToggle
        :id="'timeBenders'"
        :label="'Time Benders'"
        :checked="timeBenders.checked"
        :disabled="timeBenders.disabled"
        @switchToggle="toggleChange2"
      />
    </div>

    <div>
      <UIToggle
        :id="'summerLovers'"
        :label="'Summer Lovers'"
        :checked="summerLovers.checked"
        :disabled="summerLovers.disabled"
        @switchToggle="toggleChange3"
      />
    </div>

    <div>
      <UIToggle
        :id="'pinkPanthers'"
        :label="'Pink Panthers'"
        :checked="pinkPanthers.checked"
        :disabled="pinkPanthers.disabled"
        @switchToggle="toggleChange4"
      />
    </div>

    <!-- UIRadioButton component instances  -->
    <!--Radio Buttons for hotel-->
    <div class="hotel-radio-buttons">
      <UIRadioButton
        v-for="radio in radioButtonsHotel"
        :key="radio.label"
        :className="'hotel'"
        :label="radio.label"
        :value="radio.value"
        v-model="pickedRadioHotel"
        :disabled="radio.disabled"
      />
    </div>
    <!--Radio Buttons for flight-->
    <div class="flight-radio-buttons">
      <UIRadioButton
        v-for="radio in radioButtonsFlight"
        :key="radio.label"
        :className="'flight'"
        :label="radio.label"
        :value="radio.value"
        after
        :disabled="radio.disabled"
        v-model="pickedRadioFlight"
      />
    </div>

    <!-- UICheckBox component instances -->
    <!-- Checkboxes for hotel -->
    <div class="hotel-checkbox">
      <UICheckbox
        v-for="checkbox in checkboxHotel"
        :key="checkbox.id"
        :className="'hotel'"
        :label="checkbox.label"
        :disabled="checkbox.disabled"
        @takeCheckedInfo="takeCheckedInfo"
      />
    </div>

    <!-- Checkboxes for flight -->
    <div class="flight-checkbox">
      <UICheckbox
        v-for="checkbox in checkboxFlight"
        :key="checkbox.id"
        :className="'flight'"
        :disabled="checkbox.disabled"
        :label="checkbox.label"
        after
        @takeCheckedInfo="takeCheckedInfo"
      />
    </div>

    <!-- Example of a disabled checkbox -->
    <UICheckbox
      :label="'Disabled'"
      :className="'hotel'"
      :after="false"
      :disabled="true"
      :name="'disabled'"
      :id="'deneme'"
    />
  </div>
  
</template>

<script lang="ts">
import UIButton from '../components/UIButton.vue'
import UIToggle from '../components/UIToggle.vue'
import UIRadioButton from '../components/UIRadioButton.vue'
import UICheckbox from '../components/UICheckbox.vue'
import UIInput from '../components/UIInput.vue'

export default {
  name: 'PowerPuffGirls',
  components: {
    UIButton,
    UIToggle,
    UIRadioButton,
    UICheckbox,
    UIInput
  },
  data() {
    return {

      inputValue:this.value,
      
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

      // Initial states for toggle switches
      powerpuffGirls: {
        checked: false,
        disabled: false
      },
      timeBenders: {
        checked: false,
        disabled: true
      },
      summerLovers: {
        checked: false,
        disabled: true
      },
      pinkPanthers: {
        checked: false,
        disabled: true
      },

      // Initial states for radio buttons
      pickedRadioHotel: '',
      pickedRadioFlight: '',
      // Hotel radio button list
      radioButtonsHotel: [
        { label: 'Radio 1', value: 'radio1', disabled: true },
        { label: 'Radio 2', value: 'radio2', disabled: false },
        { label: 'Radio 3', value: 'radio3', disabled: false }
      ],
      // Flight radio button list
      radioButtonsFlight: [
        { label: 'Radio 1', value: 'radio1', disabled: false },
        { label: 'Radio 2', value: 'radio2', disabled: false },
        { label: 'Radio 3', value: 'radio3', disabled: false }
      ],

      // Initial states for checkboxes
      checkboxHotel: [
        { label: 'Hotel 1', id: 'id1', disabled: false },
        { label: 'Hotel 2', id: 'id2', disabled: false },
        { label: 'Hotel 3', id: 'id3', disabled: true }
      ],
      checkboxFlight: [
        { label: 'Flight 1', id: 'id1', disabled: false },
        { label: 'Flight 2', id: 'id2', disabled: false },
        { label: 'Flight 3', id: 'id3', disabled: false }
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

    // Methods to handle toggle state change
    toggleChange1(newChecked) {
      // Changes the checked state of the first toggle switch (powerpuffGirls)
      this.powerpuffGirls.checked = newChecked
      //Enables the second toggle switch (timeBenders)
      this.timeBenders.disabled = false
    },
    toggleChange2(newChecked) {
      this.timeBenders.checked = newChecked
      this.summerLovers.disabled = false
    },
    toggleChange3(newChecked) {
      this.summerLovers.checked = newChecked
      this.pinkPanthers.disabled = false
    },
    toggleChange4(newChecked) {
      this.pinkPanthers.checked = newChecked
    },

    handlerSelectRadioButton(checked) {
      this.selectedId = checked
      console.log('oldu')
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
  background-color: #ffff;
  display: flex;
  flex-direction: column;
  gap: 10px;

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

  .hotel-checkbox {
    justify-content: center;
    display: flex;
    flex-direction: row;
  }

  .flight-checkbox {
    justify-content: center;
    display: flex;
    flex-direction: column;
  }

  .input-box {
    display: flex;
    justify-content: center;
    background-color: white;
  }
}
</style>
