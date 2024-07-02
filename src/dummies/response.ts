import type { Flight } from '../interface/index'

const flightResponse: Flight[] = [
  {
    airlineCode: 'TK',
    departure: {
      airport: 'JFK',
      time: '2024-07-10T08:00:00'
    },
    arrival: {
      airport: 'LAX',
      time: '2024-07-10T11:00:00'
    },
    price: '350.00',
    class: 1,
    segmentNumber: 1
  },
  {
    airlineCode: 'TK',
    departure: {
      airport: 'JFK',
      time: '2024-07-12T14:00:00'
    },
    arrival: {
      airport: 'LAX',
      time: '2024-07-12T18:00:00'
    },
    price: '275.00',
    class: 1,
    segmentNumber: 1
  },
  {
    airlineCode: 'LH',
    departure: {
      airport: 'JFK',
      time: '2024-07-15T09:00:00'
    },
    arrival: {
      airport: 'LAX',
      time: '2024-07-15T11:30:00'
    },
    price: '150.00',
    class: 1,
    segmentNumber: 1
  },
  {
    airlineCode: 'XQ',
    departure: {
      airport: 'JFK',
      time: '2024-07-20T12:00:00'
    },
    arrival: {
      airport: 'LAX',
      time: '2024-07-20T13:30:00'
    },
    price: '200.00',
    class: 1,
    segmentNumber: 1
  },
  {
    airlineCode: 'XQ',
    departure: {
      airport: 'JFK',
      time: '2024-07-25T07:00:00'
    },
    arrival: {
      airport: 'LAX',
      time: '2024-07-25T08:30:00'
    },
    price: '180.00',
    class: 1,
    segmentNumber: 1
  }
]

export default flightResponse
