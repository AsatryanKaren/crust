import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { createElement, type ReactNode } from 'react'

import { fetchProductById } from '../api/products'
import type { Product } from '../types/product'
import { productDetailQueryKey, useProduct } from './useProduct'

vi.mock('../api/products', () => ({
  fetchProductById: vi.fn(),
}))

const product: Product = {
  id: 'prod-pastry-2',
  categoryId: 'cat-pastries',
  name: 'Almond Croissant',
  description: 'Twice-baked',
  price: 1200,
  currency: 'AMD',
  unit: '120g',
  imageUrl: '/almond.jpg',
  images: ['/almond.jpg'],
  ingredients: ['Almonds'],
  allergens: ['Tree nuts'],
  variants: [
    {
      id: 'single',
      labelKey: 'pages.productDetails.variants.single',
      price: 1200,
      unit: '120g',
    },
  ],
  isBestseller: false,
  status: 'available',
  isFavorite: false,
}

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })

const createWrapper = (queryClient: QueryClient) => {
  const Wrapper = ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children)

  return Wrapper
}

describe('useProduct', () => {
  beforeEach(() => {
    vi.mocked(fetchProductById).mockReset()
  })
  it('loads a product by id', async () => {
    vi.mocked(fetchProductById).mockResolvedValue(product)
    const queryClient = createQueryClient()

    const { result } = renderHook(() => useProduct(product.id), {
      wrapper: createWrapper(queryClient),
    })

    await waitFor(() => {
      expect(result.current.data).toEqual(product)
    })

    expect(queryClient.getQueryData(productDetailQueryKey(product.id))).toEqual(
      product,
    )
  })

  it('does not fetch when id is missing', () => {
    const queryClient = createQueryClient()

    renderHook(() => useProduct(undefined), {
      wrapper: createWrapper(queryClient),
    })

    expect(fetchProductById).not.toHaveBeenCalled()
  })
})
