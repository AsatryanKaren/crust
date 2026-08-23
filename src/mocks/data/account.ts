import type {
  AccountOrder,
  AccountProfile,
  AccountReservation,
} from '../../types/account'

export const accountProfile: AccountProfile = {
  id: 'user-anush',
  firstName: 'Anush',
  lastName: 'Akopyan',
  displayName: 'Anush Akopyan',
  avatarUrl:
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&q=80',
  memberSince: '2026-05-01',
}

export const currentReservations: AccountReservation[] = [
  {
    id: 'res-1',
    startsAt: '2026-05-24T11:00:00',
    guestCount: 2,
    locationNameKey: 'account.locations.abovyan',
    status: 'confirmed',
  },
]

export const accountOrders: AccountOrder[] = [
  {
    id: 'order-1',
    orderNumber: 'ART-88291',
    placedAt: '2023-10-12',
    status: 'outForDelivery',
    total: 12400,
    currency: 'AMD',
  },
  {
    id: 'order-2',
    orderNumber: 'ART-88102',
    placedAt: '2023-09-28',
    status: 'completed',
    total: 8600,
    currency: 'AMD',
  },
]
