import { useTranslation } from 'react-i18next'

import type { Props } from './types'
import styles from './styles.module.css'

export const PageShell: Props = ({ titleKey, descriptionKey }) => {
  const { t } = useTranslation()

  return (
    <section className={styles.root}>
      <h1 className={styles.title}>{t(titleKey)}</h1>
      <p className={styles.description}>{t(descriptionKey)}</p>
    </section>
  )
}
