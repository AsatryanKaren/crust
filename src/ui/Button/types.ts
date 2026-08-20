import type { FC, ReactNode, MouseEventHandler } from 'react'

type OwnProps = {
  variant?: 'primary' | 'secondary' | 'whiteFilled' | 'whiteMinimal'
  size?: 'small' | 'medium' | 'large'
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  htmlType?: 'button' | 'submit' | 'reset'
}

export type Props = FC<OwnProps>
