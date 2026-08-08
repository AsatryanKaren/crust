import type { HeaderNavItem } from './types'
import { paths } from '../../../routes/paths'

export const HEADER_ROUTES = {
  home: paths.home,
  catalog: paths.catalog,
  order: paths.order,
  reservation: paths.reservation,
  about: paths.about,
  locations: paths.locations,
  contact: paths.contact,
} as const

export const HEADER_NAV_ITEMS: HeaderNavItem[] = [
  { id: 'home', to: HEADER_ROUTES.home, labelKey: 'header.nav.home' },
  { id: 'catalog', to: HEADER_ROUTES.catalog, labelKey: 'header.nav.catalog' },
  { id: 'order', to: HEADER_ROUTES.order, labelKey: 'header.nav.order' },
  {
    id: 'reservation',
    to: HEADER_ROUTES.reservation,
    labelKey: 'header.nav.reservation',
  },
  { id: 'about', to: HEADER_ROUTES.about, labelKey: 'header.nav.about' },
  {
    id: 'locations',
    to: HEADER_ROUTES.locations,
    labelKey: 'header.nav.locations',
  },
  { id: 'contact', to: HEADER_ROUTES.contact, labelKey: 'header.nav.contact' },
]

/** Stub until cart state exists */
export const HEADER_CART_COUNT_STUB = 2
