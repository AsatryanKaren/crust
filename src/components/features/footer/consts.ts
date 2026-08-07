import type { FooterColumnItem } from './types'
import facebookIcon from '../../../assets/images/Facebook.png'
import telegramIcon from '../../../assets/images/Telegram.png'
import { paths } from '../../../routes/paths'

export const FOOTER_ROUTES = {
  catalog: paths.catalog,
  order: paths.order,
  reservation: paths.reservation,
  delivery: paths.order,
  allergens: paths.allergens,
  payment: paths.payment,
  refund: paths.refund,
  privacyPolicy: paths.privacyPolicy,
  terms: paths.terms,
} as const

export const FOOTER_SOCIAL_LINKS = [
  { id: 'telegram', href: 'https://t.me/crustbakery', icon: telegramIcon },
  { id: 'facebook', href: 'https://facebook.com/crustbakery', icon: facebookIcon },
] as const

export const FOOTER_CONTACT_ITEMS: FooterColumnItem[] = [
  { kind: 'text', labelKey: 'footer.contact.city' },
  { kind: 'text', labelKey: 'footer.contact.street' },
  { kind: 'text', labelKey: 'footer.contact.email' },
  { kind: 'text', labelKey: 'footer.contact.phone' },
]

export const FOOTER_OFFER_ITEMS: FooterColumnItem[] = [
  { kind: 'link', labelKey: 'footer.offer.catalog', to: FOOTER_ROUTES.catalog },
  { kind: 'link', labelKey: 'footer.offer.order', to: FOOTER_ROUTES.order },
  {
    kind: 'link',
    labelKey: 'footer.offer.reservation',
    to: FOOTER_ROUTES.reservation,
  },
  {
    kind: 'link',
    labelKey: 'footer.offer.delivery',
    to: FOOTER_ROUTES.delivery,
  },
]

export const FOOTER_LINKS_ITEMS: FooterColumnItem[] = [
  {
    kind: 'link',
    labelKey: 'footer.links.allergens',
    to: FOOTER_ROUTES.allergens,
  },
  { kind: 'link', labelKey: 'footer.links.payment', to: FOOTER_ROUTES.payment },
  { kind: 'link', labelKey: 'footer.links.refund', to: FOOTER_ROUTES.refund },
]
