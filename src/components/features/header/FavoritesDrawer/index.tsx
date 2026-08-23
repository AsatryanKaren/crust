import { HeartFilled } from '@ant-design/icons'
import { Alert, Avatar, Drawer, Empty, List, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { IconButton } from '../../../_shared/IconButton'
import { useFavorites, useToggleFavorite } from '../../../../hooks/useFavorites'
import { productDetailsPath } from '../../../../routes/paths'
import { FAVORITES_DRAWER_SIZE, FAVORITES_ITEM_IMAGE_SIZE } from './consts'
import type { Props } from './types'
import styles from './styles.module.css'

export const FavoritesDrawer: Props = ({ open, panelId, onClose }) => {
  const { t } = useTranslation()
  const favoritesQuery = useFavorites()
  const toggleFavorite = useToggleFavorite()
  const items = favoritesQuery.data?.items ?? []
  const showInitialLoading = favoritesQuery.isLoading && !favoritesQuery.data

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
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={items}
          rowKey="id"
          locale={{
            emptyText: <Empty description={t('header.wishlistEmpty')} />,
          }}
          renderItem={(product) => (
            <List.Item
              extra={
                <IconButton
                  className={styles.remove}
                  ariaLabel={t('header.removeFromWishlist')}
                  onClick={() => toggleFavorite.mutate(product.id)}
                >
                  <HeartFilled />
                </IconButton>
              }
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    shape="square"
                    size={FAVORITES_ITEM_IMAGE_SIZE}
                    src={product.imageUrl}
                    alt={product.name}
                  />
                }
                title={
                  <Link
                    className={styles.link}
                    to={productDetailsPath(product.id)}
                    onClick={onClose}
                  >
                    {product.name}
                  </Link>
                }
                description={
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
                }
              />
            </List.Item>
          )}
        />
      )}
    </Drawer>
  )
}
