import { useTranslation } from 'react-i18next'

import type { Props } from './types'
import styles from './styles.module.css'

export const PromoBanner: Props = ({
  imageSrc,
  titleKey,
  bodyKey,
  imageAltKey,
  badgeKey,
}) => {
  const { t } = useTranslation()

  return (
    <article className={styles.root}>
      <img className={styles.image} src={imageSrc} alt={t(imageAltKey)} />
      <div className={styles.overlay} />
      <div className={styles.copy}>
        <span className={styles.badge}>{t(badgeKey)}</span>
        <h2 className={styles.title}>{t(titleKey)}</h2>
        <p className={styles.body}>{t(bodyKey)}</p>
      </div>
    </article>
  )
}
