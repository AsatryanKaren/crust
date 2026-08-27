import { HeartFilled } from '@ant-design/icons'
import { Alert, Avatar, Drawer, Empty, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { IconButton } from '../../../_shared/IconButton'
import { useFavorites, useToggleFavorite } from '../../../../hooks/useFavorites'
import { paths, productDetailsPath } from '../../../../routes/paths'
import { Button } from '../../../../ui/Button'
import { FAVORITES_DRAWER_SIZE, FAVORITES_ITEM_IMAGE_SIZE } from './consts'
import type { Props } from './types'
import styles from './styles.module.css'

export const FavoritesDrawer: Props = ({ open, panelId, onClose }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const favoritesQuery = useFavorites()
  const toggleFavorite = useToggleFavorite()
  const items = favoritesQuery.data?.items ?? []
  const showInitialLoading = favoritesQuery.isLoading && !favoritesQuery.data
  const isEmpty = items.length === 0

  const handleBrowseCatalog = () => {
    onClose()
    void navigate(paths.catalog)
  }

  return (
    <Drawer
      id={panelId}
      classNames={{ root: styles.root }}
      open={open}
      placement="left"
      size={FAVORITES_DRAWER_SIZE}
      title={t('header.wishlistTitle')}
      closable={{ 'aria-label': t('header.closeWishlist') }}
      loading={showInitialLoading}
      onClose={onClose}
    >
      {favoritesQuery.isError ? (
        <Alert type="error" title={t('header.wishlistError')} />
      ) : isEmpty ? (
        <Empty description={t('header.wishlistEmpty')}>
          <div className={styles.emptyAction}>
            <Button variant="primary" onClick={handleBrowseCatalog}>
              {t('header.browseCatalog')}
            </Button>
          </div>
        </Empty>
      ) : (
        <ul className={styles.list}>
          {items.map((product) => (
            <li key={product.id} className={styles.item}>
              <Avatar
                shape="square"
                size={FAVORITES_ITEM_IMAGE_SIZE}
                src={product.imageUrl}
                alt={product.name}
              />
              <div className={styles.itemBody}>
                <Link
                  className={styles.link}
                  to={productDetailsPath(product.id)}
                  onClick={onClose}
                >
                  {product.name}
                </Link>
                <Typography.Text className={styles.price}>
                  <span className={styles.priceAmount}>
                    {t('pages.catalog.priceAmount', {
                      price: product.price,
                    })}
                  </span>{' '}
                  {t('pages.catalog.priceUnit', {
                    currency: product.currency,
                    unit: product.unit,
                  })}
                </Typography.Text>
              </div>
              <IconButton
                className={styles.remove}
                ariaLabel={t('header.removeFromWishlist')}
                onClick={() => toggleFavorite.mutate(product.id)}
              >
                <HeartFilled />
              </IconButton>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  )
}
