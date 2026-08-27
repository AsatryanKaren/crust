import { ShoppingCartOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import { FavoriteButton } from '../../../components/_shared/FavoriteButton'
import { QuantitySelector } from '../../../components/_shared/QuantitySelector'
import { StatusBadge } from '../../../components/_shared/StatusBadge'
import { Button } from '../../../ui/Button'
import { MAX_QUANTITY, MIN_QUANTITY } from '../consts'
import { ProductAccordion } from './ProductAccordion'
import { ProductSelection } from './ProductSelection'
import type { Props } from './types'
import styles from './styles.module.css'

export const ProductInfo: Props = ({
  product,
  selectedVariant,
  quantity,
  quantityId,
  isAddingToCart,
  onQuantityChange,
  onVariantChange,
  onFavorite,
  onAddToCart,
}) => {
  const { t, i18n } = useTranslation()
  const isUnavailable = product.status === 'unavailable'
  const cartDisabled = isUnavailable || isAddingToCart || !selectedVariant
  const showSelection = product.variants.length >= 2
  const formattedPrice = new Intl.NumberFormat(i18n.language).format(
    selectedVariant.price,
  )

  const renderAddToCart = () => (
    <div className={styles.addToCart}>
      <Button
        variant="primary"
        size="large"
        disabled={cartDisabled}
        onClick={onAddToCart}
      >
        {t('pages.productDetails.addToCart')}
        <ShoppingCartOutlined aria-hidden />
      </Button>
    </div>
  )

  return (
    <div className={styles.root}>
      <div className={styles.topRow}>
        <StatusBadge status={product.status} />
        <FavoriteButton
          appearance="plain"
          isFavorite={product.isFavorite}
          onClick={onFavorite}
        />
      </div>

      <h1 className={styles.title}>{product.name}</h1>

      <p className={styles.price}>
        <span className={styles.priceAmount}>
          {t('pages.catalog.priceAmount', { price: formattedPrice })}
        </span>{' '}
        <span className={styles.priceUnit}>
          {t('pages.catalog.priceUnit', {
            currency: product.currency,
            unit: selectedVariant.unit,
          })}
        </span>
      </p>

      <p className={styles.description}>{product.description}</p>

      {showSelection ? (
        <ProductSelection
          variants={product.variants}
          value={selectedVariant.id}
          onChange={onVariantChange}
          disabled={isUnavailable}
        />
      ) : null}

      <div className={styles.quantityBlock}>
        <label className={styles.quantityLabel} htmlFor={quantityId}>
          {t('pages.productDetails.quantityLabel')}
        </label>
        <QuantitySelector
          id={quantityId}
          value={quantity}
          min={MIN_QUANTITY}
          max={MAX_QUANTITY}
          disabled={isUnavailable}
          onChange={onQuantityChange}
        />
      </div>

      <div className={styles.inFlowCart}>{renderAddToCart()}</div>

      <ProductAccordion
        ingredients={product.ingredients}
        allergens={product.allergens}
      />

      <div className={styles.stickyBar}>{renderAddToCart()}</div>
    </div>
  )
}
