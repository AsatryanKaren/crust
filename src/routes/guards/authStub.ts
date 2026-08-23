export type AuthRole = 'guest' | 'customer' | 'admin'

export type AuthStubState = {
  isAuthenticated: boolean
  role: AuthRole
}

/** Temporary auth stand-in until a real session layer exists. */
export const getAuthStub = (): AuthStubState => ({
  isAuthenticated: true,
  role: 'customer',
})
