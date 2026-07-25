import type { FooterColumnItem } from './types'
import facebookIcon from '../../../assets/images/Facebook.png'
import telegramIcon from '../../../assets/images/Telegram.png'

export const FOOTER_ROUTES = {
  catalog: '/catalog',
  order: '/order',
  reservation: '/reservation',
  privacyPolicy: '/privacy-policy',
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

export const FOOTER_ABOUT_ITEMS: FooterColumnItem[] = [
  { kind: 'link', labelKey: 'footer.about.catalog', to: FOOTER_ROUTES.catalog },
  { kind: 'link', labelKey: 'footer.about.order', to: FOOTER_ROUTES.order },
  {
    kind: 'link',
    labelKey: 'footer.about.reservation',
    to: FOOTER_ROUTES.reservation,
  },
]
