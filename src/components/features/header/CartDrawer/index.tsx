import { DeleteOutlined } from '@ant-design/icons'
import { Alert, Avatar, Drawer, Empty, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { IconButton } from '../../../_shared/IconButton'
import { useCart, useRemoveCartItem } from '../../../../hooks/useCart'
import { paths, productDetailsPath } from '../../../../routes/paths'
import { Button } from '../../../../ui/Button'
import { CART_DRAWER_SIZE, CART_ITEM_IMAGE_SIZE } from './consts'
import type { Props } from './types'
import styles from './styles.module.css'

export const CartDrawer: Props = ({ open, panelId, onClose }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const cartQuery = useCart()
  const removeCartItem = useRemoveCartItem()
  const items = cartQuery.data?.items ?? []
  const showInitialLoading = cartQuery.isLoading && !cartQuery.data
  const isEmpty = items.length === 0

  const handleCompleteOrder = () => {
    onClose()
    void navigate(paths.cart)
  }

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
      size={CART_DRAWER_SIZE}
      title={t('header.cartTitle')}
      closable={{ 'aria-label': t('header.closeCart') }}
      loading={showInitialLoading}
      onClose={onClose}
      footer={
        <div className={styles.footer}>
          <div className={styles.completeOrder}>
            <Button
              variant="primary"
              disabled={isEmpty || cartQuery.isError}
              onClick={handleCompleteOrder}
            >
              {t('header.completeOrder')}
            </Button>
          </div>
        </div>
      }
    >
      {cartQuery.isError ? (
        <Alert type="error" title={t('header.cartError')} />
      ) : isEmpty ? (
        <Empty description={t('header.cartEmpty')}>
          <div className={styles.emptyAction}>
            <Button variant="primary" onClick={handleBrowseCatalog}>
              {t('header.browseCatalog')}
            </Button>
          </div>
        </Empty>
      ) : (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id} className={styles.item}>
              <Avatar
                shape="square"
                size={CART_ITEM_IMAGE_SIZE}
                src={item.product.imageUrl}
                alt={item.product.name}
              />
              <div className={styles.itemBody}>
                <Link
                  className={styles.link}
                  to={productDetailsPath(item.productId)}
                  onClick={onClose}
                >
                  {item.product.name}
                </Link>
                <Typography.Text className={styles.meta}>
                  {t(item.variant.labelKey)} ·{' '}
                  {t('header.cartQuantity', { count: item.quantity })}
                </Typography.Text>
                <Typography.Text className={styles.price}>
                  <span className={styles.priceAmount}>
                    {t('pages.catalog.priceAmount', {
                      price: item.variant.price * item.quantity,
                    })}
                  </span>{' '}
                  {t('pages.catalog.priceUnit', {
                    currency: item.product.currency,
                    unit: item.variant.unit,
                  })}
                </Typography.Text>
              </div>
              <IconButton
                className={styles.remove}
                ariaLabel={t('header.removeFromCart')}
                onClick={() => removeCartItem.mutate(item.id)}
              >
                <DeleteOutlined />
              </IconButton>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  )
}
