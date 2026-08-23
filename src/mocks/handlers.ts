import { http, HttpResponse } from 'msw'
import type { HttpHandler } from 'msw'

import type { PaginatedResponse } from '../types/pagination'
import type { Product, ProductSort } from '../types/product'
import { parseProductSort } from '../utils/parseProductSort'
import { categories } from './data/categories'
import {
  getFavoriteProducts,
  toggleFavoriteId,
  withFavoriteFlag,
} from './data/favorites'
import { products } from './data/products'

type ReservationRequest = {
  location: string
  guests: string
  date: string
  time: string
  fullName: string
  phone: string
  comment: string
}

const submittedReservations: ReservationRequest[] = []

const DEFAULT_PAGE_SIZE = 6

const parsePositiveInt = (value: string | null, fallback: number): number => {
  if (!value) {
    return fallback
  }

  const parsed = Number.parseInt(value, 10)
  if (Number.isNaN(parsed) || parsed < 1) {
    return fallback
  }

  return parsed
}

const sortProducts = (items: Product[], sort: ProductSort): Product[] => {
  const next = [...items]

  switch (sort) {
    case 'priceAsc':
      return next.sort((a, b) => a.price - b.price)
    case 'priceDesc':
      return next.sort((a, b) => b.price - a.price)
    case 'name':
      return next.sort((a, b) => a.name.localeCompare(b.name))
    case 'recommended':
    default:
      return next.sort(
        (a, b) => Number(b.isBestseller) - Number(a.isBestseller),
      )
  }
}

export const handlers: HttpHandler[] = [
  http.get('/api/categories', () => {
    return HttpResponse.json(categories)
  }),

  http.get('/api/products', ({ request }) => {
    const url = new URL(request.url)
    const categorySlug = url.searchParams.get('category') ?? 'pastries'
    const q = (url.searchParams.get('q') ?? '').trim().toLowerCase()
    const sort = parseProductSort(url.searchParams.get('sort'))
    const page = parsePositiveInt(url.searchParams.get('page'), 1)
    const pageSize = parsePositiveInt(
      url.searchParams.get('pageSize'),
      DEFAULT_PAGE_SIZE,
    )

    const category = categories.find((item) => item.slug === categorySlug)
    let filtered = category
      ? products.filter((product) => product.categoryId === category.id)
      : products

    if (q) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q),
      )
    }

    const sorted = sortProducts(filtered, sort)
    const total = sorted.length
    const totalPages = Math.max(1, Math.ceil(total / pageSize))
    const safePage = Math.min(page, totalPages)
    const start = (safePage - 1) * pageSize
    const items = sorted.slice(start, start + pageSize).map(withFavoriteFlag)

    const response: PaginatedResponse<Product> = {
      items,
      page: safePage,
      pageSize,
      total,
      totalPages,
    }

    return HttpResponse.json(response)
  }),

  http.get('/api/products/:id', ({ params }) => {
    const product = products.find((item) => item.id === params.id)

    if (!product) {
      return HttpResponse.json(
        { message: 'Product not found' },
        { status: 404 },
      )
    }

    return HttpResponse.json(withFavoriteFlag(product))
  }),

  http.post('/api/cart/items', async ({ request }) => {
    const body = await request.json()
    const productId =
      typeof body === 'object' &&
      body !== null &&
      'productId' in body &&
      typeof body.productId === 'string'
        ? body.productId
        : null

    return HttpResponse.json({ ok: true, productId })
  }),

  http.get('/api/favorites', () => {
    return HttpResponse.json({ items: getFavoriteProducts() })
  }),

  http.post('/api/products/:id/favorite', ({ params }) => {
    const productId = typeof params.id === 'string' ? params.id : undefined
    if (!productId) {
      return HttpResponse.json(
        { message: 'Product not found' },
        { status: 404 },
      )
    }

    const result = toggleFavoriteId(productId)
    if (!result) {
      return HttpResponse.json(
        { message: 'Product not found' },
        { status: 404 },
      )
    }

    return HttpResponse.json(result)
  }),

  http.get('/api/reservation', () => {
    return HttpResponse.json({
      dates: [
        { day: 'Wed 07', times: ['11:00', '15:30', '19:00', '21:15'] },
        { day: 'Mon 23', times: ['15:00', '16:30', '17:00', '18:30', '20:00'] },
        {
          day: 'Tue 19',
          times: ['12:00', '13:30', '14:20', '18:30', '20:00', '21:30'],
        },
      ],
    })
  }),

  http.post('/api/reservations', async ({ request }) => {
    const body = (await request.json()) as ReservationRequest
    submittedReservations.push(body)
    return HttpResponse.json(body, { status: 201 })
  }),

  http.get('/api/reservations', () => {
    return HttpResponse.json(submittedReservations)
  }),
]
