<template>
  <div class="flight-results-c">
    <button @click="handlerLoadData">Load Data</button>
    <template v-for="(flight, index) in result" :key="index">
      <FlightCard :flight="flight" @select:flight="handlerSelectFlight" />
    </template>
  </div>
</template>

<script lang="ts">
import FlightCard from '../components/FlightCard.vue'
import data from '../dummies/response'
import type { Flight } from '../interface/index'

export default {
  components: {
    FlightCard
  },
  data() {
    return {
      result: [] as Flight[]
    }
  },

  created() {
    console.log(this.$filters('deneme'))
  },
  methods: {
    handlerSelectFlight(flight) {
      console.log(flight)
    },
    handlerLoadData() {
      data.forEach((element) => {
        this.result.push(element)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.flight-results-c {
  width: 100%;
}
</style>
