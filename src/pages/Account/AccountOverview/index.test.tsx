import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import '../../../i18n'
import { AccountOverview } from './index'

describe('AccountOverview', () => {
  it('renders the welcome heading with the given name', () => {
    render(
      <MemoryRouter>
        <AccountOverview firstName="Anush" />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'Account Overview' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Welcome back, Anush. Manage your orders and table bookings below.',
      ),
    ).toBeInTheDocument()
  })
})
