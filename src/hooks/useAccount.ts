import { useQuery } from '@tanstack/react-query'

import {
  fetchAccountOrders,
  fetchAccountProfile,
  fetchCurrentReservations,
} from '../api/account'

export const accountProfileQueryKey = ['account', 'me'] as const
export const accountOrdersQueryKey = ['account', 'orders'] as const
export const currentReservationsQueryKey = [
  'account',
  'reservations',
  'current',
] as const

export const useAccountProfile = () => {
  return useQuery({
    queryKey: accountProfileQueryKey,
    queryFn: fetchAccountProfile,
  })
}

export const useAccountOrders = () => {
  return useQuery({
    queryKey: accountOrdersQueryKey,
    queryFn: fetchAccountOrders,
  })
}

export const useCurrentReservations = () => {
  return useQuery({
    queryKey: currentReservationsQueryKey,
    queryFn: fetchCurrentReservations,
  })
}
