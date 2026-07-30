import type { FC } from 'react'
import type { CategoryId } from '../../consts'

type OwnProps = {
  categoryId: CategoryId
}

export type Props = FC<OwnProps>
