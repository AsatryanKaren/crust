import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import type { Props } from './types'
import styles from './styles.module.css'

export const FooterColumn: Props = ({ titleKey, items }) => {
  const { t } = useTranslation()

  return (
    <section className={styles.root}>
      <h2 className={styles.title}>{t(titleKey)}</h2>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.labelKey} className={styles.item}>
            {item.kind === 'link' ? (
              <Link className={styles.link} to={item.to}>
                {t(item.labelKey)}
              </Link>
            ) : (
              <span>{t(item.labelKey)}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
