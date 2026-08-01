import { createBrowserRouter, redirect } from 'react-router-dom'

import { AppLayout } from '../components/Layout/AppLayout'
import { AdminGuard } from './guards/AdminGuard'
import { AuthGuard } from './guards/AuthGuard'
import { GuestGuard } from './guards/GuestGuard'
import {
  AboutPage,
  AccountOrdersPage,
  AccountPage,
  AdminAvailabilityPage,
  AdminCategoriesPage,
  AdminContentPage,
  AdminLocationsPage,
  AdminOrdersPage,
  AdminProductsPage,
  AdminReservationsPage,
  CartPage,
  CatalogPage,
  CheckoutPage,
  ContactPage,
  ForgotPasswordPage,
  HomePage,
  LocationsPage,
  LoginPage,
  NotFoundPage,
  OrderPage,
  PrivacyPolicyPage,
  ProductDetailsPage,
  RegisterPage,
  ReservationPage,
  ResetPasswordPage,
} from './lazyPages'
import { paths } from './paths'
import { RouteSuspense } from './RouteSuspense'

export const router = createBrowserRouter([
  {
    element: <RouteSuspense />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: paths.home, element: <HomePage /> },
          { path: paths.catalog, element: <CatalogPage /> },
          { path: paths.productDetails, element: <ProductDetailsPage /> },
          { path: paths.cart, element: <CartPage /> },
          { path: paths.order, element: <OrderPage /> },
          { path: paths.checkout, element: <CheckoutPage /> },
          { path: paths.reservation, element: <ReservationPage /> },
          { path: paths.locations, element: <LocationsPage /> },
          { path: paths.about, element: <AboutPage /> },
          { path: paths.contact, element: <ContactPage /> },
          { path: paths.privacyPolicy, element: <PrivacyPolicyPage /> },
          {
            element: <GuestGuard />,
            children: [
              { path: paths.login, element: <LoginPage /> },
              { path: paths.register, element: <RegisterPage /> },
              {
                path: paths.forgotPassword,
                element: <ForgotPasswordPage />,
              },
              {
                path: paths.resetPassword,
                element: <ResetPasswordPage />,
              },
            ],
          },
          {
            element: <AuthGuard />,
            children: [
              { path: paths.account, element: <AccountPage /> },
              {
                path: paths.accountOrders,
                element: <AccountOrdersPage />,
              },
            ],
          },
        ],
      },
      {
        path: paths.adminRoot,
        element: <AdminGuard />,
        children: [
          {
            index: true,
            loader: () => redirect(paths.adminProducts),
          },
          { path: 'products', element: <AdminProductsPage /> },
          { path: 'categories', element: <AdminCategoriesPage /> },
          { path: 'availability', element: <AdminAvailabilityPage /> },
          { path: 'orders', element: <AdminOrdersPage /> },
          { path: 'reservations', element: <AdminReservationsPage /> },
          { path: 'locations', element: <AdminLocationsPage /> },
          { path: 'content', element: <AdminContentPage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
