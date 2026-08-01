import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { loginWithRedirect } from '../../paths'
import { getAuthStub } from '../authStub'
import type { Props } from './types'

export const AuthGuard: Props = () => {
  const location = useLocation()
  const { isAuthenticated } = getAuthStub()

  if (!isAuthenticated) {
    return (
      <Navigate
        replace
        to={loginWithRedirect(`${location.pathname}${location.search}`)}
      />
    )
  }

  return <Outlet />
}
