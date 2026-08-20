import type { FC } from 'react'

import type { ProductSort } from '../../../../types/product'

type OwnProps = {
  search: string
  sort: ProductSort
  onSearchChange: (value: string) => void
  onSortChange: (value: ProductSort) => void
  showSearch?: boolean
  showSort?: boolean
}

export type Props = FC<OwnProps>
