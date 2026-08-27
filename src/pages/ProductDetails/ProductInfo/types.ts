import type { FC } from 'react'

import type { Product, ProductVariant } from '../../../types/product'

type OwnProps = {
  product: Product
  selectedVariant: ProductVariant
  quantity: number
  quantityId: string
  isAddingToCart: boolean
  onQuantityChange: (value: number) => void
  onVariantChange: (variantId: string) => void
  onFavorite: () => void
  onAddToCart: () => void
}

export type Props = FC<OwnProps>
