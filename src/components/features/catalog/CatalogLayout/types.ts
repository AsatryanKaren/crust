import type { FC, ReactNode } from 'react'

type OwnProps = {
  sidebar: ReactNode
  heading?: ReactNode
  children: ReactNode
}

export type Props = FC<OwnProps>
