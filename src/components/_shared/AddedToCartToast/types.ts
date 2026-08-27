import type { FC } from 'react'

type OwnProps = {
  label: string
  viewCartLabel: string
  onViewCart: () => void
}

export type Props = FC<OwnProps>
