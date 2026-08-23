import { Alert, Empty, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import {
  useAccountOrders,
  useAccountProfile,
  useCurrentReservations,
} from '../../../hooks/useAccount'
import { paths } from '../../../routes/paths'
import { AccountOverview } from '../AccountOverview'
import { OrderCard } from '../OrderCard'
import { PromoBanner } from '../PromoBanner'
import { ReservationCard } from '../ReservationCard'
import { ACCOUNT_PROMO } from './consts'
import type { Props } from './types'
import styles from './styles.module.css'

export const Overview: Props = () => {
  const { t } = useTranslation()
  const profileQuery = useAccountProfile()
  const ordersQuery = useAccountOrders()
  const reservationsQuery = useCurrentReservations()

  const isPending =
    profileQuery.isPending ||
    ordersQuery.isPending ||
    reservationsQuery.isPending
  const isError =
    profileQuery.isError || ordersQuery.isError || reservationsQuery.isError

  if (isPending) {
    return (
      <div className={styles.state}>
        <Spin />
      </div>
    )
  }

  if (isError || !profileQuery.data) {
    return <Alert type="error" showIcon message={t('account.errors.load')} />
  }

  const reservations = reservationsQuery.data ?? []
  const orders = ordersQuery.data ?? []

  return (
    <div className={styles.root}>
      <AccountOverview firstName={profileQuery.data.firstName} />

      <section
        className={styles.section}
        aria-labelledby="account-reservations"
      >
        <h2 id="account-reservations" className={styles.sectionTitle}>
          {t('account.reservations.title')}
        </h2>
        {reservations.length === 0 ? (
          <Empty description={t('account.reservations.empty')} />
        ) : (
          <div className={styles.list}>
            {reservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))}
          </div>
        )}
      </section>

      <section className={styles.section} aria-labelledby="account-orders">
        <div className={styles.sectionHeader}>
          <h2 id="account-orders" className={styles.sectionTitle}>
            {t('account.orders.title')}
          </h2>
          <Link className={styles.viewAll} to={paths.accountOrders}>
            {t('account.orders.viewAll')}
          </Link>
        </div>
        {orders.length === 0 ? (
          <Empty description={t('account.orders.empty')} />
        ) : (
          <div className={styles.list}>
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </section>

      <PromoBanner
        imageSrc={ACCOUNT_PROMO.imageSrc}
        titleKey={ACCOUNT_PROMO.titleKey}
        bodyKey={ACCOUNT_PROMO.bodyKey}
        imageAltKey={ACCOUNT_PROMO.imageAltKey}
        badgeKey={ACCOUNT_PROMO.badgeKey}
      />
    </div>
  )
}
