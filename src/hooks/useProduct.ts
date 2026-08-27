import { useQuery } from '@tanstack/react-query'

import { fetchProductById } from '../api/products'
import { productsQueryRootKey } from './useProducts'

export const productDetailQueryKey = (id: string) =>
  [...productsQueryRootKey, 'detail', id] as const

export const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: productDetailQueryKey(id ?? ''),
    queryFn: () => fetchProductById(id ?? ''),
    enabled: Boolean(id),
  })
}
