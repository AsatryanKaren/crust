import type { FC } from 'react'

type OwnProps = {
  open: boolean
  panelId: string
  onClose: () => void
}

export type Props = FC<OwnProps>
