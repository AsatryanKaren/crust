import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@tanstack/react-query';
import { message } from 'antd';
import img from '@/assets/images/reserveTable.jpg';
import overlay from '@/assets/images/Overlay.png';
import icon from "@/assets/images/Icon.png"
import type { Props, ReservationDetails, ReservationPayload } from './types'
import styles from './styles.module.css'

const GUEST_OPTIONS = ['1', '2', '3', '4', '5', '6+']

const LOCATION_OPTIONS = [
  { value: 'abovyan', label: 'Abovyan St' },
  { value: 'arami', label: 'Arami St' },
]

export const Reservation: Props = () => {

  const { t } = useTranslation()

  const { register, handleSubmit, watch, setValue, reset } = useForm<ReservationPayload>({
    defaultValues: {
      location: LOCATION_OPTIONS[0].value,
      guests: '',
      date: '',
      time: '',
      fullName: '',
      phone: '',
      comment: '',
    },
  })

  const location = watch('location')
  const guestCount = watch('guests')
  const selectesDay = watch('date')
  const selectedTime = watch('time')

  const { data: reservationDetails } = useQuery({
    queryKey: ['reservation-details'],
    queryFn: () =>
      fetch('/api/reservation').then((res) => res.json() as Promise<ReservationDetails>),
  });

  const submitReservation = useMutation({
    mutationFn: (payload: ReservationPayload) =>
      fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).then((res) => res.json()),
    onSuccess: () => {
      message.success(t('pages.reservation.successMessage'))
      reset()
    },
  })

  const findSelectedDay = reservationDetails?.dates.find((date)=> date.day === selectesDay)
  const locationLabel = LOCATION_OPTIONS.find((option) => option.value === location)?.label

  const onSubmit = (values: ReservationPayload) => {
    submitReservation.mutate(values)
  }

  return (
    <div className={styles.container}>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.infoPanel}>

          <div className={styles.titleGroup}>
            <h1 className={styles.heading}>{t('pages.reservation.title')}</h1>
            <p className={styles.text}>{t('pages.reservation.description')}</p>
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="location">{t('pages.reservation.location')}</label>
            <select
              id="location"
              className={styles.select}
              {...register('location')}
            >
              {LOCATION_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <span id="guests-label" className={styles.fieldLabel}>{t('pages.reservation.guests')}</span>
            <div role="group" aria-labelledby="guests-label" id='guests' className={styles.guests}>
              {GUEST_OPTIONS.map((value) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => setValue('guests', value)}
                  className={value === guestCount ? styles.selected : undefined}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <span id="date-label" className={styles.fieldLabel}>{t('pages.reservation.date')}</span>
            <div role="group" aria-labelledby="date-label" id='date' className={styles.date}>
              {reservationDetails?.dates.map(({ day }) => (
                <button
                  onClick={() => setValue('date', day)}
                  type="button"
                  key={day}
                  className={day === selectesDay ? styles.selected : undefined}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <span id="time-label" className={styles.fieldLabel}>{t('pages.reservation.time')}</span>
            <div role="group" aria-labelledby="time-label" id='time' className={styles.time}>
              {findSelectedDay?.times.map((time)=>(
                <button
                  type='button'
                  key={time}
                  onClick={() => setValue('time', time)}
                  className={time === selectedTime ? styles.selected : undefined}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.inputFields}>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="name">{t('pages.reservation.fullName')}</label>
              <input id='name' type="text" className={styles.input} placeholder={t('pages.reservation.fullNamePlaceholder')} {...register('fullName')} />
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="phone">{t('pages.reservation.phoneNumber')}</label>
              <input id='phone' type="tel" className={styles.input} placeholder={t('pages.reservation.phonePlaceholder')} {...register('phone')} />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="comment">{t('pages.reservation.specialRequests')}</label>
            <textarea placeholder={t('pages.reservation.specialRequestsPlaceholder')} id="comment" className={styles.textarea} {...register('comment')}></textarea>
          </div>
        </div>

        <div className={styles.confirmationPanel}>

          <div className={styles.atmosphereWrapper}>
            <img src={img} alt="reservation table" className={styles.atmosphereImage} />
            <p className={styles.atmosphereLabel}>{t('pages.reservation.atmosphereLabel')}</p>
            <p className={styles.atmosphereLocation}>{t('pages.reservation.atmosphereLocation')}</p>
          </div>
          <div className={styles.selectionCard}>
            <img src={overlay} alt="fork image" className={styles.selectionIcon} />
            <h2 className={styles.selectionTitle}>{t('pages.reservation.yourSelection')}</h2>
            <p className={styles.selectionSummary}>
              {guestCount && selectesDay && selectedTime && locationLabel
                ? t('pages.reservation.selectionSummary', {
                    guests: guestCount,
                    date: selectesDay,
                    time: selectedTime,
                    location: locationLabel,
                  })
                : null}
            </p>
            <p className={styles.cancellationNote}><img src={icon} alt="icon" />{t('pages.reservation.freeCancellation')}</p>
            <button type="submit" className={styles.confirmButton}>{t('pages.reservation.confirmButton')}</button>
          </div>
          <p className={styles.disclaimer}>{t('pages.reservation.disclaimer')}</p>
        </div>
      </form>
    </div>
  )
}
