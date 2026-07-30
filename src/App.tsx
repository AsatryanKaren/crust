import HeroSection from './components/HeroSection'
import { AppLayout } from './components/Layout/AppLayout'
import WhatWeOfferSection from './components/WhatWeOfferSection'

function App() {
  return (
    <AppLayout>
      <HeroSection />
      <WhatWeOfferSection />
    </AppLayout>
  )
}

export default App
