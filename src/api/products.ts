import type { PaginatedResponse } from '../types/pagination'
import type { Product, ProductsQueryParams } from '../types/product'
import { apiClient } from './client'

export const fetchProducts = async (
  params: ProductsQueryParams = {},
): Promise<PaginatedResponse<Product>> => {
  const { data } = await apiClient.get<PaginatedResponse<Product>>('/products', {
    params: {
      category: params.category,
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      sort: params.sort,
    },
  })
  return data
}

export const fetchProductById = async (id: string): Promise<Product> => {
  const { data } = await apiClient.get<Product>(`/products/${id}`)
  return data
}

export const addCartItem = async (productId: string): Promise<void> => {
  await apiClient.post('/cart/items', { productId })
}

export const toggleProductFavorite = async (productId: string): Promise<void> => {
  await apiClient.post(`/products/${productId}/favorite`)
}
