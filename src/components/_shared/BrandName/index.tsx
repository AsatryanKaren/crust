import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { paths } from '../../../routes/paths'
import type { Props } from './types'
import styles from './styles.module.css'

export const BrandName: Props = () => {
  const { t } = useTranslation()

  return (
    <Link className={styles.root} to={paths.home}>
      {t('brand')}
    </Link>
  )
}
