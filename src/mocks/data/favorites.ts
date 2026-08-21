import type { Product } from '../../types/product'
import { products } from './products'

const favoriteIds = new Set<string>()

export const withFavoriteFlag = (product: Product): Product => ({
  ...product,
  isFavorite: favoriteIds.has(product.id),
})

export const toggleFavoriteId = (
  productId: string,
): { productId: string; isFavorite: boolean } | undefined => {
  const exists = products.some((product) => product.id === productId)
  if (!exists) {
    return undefined
  }

  if (favoriteIds.has(productId)) {
    favoriteIds.delete(productId)
    return { productId, isFavorite: false }
  }

  favoriteIds.add(productId)
  return { productId, isFavorite: true }
}

export const getFavoriteProducts = (): Product[] =>
  products
    .filter((product) => favoriteIds.has(product.id))
    .map(withFavoriteFlag)
