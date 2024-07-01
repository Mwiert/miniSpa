interface Segment {
  airport: String
  time: String
}
type Departure = Segment
type Arrival = Segment

export interface Flight {
  airlineCode: String
  departure: Departure
  arrival: Arrival
  price: String
  class: String
  segmentNumber: number
}
