import { Navigate, Outlet } from 'react-router-dom'

import { loginWithRedirect, paths } from '../../paths'
import { getAuthStub } from '../authStub'
import type { Props } from './types'

export const AdminGuard: Props = () => {
  const { isAuthenticated, role } = getAuthStub()

  if (!isAuthenticated) {
    return (
      <Navigate replace to={loginWithRedirect(paths.adminProducts)} />
    )
  }

  if (role !== 'admin') {
    return <Navigate replace to={paths.home} />
  }

  return <Outlet />
}
