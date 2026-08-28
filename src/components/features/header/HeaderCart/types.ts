import type { FC } from 'react'

type OwnProps = {
  count?: number
  open?: boolean
  panelId: string
  onOpen: () => void
}

export type Props = FC<OwnProps>
