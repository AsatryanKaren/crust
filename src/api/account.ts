import type {
  AccountOrder,
  AccountProfile,
  AccountReservation,
} from '../types/account'
import { apiClient } from './client'

export const fetchAccountProfile = async (): Promise<AccountProfile> => {
  const { data } = await apiClient.get<AccountProfile>('/account/me')
  return data
}

export const fetchAccountOrders = async (): Promise<AccountOrder[]> => {
  const { data } = await apiClient.get<AccountOrder[]>('/account/orders')
  return data
}

export const fetchCurrentReservations = async (): Promise<
  AccountReservation[]
> => {
  const { data } = await apiClient.get<AccountReservation[]>(
    '/account/reservations/current',
  )
  return data
}
