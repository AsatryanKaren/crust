import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { FOOTER_ROUTES } from '../consts'
import type { Props } from './types'
import styles from './styles.module.css'

export const FooterBottom: Props = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.root}>
      <Link className={styles.link} to={FOOTER_ROUTES.privacyPolicy}>
        {t('footer.privacyPolicy')}
      </Link>
      <Link className={styles.link} to={FOOTER_ROUTES.terms}>
        {t('footer.termsAndConditions')}
      </Link>
    </div>
  )
}
