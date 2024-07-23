interface DateModel {
  date?: string
  number?: number
  inactive?: boolean
  active?: boolean
  selected?: boolean
  textDecoration?: boolean // For Future Implementation
  blink?: boolean // For Future Implementation
  between?: boolean // For Future Implementation
  isToday?: boolean
  month?: string
  year?: string
  day?: string
  firstInitialDate?: boolean
  secondInitialDate?: boolean
  fullDateFormatted?: string
}
export default DateModel
