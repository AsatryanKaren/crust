import { ClockCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { paths } from '../../../routes/paths'
import {
  formatDayOfMonth,
  formatMonthShort,
  formatTime,
} from '../../../utils/formatAccount'
import type { Props } from './types'
import styles from './styles.module.css'

export const ReservationCard: Props = ({ reservation }) => {
  const { t, i18n } = useTranslation()
  const month = formatMonthShort(reservation.startsAt, i18n.language)
  const day = formatDayOfMonth(reservation.startsAt, i18n.language)
  const time = formatTime(reservation.startsAt, i18n.language)
  const location = t(reservation.locationNameKey)

  return (
    <article className={styles.root}>
      <div className={styles.dateBlock}>
        <span className={styles.month}>{month}</span>
        <span className={styles.day}>{day}</span>
      </div>
      <div className={styles.details}>
        <p className={styles.title}>
          {t('account.reservations.tableFor', {
            count: reservation.guestCount,
          })}
        </p>
        <p className={styles.meta}>
          <ClockCircleOutlined aria-hidden />
          <span>
            {time} • {location}
          </span>
        </p>
      </div>
      <span className={styles.status}>
        {t(`account.reservations.status.${reservation.status}`)}
      </span>
      <Link className={styles.manage} to={paths.accountReservations}>
        {t('account.reservations.manage')}
      </Link>
    </article>
  )
}
