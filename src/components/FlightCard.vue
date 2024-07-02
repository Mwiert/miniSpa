<template>
  <div class="flight-card-c" @click="handlerSelectCard">
    <div class="brand-logo">
      <img :src="BrandLogo" alt="brand-logo" />
      <span>{{ flight?.airlineCode }}</span>
    </div>
    <div class="flight-leg">
      <div class="departure">
        <span>{{ flight?.departureAirport }}</span>

        <span>{{ DepartureTime }}</span>
      </div>
      <div class="flight-info">
        <span>{{ timeDifference }}</span>
        <div class="flight-horizontal-line"></div>
        <span>Direct Flight</span>
      </div>
      <div class="arrival">
        <span>{{ flight?.arrivalAirport }}</span>
        <span>{{ ArrivalTime }}</span>
      </div>
    </div>
    <div class="leg-price">
      <span class="price">{{ flight?.price }} €</span>
      <span class="segment">{{ 'class' }}</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'FlightCard',
  props: {
    brandLogo: String,
    flight: Object
  },

  computed: {
    BrandLogo() {
      return `https://cdn.dev.reisetech.io/airline_34x34/${this.flight.airlineCode}.svg`
    },
    timeDifference() {
      const departure = this.flight.departure.time
      const arrival = this.flight.arrival.time
      const hours = this.$dayjs(arrival).diff(departure, 'hours')
      const minutes = this.$dayjs(arrival).diff(departure, 'minutes')
      return hours + 'h ' + (minutes % 60 == 0 ? '' : (minutes % 60) + 'min')
    },
    DepartureTime() {
      return this.$dayjs(this.flight.departure.time).format('HH:mm')
    },
    ArrivalTime() {
      return this.$dayjs(this.flight.arrival.time).format('HH:mm')
    }
  },
  methods: {
    handlerSelectCard() {
      this.$emit('select:flight', this.flight)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/variables.scss';
.flight-card-c {
  display: flex;
  // min-height: 110px;
  width: 480px;
  background: white;
  border-radius: $border-radius;
  overflow: hidden;
  padding: 1rem;
  box-shadow: rgba(218, 216, 216, 0.4) 1px 3px 5px;
  margin: 0 auto;
  margin-bottom: 0.75rem;
  transition-duration: 0.05s;
  transition-timing-function: ease-in-out;
  transition-property: transform;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  .brand-logo {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 38px;
    }
  }
  .flight-leg {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #e5e5e5;
    border-left: 1px solid #e5e5e5;
    .departure {
      display: flex;
      flex-direction: column;
    }
    .flight-info {
      margin: 0 12px;
      text-align: center;
      .flight-horizontal-line {
        position: relative;
        background-color: orange;
        margin: 4px 0;
        height: 2px;

        &::before,
        &::after {
          content: '';
          $size: 6px;
          position: absolute;
          display: block;
          width: $size;
          top: 0;
          bottom: 0;
          margin: auto;
          height: $size;
          background-color: orange;
          border-radius: 100%;
        }

        &::before {
          left: 0;
        }
        &::after {
          right: 0;
        }
      }
    }
    .arrival {
      display: flex;
      flex-direction: column;
    }
  }
  .leg-price {
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .price {
      font-weight: 600;
      font-size: 16px;
    }
    .segment {
      opacity: 0.7;
      font-size: 12px;
    }
  }
}
</style>
