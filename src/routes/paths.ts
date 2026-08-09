export const paths = {
  home: '/',
  catalog: '/catalog',
  productDetails: '/catalog/:productId',
  cart: '/cart',
  order: '/order',
  checkout: '/checkout',
  reservation: '/reservation',
  locations: '/locations',
  about: '/about',
  contact: '/contact',
  privacyPolicy: '/privacy-policy',
  allergens: '/allergens',
  payment: '/payment',
  refund: '/refund',
  terms: '/terms-and-conditions',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  account: '/account',
  accountOrders: '/account/orders',
  adminRoot: '/admin',
  adminProducts: '/admin/products',
  adminCategories: '/admin/categories',
  adminAvailability: '/admin/availability',
  adminOrders: '/admin/orders',
  adminReservations: '/admin/reservations',
  adminLocations: '/admin/locations',
  adminContent: '/admin/content',
} as const

export const productDetailsPath = (productId: string): string =>
  `/catalog/${productId}`

export const loginWithRedirect = (from: string): string =>
  `${paths.login}?redirect=${encodeURIComponent(from)}`

/** Accept only same-app relative paths (reject protocol-relative / absolute URLs). */
export const getSafeRedirectPath = (
  redirect: string | null,
  fallback: string = paths.home,
): string => {
  if (!redirect) {
    return fallback
  }

  if (!redirect.startsWith('/') || redirect.startsWith('//')) {
    return fallback
  }

  return redirect
}
