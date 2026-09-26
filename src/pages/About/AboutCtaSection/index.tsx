import { ShoppingCartOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { paths } from '../../../routes/paths'
import { CTA_BACKGROUND } from './consts'
import type { Props } from './types'
import styles from './styles.module.css'

export const AboutCtaSection: Props = () => {
  const { t } = useTranslation()

  return (
    <section className={styles.root} aria-labelledby="about-cta-title">
      <img
        className={styles.background}
        src={CTA_BACKGROUND}
        alt={t('aboutCta.imageAlt')}
      />
      <div className={styles.overlay} />
      <h2 className={styles.heading} id="about-cta-title">
        {t('aboutCta.titleLine1')}
        <br />
        {t('aboutCta.titleLine2')}
      </h2>
      <Link className={styles.orderLink} to={paths.catalog}>
        {t('aboutCta.orderNow')}
        <ShoppingCartOutlined className={styles.cartIcon} aria-hidden />
      </Link>
    </section>
  )
}
