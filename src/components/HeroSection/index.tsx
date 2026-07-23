import styles from './style.module.css';
import { useTranslation } from 'react-i18next'


export default function HeroSection() {

    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <h1>{t('heroSection.header-1st-line')} <br />{t('heroSection.header-2nd-line')}</h1>
            <p>{t('heroSection.p-1st-line')} <br />
                {t('heroSection.p-2nd-line')}</p>
            <button>{t('heroSection.btn-order-pickup')}</button>
            <button>{t('heroSection.btn-delivery')}</button>
            <button>{t('heroSection.btn-reservation')} </button>
        </div>
    )
}