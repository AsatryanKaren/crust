import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { createElement, type ReactNode } from 'react'

import { fetchFavorites } from '../api/favorites'
import { toggleProductFavorite } from '../api/products'
import type { PaginatedResponse } from '../types/pagination'
import type { Product } from '../types/product'
import { favoritesQueryKey, useToggleFavorite } from './useFavorites'
import { productDetailQueryKey } from './useProduct'
import { productsQueryKey } from './useProducts'

vi.mock('../api/favorites', () => ({
  fetchFavorites: vi.fn(),
}))

vi.mock('../api/products', () => ({
  toggleProductFavorite: vi.fn(),
}))

const product: Product = {
  id: 'prod-1',
  categoryId: 'cat-pastries',
  name: 'Croissant',
  description: 'Buttery croissant',
  price: 8,
  currency: 'AMD',
  unit: 'pc',
  imageUrl: '/croissant.jpg',
  images: ['/croissant.jpg'],
  ingredients: ['Wheat flour', 'Butter'],
  allergens: ['Gluten', 'Milk'],
  variants: [
    {
      id: 'single',
      labelKey: 'pages.productDetails.variants.single',
      price: 8,
      unit: 'pc',
    },
  ],
  isBestseller: false,
  status: 'available',
  isFavorite: false,
}

const productsPage: PaginatedResponse<Product> = {
  items: [product],
  page: 1,
  pageSize: 6,
  total: 1,
  totalPages: 1,
}

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

const seedCache = (queryClient: QueryClient, favorite: Product | undefined) => {
  queryClient.setQueryData(productsQueryKey({ category: 'pastries' }), {
    ...productsPage,
    items: [{ ...product, isFavorite: Boolean(favorite) }],
  })
  queryClient.setQueryData(favoritesQueryKey, {
    items: favorite ? [favorite] : [],
  })
}

const createWrapper = (queryClient: QueryClient) => {
  const Wrapper = ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children)

  return Wrapper
}

describe('useToggleFavorite', () => {
  beforeEach(() => {
    vi.mocked(fetchFavorites).mockResolvedValue({ items: [] })
  })

  it('adds a product from the products cache to favorites', async () => {
    const queryClient = createQueryClient()
    seedCache(queryClient, undefined)

    vi.mocked(toggleProductFavorite).mockReturnValue(
      new Promise(() => undefined),
    )

    const { result } = renderHook(() => useToggleFavorite(), {
      wrapper: createWrapper(queryClient),
    })

    result.current.mutate(product.id)

    await waitFor(() => {
      expect(queryClient.getQueryData(favoritesQueryKey)).toEqual({
        items: [{ ...product, isFavorite: true }],
      })
    })
  })

  it('removes a product from the favorites cache', async () => {
    const queryClient = createQueryClient()
    const favorite = { ...product, isFavorite: true }
    seedCache(queryClient, favorite)

    vi.mocked(toggleProductFavorite).mockReturnValue(
      new Promise(() => undefined),
    )

    const { result } = renderHook(() => useToggleFavorite(), {
      wrapper: createWrapper(queryClient),
    })

    result.current.mutate(product.id)

    await waitFor(() => {
      expect(queryClient.getQueryData(favoritesQueryKey)).toEqual({
        items: [],
      })
    })
  })

  it('restores the previous favorites cache when the mutation fails', async () => {
    const queryClient = createQueryClient()
    seedCache(queryClient, undefined)
    vi.mocked(fetchFavorites).mockResolvedValue({ items: [] })
    vi.mocked(toggleProductFavorite).mockRejectedValue(new Error('network'))

    const { result } = renderHook(() => useToggleFavorite(), {
      wrapper: createWrapper(queryClient),
    })

    result.current.mutate(product.id)

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(queryClient.getQueryData(favoritesQueryKey)).toEqual({ items: [] })
  })

  it('patches a product-detail cache entry', async () => {
    const queryClient = createQueryClient()
    queryClient.setQueryData(productDetailQueryKey(product.id), product)
    queryClient.setQueryData(favoritesQueryKey, { items: [] })

    vi.mocked(toggleProductFavorite).mockReturnValue(
      new Promise(() => undefined),
    )

    const { result } = renderHook(() => useToggleFavorite(), {
      wrapper: createWrapper(queryClient),
    })

    result.current.mutate(product.id)

    await waitFor(() => {
      expect(
        queryClient.getQueryData(productDetailQueryKey(product.id)),
      ).toEqual({ ...product, isFavorite: true })
    })
  })
})
