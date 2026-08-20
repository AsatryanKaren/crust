import { useTranslation } from 'react-i18next'

import heroBackground from '../../../assets/images/heroback.jpg'
import { Button } from '../../../ui/Button'
import type { Props } from './types'
import styles from './styles.module.css'

export const HeroSection: Props = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.root}>
      <img
        src={heroBackground}
        alt={t('heroSection.imageAlt')}
        className={styles.heroImage}
      />
      <div className={styles.overlay} />
      <h1 className={styles.heading}>
        {t('heroSection.titleLine1')}
        <br />
        {t('heroSection.titleLine2')}
      </h1>
      <p className={styles.description}>
        {t('heroSection.descriptionLine1')}
        <br />
        {t('heroSection.descriptionLine2')}
      </p>
      <div className={styles.actions}>
        <Button variant="whiteFilled" size="large">
          {t('heroSection.orderPickup')}
        </Button>
        <Button variant="whiteMinimal" size="large">
          {t('heroSection.delivery')}
        </Button>
        <Button variant="whiteMinimal" size="large">
          {t('heroSection.reservation')}
        </Button>
      </div>
    </div>
  )
}
