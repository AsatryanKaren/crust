import type { FC } from 'react'

import type { ProductStatus } from '../../../types/product'

type OwnProps = {
  status: ProductStatus
}

export type Props = FC<OwnProps>
