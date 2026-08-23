import { useTranslation } from 'react-i18next'

import type { Props } from './types'
import styles from './styles.module.css'

export const AccountOverview: Props = ({ firstName }) => {
  const { t } = useTranslation()

  return (
    <header className={styles.root}>
      <h1 className={styles.title}>{t('account.overview.title')}</h1>
      <p className={styles.welcome}>
        {t('account.overview.welcome', { name: firstName })}
      </p>
    </header>
  )
}
