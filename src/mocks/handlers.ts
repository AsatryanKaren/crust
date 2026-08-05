import { http, HttpResponse } from 'msw'
import type { HttpHandler } from 'msw'

export const handlers: HttpHandler[] = [
  http.get('/api/products', () => {
    return HttpResponse.json([
      { id: 1, name: 'Croissant', price: 350 },
      { id: 2, name: 'Baguette', price: 250 },
    ])
  }),
]
