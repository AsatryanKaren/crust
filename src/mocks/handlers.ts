import { http, HttpResponse } from 'msw'
import type { HttpHandler } from 'msw'

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

export const handlers: HttpHandler[] = [
  http.get('/api/products', () => {
    return HttpResponse.json([
      { id: 1, name: 'Croissant', price: 350 },
      { id: 2, name: 'Baguette', price: 250 },
    ])
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
