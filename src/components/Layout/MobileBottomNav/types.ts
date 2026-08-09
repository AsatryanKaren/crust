import type { ComponentType, FC } from 'react'

type OwnProps = Record<string, never>

export type Props = FC<OwnProps>

export type MobileBottomNavItem = {
  id: 'home' | 'catalog' | 'cart' | 'profile'
  to: string
  labelKey: string
  Icon: ComponentType<{ className?: string }>
  ActiveIcon: ComponentType<{ className?: string }>
  end?: boolean
}
