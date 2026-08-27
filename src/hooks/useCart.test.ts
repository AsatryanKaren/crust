import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { createElement, type ReactNode } from 'react'

import { addCartItem, removeCartItem } from '../api/cart'
import type { PaginatedResponse } from '../types/pagination'
import type { CartItem, Product } from '../types/product'
import { cartQueryKey, useAddCartItem, useRemoveCartItem } from './useCart'
import { productsQueryKey } from './useProducts'

vi.mock('../api/cart', () => ({
  fetchCart: vi.fn(),
  addCartItem: vi.fn(),
  removeCartItem: vi.fn(),
}))

vi.mock('../components/_shared/AddedToCartToast', () => ({
  showAddedToCartToast: vi.fn(),
}))

vi.mock('antd', () => ({
  App: {
    useApp: () => ({
      message: { success: vi.fn(), destroy: vi.fn() },
    }),
  },
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}))

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}))

const singleVariant = {
  id: 'single',
  labelKey: 'pages.productDetails.variants.single',
  price: 8,
  unit: 'pc',
}

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
  variants: [singleVariant],
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

const cartItem: CartItem = {
  id: 'cart-prod-1-single',
  productId: product.id,
  variantId: 'single',
  quantity: 1,
  product,
  variant: singleVariant,
}

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

const createWrapper = (queryClient: QueryClient) => {
  const Wrapper = ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children)

  return Wrapper
}

describe('useAddCartItem', () => {
  it('adds a product from the products cache to the cart', async () => {
    const queryClient = createQueryClient()
    queryClient.setQueryData(productsQueryKey({ category: 'pastries' }), {
      ...productsPage,
    })
    queryClient.setQueryData(cartQueryKey, { items: [] })

    vi.mocked(addCartItem).mockReturnValue(new Promise(() => undefined))

    const { result } = renderHook(() => useAddCartItem(), {
      wrapper: createWrapper(queryClient),
    })

    result.current.mutate({
      productId: product.id,
      variantId: 'single',
      quantity: 1,
    })

    await waitFor(() => {
      expect(queryClient.getQueryData(cartQueryKey)).toEqual({
        items: [cartItem],
      })
    })
  })

  it('merges quantity when the same product and variant already exist', async () => {
    const queryClient = createQueryClient()
    queryClient.setQueryData(productsQueryKey({ category: 'pastries' }), {
      ...productsPage,
    })
    queryClient.setQueryData(cartQueryKey, { items: [cartItem] })

    vi.mocked(addCartItem).mockReturnValue(new Promise(() => undefined))

    const { result } = renderHook(() => useAddCartItem(), {
      wrapper: createWrapper(queryClient),
    })

    result.current.mutate({
      productId: product.id,
      variantId: 'single',
      quantity: 2,
    })

    await waitFor(() => {
      expect(queryClient.getQueryData(cartQueryKey)).toEqual({
        items: [{ ...cartItem, quantity: 3 }],
      })
    })
  })

  it('restores the previous cart cache when the mutation fails', async () => {
    const queryClient = createQueryClient()
    queryClient.setQueryData(productsQueryKey({ category: 'pastries' }), {
      ...productsPage,
    })
    queryClient.setQueryData(cartQueryKey, { items: [] })
    vi.mocked(addCartItem).mockRejectedValue(new Error('network'))

    const { result } = renderHook(() => useAddCartItem(), {
      wrapper: createWrapper(queryClient),
    })

    result.current.mutate({
      productId: product.id,
      variantId: 'single',
      quantity: 1,
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(queryClient.getQueryData(cartQueryKey)).toEqual({ items: [] })
  })
})

describe('useRemoveCartItem', () => {
  it('removes an item from the cart cache', async () => {
    const queryClient = createQueryClient()
    queryClient.setQueryData(cartQueryKey, { items: [cartItem] })
    vi.mocked(removeCartItem).mockReturnValue(new Promise(() => undefined))

    const { result } = renderHook(() => useRemoveCartItem(), {
      wrapper: createWrapper(queryClient),
    })

    result.current.mutate(cartItem.id)

    await waitFor(() => {
      expect(queryClient.getQueryData(cartQueryKey)).toEqual({ items: [] })
    })
  })
})
