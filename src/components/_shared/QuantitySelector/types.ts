import type { FC } from 'react'

type OwnProps = {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  disabled?: boolean
  id?: string
}

export type Props = FC<OwnProps>
