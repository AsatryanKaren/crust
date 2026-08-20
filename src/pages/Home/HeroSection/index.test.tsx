import { render, screen } from '@testing-library/react'

import '../../../i18n'
import { HeroSection } from './index'

describe('HeroSection', () => {
  it('renders the hero heading', () => {
    render(<HeroSection />)

    expect(screen.getByText(/Freshly Baked,/)).toBeInTheDocument()
  })
})
