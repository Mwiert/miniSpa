<template>
  <div class="content-wrapper">
    <template v-for="(flight, index) in result" :key="index">
      <FlightCard :flight="flight" :brandLogo="logo" />
    </template>
  </div>
</template>

<script lang="ts">
import FlightCard from '../components/FlightCard.vue'
import data from '../dummy.js'
import type { Flight } from '../Interfaces/index'

export default {
  components: {
    FlightCard
  },
  data() {
    return {
      logo: 'https://cdn.dev.reisetech.io/airline_34x34/AA.svg',
      result: [] as Flight[]
    }
  },

  created() {
    // for (let index = 0; index < data.length; index++) {
    //   const element = data[index]
    //   this.result.push(element)
    // }
    data.forEach((element) => {
      this.result.push(element)
    })
  }
}
</script>

<style lang="scss" scoped></style>
