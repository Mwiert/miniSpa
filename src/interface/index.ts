interface Segment {
  airport: String
  time: String
}

export interface Flight {
  airlineCode: string
  departure: Segment
  arrival: Segment
  price: string
  class: number
  segmentNumber: number
}
