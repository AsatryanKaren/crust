import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import type { Props } from './types'
import styles from './styles.module.css'

export const BrandName: Props = () => {
  const { t } = useTranslation()

  return (
    <Link className={styles.root} to="/">
      {t('brand')}
    </Link>
  )
}
