import type {
  AddCartItemPayload,
  CartItem,
  CartResponse,
} from '../types/product'
import { apiClient } from './client'

export const fetchCart = async (): Promise<CartResponse> => {
  const { data } = await apiClient.get<CartResponse>('/cart')
  return data
}

export const addCartItem = async (
  payload: AddCartItemPayload,
): Promise<CartItem> => {
  const { data } = await apiClient.post<CartItem>('/cart/items', payload)
  return data
}

export const removeCartItem = async (itemId: string): Promise<void> => {
  await apiClient.delete(`/cart/items/${itemId}`)
}
