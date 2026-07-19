import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  it('renders the setup title', () => {
    render(<App />)

    expect(screen.getByText('Bakery project — setup ready')).toBeInTheDocument()
  })
})
