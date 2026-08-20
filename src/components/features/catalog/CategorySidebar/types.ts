import type { FC } from 'react'

import type { Category } from '../../../../types/category'

type OwnProps = {
  categories: Category[]
  activeSlug: string
  onSelect: (slug: string) => void
}

export type Props = FC<OwnProps>
