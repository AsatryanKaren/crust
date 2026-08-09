import { HeroSection } from '@/components/HeroSection'
import WhatWeOfferSection from './WhatWeOfferSection'

import type { Props } from './types'
import styles from './styles.module.css'

export const Home: Props = () => {
  return (
    <div className={styles.root}>
      <HeroSection />
      <WhatWeOfferSection />
    </div>
  )
}
