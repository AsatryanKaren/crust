import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { fetchProducts } from '../api/products'
import type { ProductsQueryParams } from '../types/product'

export const productsQueryRootKey = ['products'] as const

export const productsQueryKey = (params: ProductsQueryParams) =>
  [...productsQueryRootKey, params] as const

export const useProducts = (params: ProductsQueryParams) => {
  return useQuery({
    queryKey: productsQueryKey(params),
    queryFn: () => fetchProducts(params),
    placeholderData: keepPreviousData,
  })
}
