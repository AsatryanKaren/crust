import {
  HomeFilled,
  HomeOutlined,
  ReadFilled,
  ReadOutlined,
  ShoppingFilled,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons'

import { paths } from '../../../routes/paths'
import type { MobileBottomNavItem } from './types'

export const MOBILE_BOTTOM_NAV_ITEMS: MobileBottomNavItem[] = [
  {
    id: 'home',
    to: paths.home,
    labelKey: 'mobileBottomNav.home',
    Icon: HomeOutlined,
    ActiveIcon: HomeFilled,
    end: true,
  },
  {
    id: 'catalog',
    to: paths.catalog,
    labelKey: 'mobileBottomNav.catalog',
    Icon: ReadOutlined,
    ActiveIcon: ReadFilled,
  },
  {
    id: 'cart',
    to: paths.cart,
    labelKey: 'mobileBottomNav.cart',
    Icon: ShoppingOutlined,
    ActiveIcon: ShoppingFilled,
  },
  {
    id: 'profile',
    to: paths.account,
    labelKey: 'mobileBottomNav.profile',
    Icon: UserOutlined,
    ActiveIcon: UserOutlined,
  },
]
