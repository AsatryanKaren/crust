export type ProductStatus = 'available' | 'unavailable'

export type Product = {
  id: string
  categoryId: string
  name: string
  description: string
  price: number
  currency: string
  unit: string
  imageUrl: string
  isBestseller: boolean
  status: ProductStatus
  isFavorite: boolean
}

export type ProductSort = 'recommended' | 'priceAsc' | 'priceDesc' | 'name'

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
