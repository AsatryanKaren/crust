import type { ButtonProps } from 'antd'
import type { FC } from 'react'

type OwnProps = {
  isFavorite: boolean
  onClick?: ButtonProps['onClick']
  className?: string
  appearance?: 'badge' | 'plain'
}

export type Props = FC<OwnProps>
