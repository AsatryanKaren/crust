import { useEffect, useState } from 'react'
import { Alert, Empty, Spin } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { addCartItem } from '../../api/products'
import { Breadcrumbs } from '../../components/_shared/Breadcrumbs'
import { Pagination } from '../../components/_shared/Pagination'
import { CatalogLayout } from '../../components/features/catalog/CatalogLayout'
import { CatalogToolbar } from '../../components/features/catalog/CatalogToolbar'
import { CategorySidebar } from '../../components/features/catalog/CategorySidebar'
import { ProductGrid } from '../../components/features/catalog/ProductGrid'
import { useCategories } from '../../hooks/useCategories'
import { useToggleFavorite } from '../../hooks/useFavorites'
import { useProducts } from '../../hooks/useProducts'
import { paths } from '../../routes/paths'
import { parseProductSort } from '../../utils/parseProductSort'
import {
  DEFAULT_CATEGORY,
  DEFAULT_SORT,
  PAGE_SIZE,
  SEARCH_DEBOUNCE_MS,
} from './consts'
import type { Props } from './types'
import styles from './styles.module.css'

const parsePage = (value: string | null): number => {
  const parsed = Number.parseInt(value ?? '1', 10)
  if (Number.isNaN(parsed) || parsed < 1) {
    return 1
  }

  return parsed
}

export const Catalog: Props = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  const category = searchParams.get('category') ?? DEFAULT_CATEGORY
  const sort = parseProductSort(searchParams.get('sort'), DEFAULT_SORT)
  const page = parsePage(searchParams.get('page'))
  const qParam = searchParams.get('q') ?? ''

  const [searchInput, setSearchInput] = useState(qParam)

  // Keep input in sync with URL when q changes externally (back/forward).
  useEffect(() => {
    setSearchInput((prev) => (prev === qParam ? prev : qParam))
  }, [qParam])

  // Debounce writing search to the URL so typing does not refetch every key.
  useEffect(() => {
    const next = searchInput.trim()

    if (next === qParam) {
      return
    }

    const timer = window.setTimeout(() => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev)
          const currentQ = params.get('q') ?? ''
          if (next === currentQ) {
            return prev
          }

          if (next) {
            params.set('q', next)
          } else {
            params.delete('q')
          }
          params.set('page', '1')
          return params
        },
        { replace: true },
      )
    }, SEARCH_DEBOUNCE_MS)

    return () => window.clearTimeout(timer)
  }, [searchInput, qParam, setSearchParams])

  const updateParams = (patch: Record<string, string | null>) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev)
      Object.entries(patch).forEach(([key, value]) => {
        if (value === null || value === '') {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      })
      return params
    })
  }

  const categoriesQuery = useCategories()
  const productsQuery = useProducts({
    category,
    page,
    pageSize: PAGE_SIZE,
    q: qParam,
    sort,
  })

  const favoriteMutation = useToggleFavorite()
  const cartMutation = useMutation({
    mutationFn: addCartItem,
  })

  const activeCategory = categoriesQuery.data?.find(
    (item) => item.slug === category,
  )
  const categoryLabel = activeCategory
    ? t(activeCategory.nameKey)
    : t('pages.catalog.categories.pastries')

  const showInitialLoading = productsQuery.isLoading && !productsQuery.data

  return (
    <div className={styles.root}>
      <div className={styles.topBar}>
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
            },
          ]}
        />
        <CatalogToolbar
          search={searchInput}
          sort={sort}
          showSort={false}
          onSearchChange={setSearchInput}
          onSortChange={() => undefined}
        />
      </div>

      <CatalogLayout
        heading={
          <div className={styles.headingRow}>
            <h1 className={styles.heading}>{t('pages.catalog.heading')}</h1>
            <CatalogToolbar
              search={searchInput}
              sort={sort}
              showSearch={false}
              onSearchChange={setSearchInput}
              onSortChange={(value) => updateParams({ sort: value, page: '1' })}
            />
          </div>
        }
        sidebar={
          categoriesQuery.isLoading ? (
            <Spin />
          ) : categoriesQuery.isError ? (
            <Alert type="error" title={t('pages.catalog.errors.categories')} />
          ) : (
            <CategorySidebar
              categories={categoriesQuery.data ?? []}
              activeSlug={category}
              onSelect={(slug) => updateParams({ category: slug, page: '1' })}
            />
          )
        }
      >
        {showInitialLoading ? (
          <div className={styles.state}>
            <Spin size="large" />
          </div>
        ) : null}

        {productsQuery.isError ? (
          <Alert type="error" title={t('pages.catalog.errors.products')} />
        ) : null}

        {productsQuery.data && productsQuery.data.items.length === 0 ? (
          <Empty description={t('pages.catalog.empty')} />
        ) : null}

        {productsQuery.data && productsQuery.data.items.length > 0 ? (
          <>
            <ProductGrid
              products={productsQuery.data.items}
              onFavorite={(productId) => favoriteMutation.mutate(productId)}
              onAddToCart={(productId) => cartMutation.mutate(productId)}
            />
            <Pagination
              current={productsQuery.data.page}
              totalItems={productsQuery.data.total}
              pageSize={productsQuery.data.pageSize}
              onChange={(nextPage) => updateParams({ page: String(nextPage) })}
            />
          </>
        ) : null}
      </CatalogLayout>
    </div>
  )
}
