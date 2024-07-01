<template>
  <div>flight.results</div>
</template>

<script lang="ts">
import flightResponse from '../dummies/flightResponse'
export default {
  data() {
    return {
      logo: 'https://cdn.dev.reisetech.io/airline_34x34/'
    }
  },
  created() {
    console.log(flightResponse)
  }
}
</script>

<style scoped></style>
