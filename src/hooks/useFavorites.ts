import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryClient,
} from '@tanstack/react-query'

import { fetchFavorites } from '../api/favorites'
import { toggleProductFavorite } from '../api/products'
import type { PaginatedResponse } from '../types/pagination'
import type { FavoritesResponse, Product } from '../types/product'
import { productsQueryRootKey } from './useProducts'

export const favoritesQueryKey = ['favorites'] as const

export const useFavorites = () => {
  return useQuery({
    queryKey: favoritesQueryKey,
    queryFn: fetchFavorites,
  })
}

const isProductsPage = (data: unknown): data is PaginatedResponse<Product> => {
  if (typeof data !== 'object' || data === null || !('items' in data)) {
    return false
  }

  return Array.isArray(data.items)
}

const isProduct = (data: unknown): data is Product => {
  if (typeof data !== 'object' || data === null) {
    return false
  }

  if (!('id' in data) || !('name' in data) || !('imageUrl' in data)) {
    return false
  }

  return typeof data.id === 'string'
}

const findProductInCache = (
  queryClient: QueryClient,
  productId: string,
): Product | undefined => {
  const favorites =
    queryClient.getQueryData<FavoritesResponse>(favoritesQueryKey)
  const fromFavorites = favorites?.items.find((item) => item.id === productId)
  if (fromFavorites) {
    return fromFavorites
  }

  const productQueries = queryClient.getQueriesData({
    queryKey: productsQueryRootKey,
  })

  for (const [, data] of productQueries) {
    if (isProductsPage(data)) {
      const found = data.items.find((item) => item.id === productId)
      if (found) {
        return found
      }
    }

    if (isProduct(data) && data.id === productId) {
      return data
    }
  }

  return undefined
}

const patchProductFavorite = (
  queryClient: QueryClient,
  productId: string,
  isFavorite: boolean,
) => {
  queryClient.setQueriesData(
    { queryKey: productsQueryRootKey },
    (data: unknown) => {
      if (isProductsPage(data)) {
        return {
          ...data,
          items: data.items.map((item) =>
            item.id === productId ? { ...item, isFavorite } : item,
          ),
        }
      }

      if (isProduct(data) && data.id === productId) {
        return { ...data, isFavorite }
      }

      return data
    },
  )
}

export const useToggleFavorite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: toggleProductFavorite,
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: favoritesQueryKey })
      await queryClient.cancelQueries({ queryKey: productsQueryRootKey })

      const previousFavorites =
        queryClient.getQueryData<FavoritesResponse>(favoritesQueryKey)
      const previousProducts = queryClient.getQueriesData({
        queryKey: productsQueryRootKey,
      })

      const product = findProductInCache(queryClient, productId)
      const currentlyFavorite =
        product?.isFavorite ??
        previousFavorites?.items.some((item) => item.id === productId) ??
        false
      const nextIsFavorite = !currentlyFavorite

      patchProductFavorite(queryClient, productId, nextIsFavorite)

      queryClient.setQueryData<FavoritesResponse>(favoritesQueryKey, (data) => {
        const items = data?.items ?? []
        if (nextIsFavorite) {
          if (items.some((item) => item.id === productId)) {
            return { items }
          }
          if (!product) {
            return data
          }
          return { items: [...items, { ...product, isFavorite: true }] }
        }

        return { items: items.filter((item) => item.id !== productId) }
      })

      return { previousFavorites, previousProducts }
    },
    onError: (_error, _productId, context) => {
      if (!context) {
        return
      }

      if (context.previousFavorites !== undefined) {
        queryClient.setQueryData(favoritesQueryKey, context.previousFavorites)
      } else {
        queryClient.removeQueries({ queryKey: favoritesQueryKey })
      }

      context.previousProducts.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: favoritesQueryKey })
      void queryClient.invalidateQueries({ queryKey: productsQueryRootKey })
    },
  })
}
