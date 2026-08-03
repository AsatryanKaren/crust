import { Navigate, Outlet, useSearchParams } from 'react-router-dom'

import { getSafeRedirectPath, paths } from '../../paths'
import { getAuthStub } from '../authStub'
import type { Props } from './types'

export const GuestGuard: Props = () => {
  const [searchParams] = useSearchParams()
  const { isAuthenticated } = getAuthStub()

  if (isAuthenticated) {
    const redirect = getSafeRedirectPath(
      searchParams.get('redirect'),
      paths.account,
    )
    return <Navigate replace to={redirect} />
  }

  return <Outlet />
}
