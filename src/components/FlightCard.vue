<template>
  <div class="flight-card-c">
    <div class="brand-logo">
      <img :src="brandLogo" alt="brand-logo" />
      <span>{{ flight?.airlineCode }}</span>
    </div>
    <div class="flight-leg">
      <div class="departure">
        <span>{{ flight?.departureAirport }}</span>
        <span>{{ timeFormat(flight?.departureTime) }}</span>
      </div>
      <div class="flight-info">
        <span>{{ timeDifference }}</span>
        <div class="flight-horizontal-line"></div>
        <span>Direct Flight</span>
      </div>
      <div class="arrival">
        <span>{{ flight?.arrivalAirport }}</span>
        <span>{{ timeFormat(flight?.arrivalTime) }}</span>
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
  created() {
    console.log(this.$dayjs().format('HH:mm'))
  },
  computed: {
    timeDifference() {
      const hours = this.$dayjs(this.flight.arrivalTime).diff(this.flight.departureTime, 'hours')
      const minutes = this.$dayjs(this.flight.arrivalTime).diff(
        this.flight.departureTime,
        'minutes'
      )
      return hours + 'h ' + (minutes % 60 == 0 ? '' : (minutes % 60) + 'min')
    }
  },
  methods: {
    timeFormat(dateTime: string) {
      return this.$dayjs(dateTime).format('HH:mm')
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
  margin-bottom: 1rem;
  .brand-logo {
    width: 30%;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-items: center;
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
