import type { FC } from 'react'

type OwnProps = {
  current: number
  totalItems: number
  pageSize: number
  onChange: (page: number) => void
}

export type Props = FC<OwnProps>
