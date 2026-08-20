export const GUEST_OPTIONS = ['1', '2', '3', '4', '5', '6+'] as const

export const LOCATION_IDS = ['abovyan', 'arami'] as const

export type LocationId = (typeof LOCATION_IDS)[number]

export const RESERVATION_DETAILS_URL = '/api/reservation'
export const RESERVATION_SUBMIT_URL = '/api/reservations'
