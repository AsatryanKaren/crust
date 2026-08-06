import type { FC } from 'react'

type OwnProps = Record<string, never>

export type Props = FC<OwnProps>

export type ReservationDetails = {
  dates: { day: string; times: string[] }[]
}

export type ReservationPayload = {
  location: string
  guests: string
  date: string
  time: string
  fullName: string
  phone: string
  comment: string
}
