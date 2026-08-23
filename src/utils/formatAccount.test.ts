import { formatAmount, formatMediumDate } from './formatAccount'

describe('formatAccount', () => {
  it('formats a date-only ISO string in the given locale', () => {
    expect(formatMediumDate('2023-10-12', 'en')).toBe('Oct 12, 2023')
  })

  it('formats AMD amounts without fraction digits', () => {
    expect(formatAmount(12400, 'en', 'AMD')).toMatch(/12,400/)
  })
})
