<template>
  <div>
    <UIDropdown :items="items" @sendItem="handlerSelectedItem" />
    <div v-if="selectedOption">
      <p>Selected Airline: {{ selectedOption.airlineLabel }} {{ selectedOption.airlineBrand }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import UIDropdown from '../components/UIDropdown.vue'

export default {
  name: 'summerLovers',
  components: {
    UIDropdown
  },
  data() {
    return {
      items: [
        {
          airlineLabel: 'THY',
          airlineBrand: 'Türk Hava Yollari'
        },
        {
          airlineLabel: 'PGS',
          airlineBrand: 'Pegasus'
        },
        {
          airlineLabel: 'SUN',
          airlineBrand: 'Sun Express'
        }
      ],
      selectedOption: null
    }
  },
  methods: {
    handlerSelectedItem(item) {
      this.selectedOption = item;
      console.log("Selected Item:", item);
    }
  }
}
</script>

