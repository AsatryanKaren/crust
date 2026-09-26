import { AboutCtaSection } from './AboutCtaSection'
import { OurPhilosophySection } from './OurPhilosophySection'
import { OurStorySection } from './OurStorySection'
import type { Props } from './types'
import styles from './styles.module.css'

export const About: Props = () => {
  return (
    <div className={styles.root}>
      <OurStorySection />
      <OurPhilosophySection />
      <AboutCtaSection />
    </div>
  )
}
