import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import { IconButton } from '../IconButton'
import type { Props } from './types'
import styles from './styles.module.css'

export const FavoriteButton: Props = ({
  isFavorite,
  onClick,
  className,
  appearance = 'badge',
}) => {
  const { t } = useTranslation()

  return (
    <IconButton
      className={`${styles.root} ${styles[appearance]}${isFavorite ? ` ${styles.active}` : ''}${className ? ` ${className}` : ''}`}
      ariaLabel={
        isFavorite
          ? t('pages.catalog.actions.unfavorite')
          : t('pages.catalog.actions.favorite')
      }
      onClick={onClick}
    >
      <span className={styles.heart}>
        <HeartOutlined className={styles.heartOutline} />
        <HeartFilled className={styles.heartFill} />
      </span>
    </IconButton>
  )
}
