import { Tag } from 'antd'
import { useTranslation } from 'react-i18next'

import type { Props } from './types'
import styles from './styles.module.css'

export const StatusBadge: Props = ({ status }) => {
  const { t } = useTranslation()
  const isAvailable = status === 'available'

  return (
    <Tag
      className={`${styles.root} ${isAvailable ? styles.available : styles.unavailable}`}
      variant="filled"
    >
      {t(`pages.catalog.status.${status}`)}
    </Tag>
  )
}
