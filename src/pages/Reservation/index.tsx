// import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import img from '../../assets/images/reserveTable.jpg';
import overlay from '../../assets/images/Overlay.png';
import icon from "../../assets/images/Icon.png"

import type { Props } from './types'
import styles from './styles.module.css'

export const Reservation: Props = () => {

  const { t } = useTranslation()
  // const { register, handleSubmit } = useForm()

  return (
    <div className={styles.container}>
     
      <form className={styles.form}>
        <div className={styles.infoPanel}>

          <div className={styles.titleGroup}>
            <h1 className={styles.heading}>{t('pages.reservation.title')}</h1>
            <p className={styles.text}>{t('pages.reservation.description')}</p>
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="location">{t('pages.reservation.location')}</label>
            <select id="location" className={styles.select}>
              <option value="abovyan">Abovyan St</option>
              <option value="arami">Arami St</option>
            </select>
          </div>

          <div className={styles.field}>
            <span id="guests-label" className={styles.fieldLabel}>{t('pages.reservation.guests')}</span>
            <div role="group" aria-labelledby="guests-label" id='guests' className={styles.guests}>
              <button type="button">1</button>
              <button type="button">2</button>
              <button type="button">3</button>
              <button type="button">4</button>
              <button type="button">5</button>
              <button type="button">6+</button>
            </div>
          </div>

          <div className={styles.field}>
            <span id="date-label" className={styles.fieldLabel}>{t('pages.reservation.date')}</span>
            <div role="group" aria-labelledby="date-label" id='date' className={styles.date}>

            </div>
          </div>

          <div className={styles.field}>
            <span id="time-label" className={styles.fieldLabel}>{t('pages.reservation.time')}</span>
            <div role="group" aria-labelledby="time-label" id='time' className={styles.time}>

            </div>
          </div>

          <div className={styles.inputFields}>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="name">{t('pages.reservation.fullName')}</label>
              <input id='name' type="text" className={styles.input} placeholder={t('pages.reservation.fullNamePlaceholder')} />
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="phone">{t('pages.reservation.phoneNumber')}</label>
              <input id='phone' type="tel" className={styles.input} placeholder={t('pages.reservation.phonePlaceholder')} />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="comment">{t('pages.reservation.specialRequests')}</label>
            <textarea placeholder={t('pages.reservation.specialRequestsPlaceholder')} name="comment" id="comment" className={styles.textarea}></textarea>
          </div>
        </div>

        <div className={styles.confirmationPanel}>

          <img src={img} alt="reservation table" className={styles.atmosphereImage} />
          <div className={styles.selectionCard}>
            <img src={overlay} alt="fork image" className={styles.selectionIcon} />
            <h2 className={styles.selectionTitle}>{t('pages.reservation.yourSelection')}</h2>
            <p className={styles.selectionSummary}></p>
            <p className={styles.cancellationNote}><img src={icon} alt="icon"  />{t('pages.reservation.freeCancellation')}</p>
            <button type="submit" className={styles.confirmButton}>{t('pages.reservation.confirmButton')}</button>
          </div>
          <p className={styles.disclaimer}>{t('pages.reservation.disclaimer')}</p>
        </div>
      </form>
    </div>
  )
}
