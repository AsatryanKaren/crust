import { useTranslation } from 'react-i18next'

import type { Props } from './types'
import styles from './styles.module.css'

export const FooterBrand: Props = () => {
  const { t } = useTranslation()

  return <p className={styles.root}>{t('footer.brand')}</p>
}
