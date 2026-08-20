import {
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { Card, Tag, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { IconButton } from '../../../_shared/IconButton'
import { StatusBadge } from '../../../_shared/StatusBadge'
import { productDetailsPath } from '../../../../routes/paths'
import type { Props } from './types'
import styles from './styles.module.css'

export const ProductCard: Props = ({ product, onFavorite, onAddToCart }) => {
  const { t } = useTranslation()
  const isUnavailable = product.status === 'unavailable'
  const detailsPath = productDetailsPath(product.id)

  return (
    <Card
      hoverable
      className={styles.root}
      cover={
        <div className={styles.media}>
          <Link to={detailsPath} className={styles.imageLink} tabIndex={-1}>
            <img
              className={styles.image}
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
            />
          </Link>

          <div className={styles.topLeft}>
            <IconButton
              className={`${styles.favoriteButton}${product.isFavorite ? ` ${styles.favoriteActive}` : ''}`}
              ariaLabel={t('pages.catalog.actions.favorite')}
              onClick={() => onFavorite?.(product.id)}
            >
              <span className={styles.heart}>
                <HeartOutlined className={styles.heartOutline} />
                <HeartFilled className={styles.heartFill} />
              </span>
            </IconButton>
          </div>

          {product.isBestseller ? (
            <Tag className={styles.bestseller} variant="outlined">
              {t('pages.catalog.badges.bestseller')}
            </Tag>
          ) : null}

          <div className={styles.status}>
            <StatusBadge status={product.status} />
          </div>
        </div>
      }
    >
      <Link to={detailsPath} className={styles.titleLink}>
        <Typography.Title level={5} className={styles.title}>
          {product.name}
        </Typography.Title>
      </Link>
      <Typography.Paragraph
        className={styles.description}
        ellipsis={{ rows: 2 }}
      >
        {product.description}
      </Typography.Paragraph>
      <div className={styles.footer}>
        <p className={styles.price}>
          <span className={styles.priceAmount}>
            {t('pages.catalog.priceAmount', { price: product.price })}
          </span>{' '}
          <span className={styles.priceUnit}>
            {t('pages.catalog.priceUnit', {
              currency: product.currency,
              unit: product.unit,
            })}
          </span>
        </p>
        <IconButton
          className={styles.cartButton}
          ariaLabel={t('pages.catalog.actions.addToCart')}
          disabled={isUnavailable}
          onClick={() => onAddToCart?.(product.id)}
        >
          <ShoppingCartOutlined />
        </IconButton>
      </div>
    </Card>
  )
}
