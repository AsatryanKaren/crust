import { ShoppingCartOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { paths } from '../../../../routes/paths'
import type { Props } from './types'
import styles from './styles.module.css'

export const HeaderCart: Props = ({ count = 0 }) => {
  const { t } = useTranslation()

  return (
    <Link
      className={styles.root}
      to={paths.cart}
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
    </Link>
  )
}
