import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

describe('App', () => {
  it('renders the setup title', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    )

    expect(screen.getByText('Bakery project — setup ready')).toBeInTheDocument()
  })
})
