export type AccountProfile = {
  id: string
  firstName: string
  lastName: string
  displayName: string
  avatarUrl: string
  memberSince: string
}

export type AccountReservationStatus = 'confirmed'

export type AccountReservation = {
  id: string
  startsAt: string
  guestCount: number
  locationNameKey: string
  status: AccountReservationStatus
}

export type AccountOrderStatus = 'outForDelivery' | 'completed'

export type AccountOrder = {
  id: string
  orderNumber: string
  placedAt: string
  status: AccountOrderStatus
  total: number
  currency: string
}
