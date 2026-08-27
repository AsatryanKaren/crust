import type { AddCartItemPayload, CartItem } from '../../types/product'
import { withFavoriteFlag } from './favorites'
import { products } from './products'

type CartLine = {
  id: string
  productId: string
  variantId: string
  quantity: number
}

const cartLines = new Map<string, CartLine>()

const lineKey = (productId: string, variantId: string): string =>
  `${productId}:${variantId}`

const toCartItem = (line: CartLine): CartItem | undefined => {
  const product = products.find((item) => item.id === line.productId)
  if (!product) {
    return undefined
  }

  const variant = product.variants.find((item) => item.id === line.variantId)
  if (!variant) {
    return undefined
  }

  return {
    id: line.id,
    productId: line.productId,
    variantId: line.variantId,
    quantity: line.quantity,
    product: withFavoriteFlag(product),
    variant,
  }
}

export const getCartItems = (): CartItem[] =>
  [...cartLines.values()]
    .map(toCartItem)
    .filter((item): item is CartItem => item !== undefined)

export const addToCart = (
  payload: AddCartItemPayload,
): CartItem | undefined => {
  const product = products.find((item) => item.id === payload.productId)
  if (!product) {
    return undefined
  }

  const variant = product.variants.find((item) => item.id === payload.variantId)
  if (!variant) {
    return undefined
  }

  const quantity = payload.quantity > 0 ? payload.quantity : 1
  const key = lineKey(payload.productId, payload.variantId)
  const existing = cartLines.get(key)

  if (existing) {
    existing.quantity += quantity
    return toCartItem(existing)
  }

  const line: CartLine = {
    id: `cart-${payload.productId}-${payload.variantId}`,
    productId: payload.productId,
    variantId: payload.variantId,
    quantity,
  }
  cartLines.set(key, line)
  return toCartItem(line)
}

export const removeFromCart = (itemId: string): boolean => {
  for (const [key, line] of cartLines.entries()) {
    if (line.id === itemId) {
      cartLines.delete(key)
      return true
    }
  }

  return false
}
