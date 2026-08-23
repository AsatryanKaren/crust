import type { FavoritesResponse } from '../types/product'
import { apiClient } from './client'

export const fetchFavorites = async (): Promise<FavoritesResponse> => {
  const { data } = await apiClient.get<FavoritesResponse>('/favorites')
  return data
}
