import { useTranslation } from 'react-i18next'

import { PhilosophyCard } from './components/PhilosophyCard'
import { PHILOSOPHY_IDS } from './consts'
import type { Props } from './types'
import styles from './styles.module.css'

export const OurPhilosophySection: Props = () => {
  const { t } = useTranslation()

  return (
    <section className={styles.root} aria-labelledby="about-philosophy-title">
      <h2 className={styles.title} id="about-philosophy-title">
        {t('aboutPhilosophy.title')}
      </h2>
      <div className={styles.grid}>
        {PHILOSOPHY_IDS.map((philosophyId) => (
          <PhilosophyCard key={philosophyId} philosophyId={philosophyId} />
        ))}
      </div>
    </section>
  )
}
