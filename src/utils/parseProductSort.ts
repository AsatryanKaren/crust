import { PRODUCT_SORT_OPTIONS, type ProductSort } from '../types/product'

export const parseProductSort = (
  value: string | null,
  fallback: ProductSort = 'recommended',
): ProductSort => {
  for (const option of PRODUCT_SORT_OPTIONS) {
    if (option === value) {
      return option
    }
  }

  return fallback
}
