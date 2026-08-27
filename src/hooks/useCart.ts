import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryClient,
} from '@tanstack/react-query'
import { App } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { addCartItem, fetchCart, removeCartItem } from '../api/cart'
import { showAddedToCartToast } from '../components/_shared/AddedToCartToast'
import type { PaginatedResponse } from '../types/pagination'
import type {
  AddCartItemPayload,
  CartItem,
  CartResponse,
  Product,
  ProductVariant,
} from '../types/product'
import { productsQueryRootKey } from './useProducts'

export const cartQueryKey = ['cart'] as const

export const useCart = () => {
  return useQuery({
    queryKey: cartQueryKey,
    queryFn: fetchCart,
  })
}

export const getCartQuantityCount = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.quantity, 0)

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

  const cart = queryClient.getQueryData<CartResponse>(cartQueryKey)
  return cart?.items.find((item) => item.productId === productId)?.product
}

const findVariant = (
  product: Product,
  variantId: string,
): ProductVariant | undefined =>
  product.variants.find((variant) => variant.id === variantId)

const buildOptimisticItem = (
  payload: AddCartItemPayload,
  product: Product,
  variant: ProductVariant,
): CartItem => ({
  id: `cart-${payload.productId}-${payload.variantId}`,
  productId: payload.productId,
  variantId: payload.variantId,
  quantity: payload.quantity,
  product,
  variant,
})

export const useAddCartItem = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { message } = App.useApp()

  return useMutation({
    mutationFn: addCartItem,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: cartQueryKey })

      const previousCart = queryClient.getQueryData<CartResponse>(cartQueryKey)
      const product = findProductInCache(queryClient, payload.productId)
      const variant = product
        ? findVariant(product, payload.variantId)
        : undefined

      if (product && variant) {
        queryClient.setQueryData<CartResponse>(cartQueryKey, (data) => {
          const items = data?.items ?? []
          const existingIndex = items.findIndex(
            (item) =>
              item.productId === payload.productId &&
              item.variantId === payload.variantId,
          )

          if (existingIndex >= 0) {
            return {
              items: items.map((item, index) =>
                index === existingIndex
                  ? { ...item, quantity: item.quantity + payload.quantity }
                  : item,
              ),
            }
          }

          return {
            items: [...items, buildOptimisticItem(payload, product, variant)],
          }
        })
      }

      return { previousCart }
    },
    onError: (_error, _payload, context) => {
      if (!context) {
        return
      }

      if (context.previousCart !== undefined) {
        queryClient.setQueryData(cartQueryKey, context.previousCart)
      } else {
        queryClient.removeQueries({ queryKey: cartQueryKey })
      }
    },
    onSuccess: () => {
      showAddedToCartToast(message, t, navigate)
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: cartQueryKey })
    },
  })
}

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: removeCartItem,
    onMutate: async (itemId) => {
      await queryClient.cancelQueries({ queryKey: cartQueryKey })

      const previousCart = queryClient.getQueryData<CartResponse>(cartQueryKey)

      queryClient.setQueryData<CartResponse>(cartQueryKey, (data) => {
        if (!data) {
          return data
        }

        return {
          items: data.items.filter((item) => item.id !== itemId),
        }
      })

      return { previousCart }
    },
    onError: (_error, _itemId, context) => {
      if (!context) {
        return
      }

      if (context.previousCart !== undefined) {
        queryClient.setQueryData(cartQueryKey, context.previousCart)
      } else {
        queryClient.removeQueries({ queryKey: cartQueryKey })
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: cartQueryKey })
    },
  })
}
