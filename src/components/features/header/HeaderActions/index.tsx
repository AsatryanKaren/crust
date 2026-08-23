import { HeartFilled, HeartOutlined, SearchOutlined } from '@ant-design/icons'
import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useFavorites } from '../../../../hooks/useFavorites'
import { FavoritesDrawer } from '../FavoritesDrawer'
import { HeaderCart } from '../HeaderCart'
import type { Props } from './types'
import styles from './styles.module.css'

export const HeaderActions: Props = ({ cartCount = 0 }) => {
  const { t } = useTranslation()
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const panelId = useId()
  const favoritesQuery = useFavorites()
  const count = favoritesQuery.data?.items.length ?? 0
  const wishlistLabel =
    count > 0 ? `${t('header.wishlist')} (${count})` : t('header.wishlist')

  return (
    <>
      <div className={styles.root}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label={t('header.search')}
        >
          <SearchOutlined aria-hidden />
        </button>
        <button
          type="button"
          className={styles.iconButton}
          aria-label={wishlistLabel}
          aria-expanded={wishlistOpen}
          aria-controls={panelId}
          onClick={() => setWishlistOpen(true)}
        >
          <span className={styles.iconWrap}>
            {count > 0 ? (
              <HeartFilled aria-hidden />
            ) : (
              <HeartOutlined aria-hidden />
            )}
            {count > 0 ? (
              <span className={styles.badge} aria-hidden="true">
                {count}
              </span>
            ) : null}
          </span>
        </button>
        <div className={styles.desktopOnly}>
          <HeaderCart count={cartCount} />
        </div>
      </div>
      <FavoritesDrawer
        open={wishlistOpen}
        panelId={panelId}
        onClose={() => setWishlistOpen(false)}
      />
    </>
  )
}
