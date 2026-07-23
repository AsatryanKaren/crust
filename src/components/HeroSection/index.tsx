import styles from './style.module.css';
import { useTranslation } from 'react-i18next'
import heroBackground from '../../images/heroback.jpg'
import Button from '../../ui/buttons/Button'


export default function HeroSection() {

    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <img src={heroBackground} alt="background-image" className={styles.heroImage} />
            <div className={styles.overlay} />
            <h1>{t('heroSection.header-1st-line')} <br />{t('heroSection.header-2nd-line')}</h1>
            <p>{t('heroSection.p-1st-line')} <br />
                {t('heroSection.p-2nd-line')}</p>
            <div className={styles.btnContainer}>
                <Button variant="whiteFilled" size="large">{t('heroSection.btn-order-pickup')}</Button>
                <Button variant="whiteMinimal" size="large">{t('heroSection.btn-delivery')}</Button>
                <Button variant="whiteMinimal" size="large">{t('heroSection.btn-reservation')}</Button>
            </div>
        </div>
    )
}