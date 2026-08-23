import { CheckCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { paths } from '../../../routes/paths'
import { Button } from '../../../ui/Button'
import { formatAmount, formatMediumDate } from '../../../utils/formatAccount'
import type { Props } from './types'
import styles from './styles.module.css'

export const OrderCard: Props = ({ order }) => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const date = formatMediumDate(order.placedAt, i18n.language)
  const total = formatAmount(order.total, i18n.language, order.currency)
  const isCompleted = order.status === 'completed'

  return (
    <article className={styles.root}>
      <div className={styles.field}>
        <span className={styles.label}>{t('account.orders.orderNumber')}</span>
        <span className={styles.value}>#{order.orderNumber}</span>
      </div>
      <div className={styles.field}>
        <span className={styles.label}>{t('account.orders.date')}</span>
        <span className={styles.value}>{date}</span>
      </div>
      <div className={styles.field}>
        <span className={styles.label}>{t('account.orders.statusLabel')}</span>
        <span
          className={`${styles.status} ${isCompleted ? styles.statusDone : styles.statusTransit}`}
        >
          {isCompleted ? (
            <CheckCircleOutlined aria-hidden />
          ) : (
            <span className={styles.dot} aria-hidden />
          )}
          {t(`account.orders.status.${order.status}`)}
        </span>
      </div>
      <div className={styles.field}>
        <span className={styles.label}>{t('account.orders.total')}</span>
        <span className={styles.total}>
          {t('account.orders.totalValue', { amount: total })}
        </span>
      </div>
      <div className={styles.actions}>
        <Link className={styles.details} to={paths.order}>
          {t('account.orders.viewDetails')}
        </Link>
        <Button
          variant="primary"
          size="small"
          onClick={() => {
            navigate(paths.catalog)
          }}
        >
          {t('account.orders.orderAgain')}
        </Button>
      </div>
    </article>
  )
}
