import {
  CoffeeOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import type { ComponentType } from 'react'

import { paths } from '../../routes/paths'

export const ACCOUNT_COMPACT_MQ = '(max-width: 1024px)'

export type AccountNavItem = {
  id: string
  to: string
  labelKey: string
  end?: boolean
  Icon: ComponentType<{ 'aria-hidden'?: boolean }>
}

export const ACCOUNT_NAV_ITEMS: AccountNavItem[] = [
  {
    id: 'personalInfo',
    to: paths.account,
    labelKey: 'account.sidebar.personalInfo',
    end: true,
    Icon: UserOutlined,
  },
  {
    id: 'orders',
    to: paths.accountOrders,
    labelKey: 'account.sidebar.previousOrders',
    Icon: ShoppingOutlined,
  },
  {
    id: 'favorites',
    to: paths.accountFavorites,
    labelKey: 'account.sidebar.favoriteProducts',
    Icon: HeartOutlined,
  },
  {
    id: 'reservations',
    to: paths.accountReservations,
    labelKey: 'account.sidebar.tableReservations',
    Icon: CoffeeOutlined,
  },
  {
    id: 'addresses',
    to: paths.accountAddresses,
    labelKey: 'account.sidebar.savedAddresses',
    Icon: EnvironmentOutlined,
  },
]
