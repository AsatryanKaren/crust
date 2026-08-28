import { useEffect, useState } from 'react'
import { Alert, Empty, Spin } from 'antd'
import { isAxiosError } from 'axios'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { Breadcrumbs } from '../../components/_shared/Breadcrumbs'
import { useAddCartItem } from '../../hooks/useCart'
import { useCategories } from '../../hooks/useCategories'
import { useToggleFavorite } from '../../hooks/useFavorites'
import { useProduct } from '../../hooks/useProduct'
import { paths } from '../../routes/paths'
import { MIN_QUANTITY, QUANTITY_INPUT_ID } from './consts'
import { ProductGallery } from './ProductGallery'
import { ProductInfo } from './ProductInfo'
import type { Props } from './types'
import styles from './styles.module.css'

const catalogCategoryHref = (slug: string): string =>
  `${paths.catalog}?category=${encodeURIComponent(slug)}`

export const ProductDetails: Props = () => {
  const { t } = useTranslation()
  const { productId } = useParams()
  const productQuery = useProduct(productId)
  const categoriesQuery = useCategories()
  const favoriteMutation = useToggleFavorite()
  const cartMutation = useAddCartItem()

  const product = productQuery.data
  const [selectedVariantId, setSelectedVariantId] = useState<string>()
  const [quantity, setQuantity] = useState(MIN_QUANTITY)

  useEffect(() => {
    if (!product) {
      return
    }

    setSelectedVariantId(product.variants[0]?.id)
    setQuantity(MIN_QUANTITY)
  }, [product])

  const selectedVariant =
    product?.variants.find((variant) => variant.id === selectedVariantId) ??
    product?.variants[0]

  const category = categoriesQuery.data?.find(
    (item) => item.id === product?.categoryId,
  )
  const categoryLabel = category
    ? t(category.nameKey)
    : t('pages.catalog.categories.pastries')

  const isNotFound =
    productQuery.isError &&
    isAxiosError(productQuery.error) &&
    productQuery.error.response?.status === 404

  const showInitialLoading = productQuery.isLoading && !productQuery.data
  const galleryImages = product
    ? product.images.length > 0
      ? product.images
      : [product.imageUrl]
    : []

  return (
    <div className={styles.root}>
      <Breadcrumbs
        items={[
          {
            key: 'catalog',
            label: t('pages.catalog.title'),
            href: paths.catalog,
          },
          {
            key: 'category',
            label: categoryLabel,
            href: category ? catalogCategoryHref(category.slug) : paths.catalog,
          },
          {
            key: 'product',
            label: product?.name ?? t('pages.productDetails.empty'),
          },
        ]}
      />

      {showInitialLoading ? (
        <div className={styles.state}>
          <Spin size="large" />
        </div>
      ) : null}

      {isNotFound ? (
        <Empty description={t('pages.productDetails.empty')} />
      ) : null}

      {productQuery.isError && !isNotFound ? (
        <Alert type="error" title={t('pages.productDetails.errors.load')} />
      ) : null}

      {product && selectedVariant ? (
        <div className={styles.layout}>
          <ProductGallery
            key={product.id}
            images={galleryImages}
            productName={product.name}
          />
          <ProductInfo
            product={product}
            selectedVariant={selectedVariant}
            quantity={quantity}
            quantityId={QUANTITY_INPUT_ID}
            isAddingToCart={cartMutation.isPending}
            onQuantityChange={setQuantity}
            onVariantChange={setSelectedVariantId}
            onFavorite={() => favoriteMutation.mutate(product.id)}
            onAddToCart={() =>
              cartMutation.mutate({
                productId: product.id,
                variantId: selectedVariant.id,
                quantity,
              })
            }
          />
        </div>
      ) : null}
    </div>
  )
}
