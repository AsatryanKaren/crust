import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Input, message, Radio, Select } from 'antd';
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

  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<ReservationPayload>({
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
            <Controller
              name="location"
              control={control}
              rules={{ required: t('pages.reservation.errors.locationRequired') }}
              render={({ field }) => (
                <Select
                  {...field}
                  id="location"
                  className={styles.select}
                  classNames={{ popup: { root: styles.selectDropdown } }}
                  options={LOCATION_OPTIONS.map(({ value, label }) => ({ value, label }))}
                />
              )}
            />
            {errors.location && <p className={styles.errorMessage} role="alert">{errors.location.message}</p>}
          </div>

          <div className={styles.field}>
            <span id="guests-label" className={styles.fieldLabel}>{t('pages.reservation.guests')}</span>
            <Controller
              name="guests"
              control={control}
              rules={{ required: t('pages.reservation.errors.guestsRequired') }}
              render={({ field }) => (
                <Radio.Group
                  {...field}
                  optionType="button"
                  aria-labelledby="guests-label"
                  id='guests'
                  className={styles.guests}
                  options={GUEST_OPTIONS.map((value) => ({ label: value, value }))}
                />
              )}
            />
            {errors.guests && <p className={styles.errorMessage} role="alert">{errors.guests.message}</p>}
          </div>

          <div className={styles.field}>
            <span id="date-label" className={styles.fieldLabel}>{t('pages.reservation.date')}</span>
            <Controller
              name="date"
              control={control}
              rules={{ required: t('pages.reservation.errors.dateRequired') }}
              render={({ field }) => (
                <Radio.Group
                  {...field}
                  optionType="button"
                  aria-labelledby="date-label"
                  id='date'
                  className={styles.date}
                  options={reservationDetails?.dates.map(({ day }) => ({ label: day, value: day })) ?? []}
                />
              )}
            />
            {errors.date && <p className={styles.errorMessage} role="alert">{errors.date.message}</p>}
          </div>

          <div className={styles.field}>
            <span id="time-label" className={styles.fieldLabel}>{t('pages.reservation.time')}</span>
            <Controller
              name="time"
              control={control}
              rules={{ required: t('pages.reservation.errors.timeRequired') }}
              render={({ field }) => (
                <Radio.Group
                  {...field}
                  optionType="button"
                  aria-labelledby="time-label"
                  id='time'
                  className={styles.time}
                  options={findSelectedDay?.times.map((time) => ({ label: time, value: time })) ?? []}
                />
              )}
            />
            {errors.time && <p className={styles.errorMessage} role="alert">{errors.time.message}</p>}
          </div>

          <div className={styles.inputFields}>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="name">{t('pages.reservation.fullName')}</label>
              <Controller
                name="fullName"
                control={control}
                rules={{ required: t('pages.reservation.errors.fullNameRequired') }}
                render={({ field }) => (
                  <Input {...field} id='name' type="text" className={styles.input} placeholder={t('pages.reservation.fullNamePlaceholder')} />
                )}
              />
              {errors.fullName && <p className={styles.errorMessage} role="alert">{errors.fullName.message}</p>}
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="phone">{t('pages.reservation.phoneNumber')}</label>
              <Controller
                name="phone"
                control={control}
                rules={{ required: t('pages.reservation.errors.phoneRequired') }}
                render={({ field }) => (
                  <Input {...field} id='phone' type="tel" className={styles.input} placeholder={t('pages.reservation.phonePlaceholder')} />
                )}
              />
              {errors.phone && <p className={styles.errorMessage} role="alert">{errors.phone.message}</p>}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="comment">{t('pages.reservation.specialRequests')}</label>
            <Controller
              name="comment"
              control={control}
              render={({ field }) => (
                <Input.TextArea {...field} placeholder={t('pages.reservation.specialRequestsPlaceholder')} id="comment" className={styles.textarea} />
              )}
            />
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
            <Button htmlType="submit" className={styles.confirmButton}>{t('pages.reservation.confirmButton')}</Button>
          </div>
          <p className={styles.disclaimer}>{t('pages.reservation.disclaimer')}</p>
        </div>
      </form>
    </div>
  )
}
