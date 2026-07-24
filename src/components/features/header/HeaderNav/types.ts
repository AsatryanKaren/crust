import type { FC } from 'react'

type OwnProps = {
  orientation?: 'horizontal' | 'vertical'
  onNavigate?: () => void
}

export type Props = FC<OwnProps>
