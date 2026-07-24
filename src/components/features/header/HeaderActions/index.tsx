import { HeartOutlined, SearchOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import { HeaderCart } from '../HeaderCart'
import type { Props } from './types'
import styles from './styles.module.css'

export const HeaderActions: Props = ({ cartCount = 0 }) => {
  const { t } = useTranslation()

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={`${styles.iconButton} ${styles.desktopOnly}`}
        aria-label={t('header.search')}
      >
        <SearchOutlined aria-hidden />
      </button>
      <button
        type="button"
        className={`${styles.iconButton} ${styles.desktopOnly}`}
        aria-label={t('header.wishlist')}
      >
        <HeartOutlined aria-hidden />
      </button>
      <HeaderCart count={cartCount} />
    </div>
  )
}
