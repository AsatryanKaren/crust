import type { ButtonProps } from 'antd'
import type { FC, ReactNode } from 'react'

type OwnProps = {
  ariaLabel: string
  children: ReactNode
  onClick?: ButtonProps['onClick']
  disabled?: boolean
  className?: string
}

export type Props = FC<OwnProps>
