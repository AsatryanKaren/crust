import type { FC } from 'react'

import type { Product } from '../../../../types/product'

type OwnProps = {
  product: Product
  onFavorite?: (productId: string) => void
  onAddToCart?: (productId: string) => void
}

export type Props = FC<OwnProps>
