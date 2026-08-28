import { ShoppingCartOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import type { Props } from './types'
import styles from './styles.module.css'

export const HeaderCart: Props = ({
  count = 0,
  open = false,
  panelId,
  onOpen,
}) => {
  const { t } = useTranslation()
  const cartLabel =
    count > 0 ? `${t('header.cart')} (${count})` : t('header.cart')

  return (
    <button
      type="button"
      className={styles.root}
      aria-label={cartLabel}
      aria-expanded={open}
      aria-controls={panelId}
      onClick={onOpen}
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
