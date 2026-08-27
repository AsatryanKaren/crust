export type ProductStatus = 'available' | 'unavailable'

export type ProductVariant = {
  id: string
  labelKey: string
  price: number
  unit: string
}

export type Product = {
  id: string
  categoryId: string
  name: string
  description: string
  price: number
  currency: string
  unit: string
  imageUrl: string
  images: string[]
  ingredients: string[]
  allergens: string[]
  variants: ProductVariant[]
  isBestseller: boolean
  status: ProductStatus
  isFavorite: boolean
}

export type AddCartItemPayload = {
  productId: string
  variantId: string
  quantity: number
}

export type CartItem = {
  id: string
  productId: string
  variantId: string
  quantity: number
  product: Product
  variant: ProductVariant
}

export type CartResponse = {
  items: CartItem[]
}

export const PRODUCT_SORT_OPTIONS = [
  'recommended',
  'priceAsc',
  'priceDesc',
  'name',
] as const

export type ProductSort = (typeof PRODUCT_SORT_OPTIONS)[number]

export type FavoritesResponse = {
  items: Product[]
}

export type ToggleFavoriteResponse = {
  productId: string
  isFavorite: boolean
}

export type ProductsQueryParams = {
  category?: string
  page?: number
  pageSize?: number
  q?: string
  sort?: ProductSort
}
