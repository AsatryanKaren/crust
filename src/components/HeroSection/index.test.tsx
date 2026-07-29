import { render, screen } from '@testing-library/react'

import HeroSection from './index'
import '../../i18n'

describe('HeroSection', () => {
  it('renders the hero heading', () => {
    render(<HeroSection />)

    expect(screen.getByText(/Freshly Baked,/)).toBeInTheDocument()
  })
})
