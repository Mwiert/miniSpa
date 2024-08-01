<template>
  <span>
    <span>
      <UITooltip
        label="This is a funny tooltipasdggsdnıgdasnjgasdnhjgasdbhkgbsdah"
        position="right"
        type="click">
        <SvgIcon :name="'x'" :size="'s'" :color="'#000'" />
      </UITooltip>
    </span>
    <span>
      <UITooltip
        label="This is a funny tooltipasdglnasdgjkhjıasdgbhıkasdghıdgbashasgdb"
        icon="x"
        position="top"
        type="click">
        <SvgIcon :name="'x'" :size="'s'" :color="'#000'" />
      </UITooltip>
    </span>
  </span>
  <div>Ayırıcı</div>
  <div class="text-area-c">
    <UITextArea
      :label="'Address'"
      :disabled="false"
      :rows="10"
      :cols="30"
      :placeholder="'Enter your address'"
      :maxLength="100"
      v-model="valueTextArea"></UITextArea>
  </div>
  <div class="text-area-c">
    <UITextArea
      :label="'text area length 10 '"
      :disabled="false"
      :rows="10"
      :cols="30"
      :placeholder="'Enter your address'"
      :maxLength="10"
      v-model="valueTextArea2"></UITextArea>
  </div>
  <div class="text-area-c">
    <UITextArea
      :label="'disabled text area'"
      :disabled="true"
      :rows="10"
      :cols="30"
      :placeholder="'Enter your address'"
      :maxLength="10"
      v-model="valueTextArea3"></UITextArea>
  </div>
  <div class="text-area-c">
    <UITextArea
      :label="'text area col 10'"
      :rows="10"
      :cols="10"
      :placeholder="'Enter your address'"
      :maxLength="10"
      v-model="valueTextArea4"></UITextArea>
  </div>

  <div class="text-area-c">
    <UITextArea
      :label="'text area col 30 row 2'"
      :rows="2"
      :cols="30"
      :placeholder="'Enter your address'"
      :maxLength="10"
      v-model="valueTextArea5"></UITextArea>
  </div>

  <div class="input-box">
    <UIInput
      :id="'username'"
      :label="'Email'"
      :icon="'mail'"
      :type="'email'"
      v-model="messageInput" />
  </div>

  <div class="input-box">
    <UIInput
      :type="'password'"
      :id="'password'"
      :label="'Password'"
      :clearButton="true"
      v-model="messageInputWithClearButton" />
  </div>

  <div class="input-box">
    <UIInput
      :id="'tckno'"
      :label="'TCKNO'"
      :icon="'arrow-up'"
      :type="'text'"
      clearButton
      disabled />
  </div>
  <div class="input-box">
    <UIInput
      :id="'idNumber'"
      :label="'idNumber'"
      :icon="'mail'"
      :type="'text'"
      clearButton
      :disabled="true" />
  </div>

  <div class="button-c">
    <UIButton
      :id="'homebutton1'"
      text="Home"
      :isSpinnerActive="loadingStates.home.isLoading"
      :isDisabled="loadingStates.home.isDisabled"
      @click="setLoadingState('home')"
      routerUrl="/" />
    <UIButton
      :id="'flightbutton1'"
      className="flight"
      text="Flight"
      :icon="'refresh'"
      :size="'small'"
      :isSpinnerActive="loadingStates.flight.isLoading"
      :isDisabled="loadingStates.flight.isDisabled"
      @click="setLoadingState('flight')"
      v-model="buttonValue" />

    <UIButton
      :id="'hotelbutton1'"
      className="hotel"
      text="Hotel"
      :icon="'refresh'"
      :iconSize="'s'"
      :isSpinnerActive="loadingStates.hotel.isLoading"
      :isDisabled="loadingStates.hotel.isDisabled"
      @click="setLoadingState('hotel')" />

    <!-- Since the class name is not added, the default class will be used. -->
    <UIButton
      :id="'ppgbutton'"
      text="PowerPuffGirls"
      :icon="'refresh'"
      :isSpinnerActive="loadingStates.default.isLoading"
      :isDisabled="loadingStates.default.isDisabled"
      @click="setLoadingState('default')" />

    <UIButton
      :id="'flightoutline'"
      className="flight outline"
      text="Flight"
      :isSpinnerActive="loadingStates.flightOutline.isLoading"
      :icon="'refresh'"
      :isDisabled="loadingStates.flightOutline.isDisabled"
      @click="setLoadingState('flightOutline')" />

    <UIButton
      :id="'hoteloutline'"
      className="hotel outline"
      text="Hotel"
      :isSpinnerActive="loadingStates.hotelOutline.isLoading"
      :isDisabled="loadingStates.hotelOutline.isDisabled"
      @click="setLoadingState('hotelOutline')" />
    <UIButton
      :id="'disabled'"
      text="Disabled"
      :isSpinnerActive="loadingStates.disabledButton.isLoading"
      :isDisabled="loadingStates.disabledButton.isDisabled"
      @click="setLoadingState('disabledButton')" />

    <div>
      <UIToggle
        :id="'powerpuffGirls'"
        :label="'Powerpuff Girls'"
        v-model="powerpuffGirls.checked"
        :disabled="powerpuffGirls.disabled"
        @update:modelValue="toggleChange1" />
    </div>

    <div>
      <UIToggle
        :id="'timeBenders'"
        :label="'Time Benders'"
        v-model="timeBenders.checked"
        :disabled="timeBenders.disabled"
        @update:modelValue="toggleChange2" />
    </div>

    <div>
      <UIToggle
        :id="'summerLovers'"
        :label="'Summer Lovers'"
        v-model="summerLovers.checked"
        :disabled="summerLovers.disabled"
        @update:modelValue="toggleChange3" />
    </div>

    <div>
      <UIToggle
        :id="'pinkPanthers'"
        :label="'Pink Panthers'"
        v-model="pinkPanthers.checked"
        :disabled="pinkPanthers.disabled"
        @update:modelValue="toggleChange4" />
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
        :disabled="radio.disabled" />
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
        v-model="pickedRadioFlight" />
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
        v-model="checkbox.checked"
        @takeCheckedInfo="takeCheckedInfo" />
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
        v-model="checkbox.checked"
        @takeCheckedInfo="takeCheckedInfo" />
    </div>
    <!-- Example of a disabled checkbox -->
    <!-- <UICheckbox
      :label="'Disabled'"
      :className="'hotel'"
      :after="false"
      :disabled="true"
      :name="'disabled'"
      :id="'deneme'"
      v-model:checked="checkbox.checked"
       /> -->
  </div>
</template>

<script lang="ts">
import UIButton from '../components/UIButton.vue'
import UIToggle from '../components/UIToggle.vue'
import UIRadioButton from '../components/UIRadioButton.vue'
import UICheckbox from '../components/UICheckbox.vue'
import UIInput from '../components/UIInput.vue'
import UITextArea from '../components/UITextArea.vue'
import UITooltip from '../components/UITooltip.vue'
import SvgIcon from '../components/SvgIcon.vue'

export default {
  name: 'PowerPuffGirls',
  components: {
    UIButton,
    UIToggle,
    UIRadioButton,
    UICheckbox,
    UIInput,
    UITextArea,
    UITooltip,
    SvgIcon
  },
  data() {
    return {
      inputValue: this.value,
      openComponent: false,
      hoverComponent: false,
      email: '',
      password: '',
      idNumber: '',
      valueTextArea: '',
      valueTextArea2: '',
      valueTextArea3: '',
      valueTextArea4: '',
      valueTextArea5: '',
      messageInput: 'fdasfsdafdas',
      messageInputWithClearButton: 'fadsfdasfd',
      buttonValue: '',

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
        { label: 'Hotel 1', id: 'id1', disabled: false, checked: false },
        { label: 'Hotel 2', id: 'id2', disabled: false, checked: false },
        { label: 'Hotel 3', id: 'id3', disabled: true, checked: false }
      ],
      checkboxFlight: [
        { label: 'Flight 1', id: 'id1', disabled: false, checked: true },
        { label: 'Flight 2', id: 'id2', disabled: false, checked: false },
        { label: 'Flight 3', id: 'id3', disabled: false, checked: false }
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
    toggleChange1(newChecked: boolean) {
      // Changes the checked state of the first toggle switch (powerpuffGirls)
      this.powerpuffGirls.checked = newChecked
      //Enables the second toggle switch (timeBenders)
      this.timeBenders.disabled = false
    },
    toggleComponent() {
      this.openComponent = !this.openComponent
    },

    toggleChange2(newChecked: boolean) {
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
    },

    takeCheckedInfo(name: string, id: string, isChecked: boolean) {}
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
