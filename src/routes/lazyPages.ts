import { lazy } from 'react'

export const HomePage = lazy(() =>
  import('../pages/Home').then((module) => ({ default: module.Home })),
)

export const CatalogPage = lazy(() =>
  import('../pages/Catalog').then((module) => ({ default: module.Catalog })),
)

export const ProductDetailsPage = lazy(() =>
  import('../pages/ProductDetails').then((module) => ({
    default: module.ProductDetails,
  })),
)

export const CartPage = lazy(() =>
  import('../pages/Cart').then((module) => ({ default: module.Cart })),
)

export const OrderPage = lazy(() =>
  import('../pages/Order').then((module) => ({ default: module.Order })),
)

export const CheckoutPage = lazy(() =>
  import('../pages/Checkout').then((module) => ({ default: module.Checkout })),
)

export const ReservationPage = lazy(() =>
  import('../pages/Reservation').then((module) => ({
    default: module.Reservation,
  })),
)

export const LocationsPage = lazy(() =>
  import('../pages/Locations').then((module) => ({
    default: module.Locations,
  })),
)

export const AboutPage = lazy(() =>
  import('../pages/About').then((module) => ({ default: module.About })),
)

export const ContactPage = lazy(() =>
  import('../pages/Contact').then((module) => ({ default: module.Contact })),
)

export const PrivacyPolicyPage = lazy(() =>
  import('../pages/PrivacyPolicy').then((module) => ({
    default: module.PrivacyPolicy,
  })),
)

export const AllergensPage = lazy(() =>
  import('../pages/Allergens').then((module) => ({
    default: module.Allergens,
  })),
)

export const PaymentPage = lazy(() =>
  import('../pages/Payment').then((module) => ({
    default: module.Payment,
  })),
)

export const RefundPage = lazy(() =>
  import('../pages/Refund').then((module) => ({
    default: module.Refund,
  })),
)

export const TermsAndConditionsPage = lazy(() =>
  import('../pages/TermsAndConditions').then((module) => ({
    default: module.TermsAndConditions,
  })),
)

export const LoginPage = lazy(() =>
  import('../pages/Auth/Login').then((module) => ({ default: module.Login })),
)

export const RegisterPage = lazy(() =>
  import('../pages/Auth/Register').then((module) => ({
    default: module.Register,
  })),
)

export const ForgotPasswordPage = lazy(() =>
  import('../pages/Auth/ForgotPassword').then((module) => ({
    default: module.ForgotPassword,
  })),
)

export const ResetPasswordPage = lazy(() =>
  import('../pages/Auth/ResetPassword').then((module) => ({
    default: module.ResetPassword,
  })),
)

export const AccountPage = lazy(() =>
  import('../pages/Account').then((module) => ({ default: module.Account })),
)

export const AccountOverviewPage = lazy(() =>
  import('../pages/Account/Overview').then((module) => ({
    default: module.Overview,
  })),
)

export const AccountOrdersPage = lazy(() =>
  import('../pages/Account/Orders').then((module) => ({
    default: module.Orders,
  })),
)

export const AccountFavoritesPage = lazy(() =>
  import('../pages/Account/Favorites').then((module) => ({
    default: module.Favorites,
  })),
)

export const AccountReservationsPage = lazy(() =>
  import('../pages/Account/Reservations').then((module) => ({
    default: module.Reservations,
  })),
)

export const AccountAddressesPage = lazy(() =>
  import('../pages/Account/Addresses').then((module) => ({
    default: module.Addresses,
  })),
)

export const AdminProductsPage = lazy(() =>
  import('../pages/Admin/Products').then((module) => ({
    default: module.Products,
  })),
)

export const AdminCategoriesPage = lazy(() =>
  import('../pages/Admin/Categories').then((module) => ({
    default: module.Categories,
  })),
)

export const AdminAvailabilityPage = lazy(() =>
  import('../pages/Admin/Availability').then((module) => ({
    default: module.Availability,
  })),
)

export const AdminOrdersPage = lazy(() =>
  import('../pages/Admin/Orders').then((module) => ({
    default: module.Orders,
  })),
)

export const AdminReservationsPage = lazy(() =>
  import('../pages/Admin/Reservations').then((module) => ({
    default: module.Reservations,
  })),
)

export const AdminLocationsPage = lazy(() =>
  import('../pages/Admin/Locations').then((module) => ({
    default: module.Locations,
  })),
)

export const AdminContentPage = lazy(() =>
  import('../pages/Admin/Content').then((module) => ({
    default: module.Content,
  })),
)

export const NotFoundPage = lazy(() =>
  import('../pages/NotFound').then((module) => ({
    default: module.NotFound,
  })),
)
