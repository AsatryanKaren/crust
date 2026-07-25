import { ShoppingCartOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import type { Props } from './types'
import styles from './styles.module.css'

export const HeaderCart: Props = ({ count = 0 }) => {
  const { t } = useTranslation()

  return (
    <button
      type="button"
      className={styles.root}
      aria-label={
        count > 0 ? `${t('header.cart')} (${count})` : t('header.cart')
      }
    >
      <span className={styles.iconWrap}>
        <ShoppingCartOutlined aria-hidden />
        {count > 0 ? (
          <span className={styles.badge} aria-hidden="true">
            {count}
          </span>
        ) : null}
      </span>
    </button>
  )
}
