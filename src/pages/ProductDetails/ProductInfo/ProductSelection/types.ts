import type { FC } from 'react'

import type { ProductVariant } from '../../../../types/product'

type OwnProps = {
  variants: ProductVariant[]
  value: string
  onChange: (variantId: string) => void
  disabled?: boolean
}

export type Props = FC<OwnProps>
