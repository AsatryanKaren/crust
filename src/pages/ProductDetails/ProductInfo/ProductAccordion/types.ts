import type { FC } from 'react'

type OwnProps = {
  ingredients: string[]
  allergens: string[]
}

export type Props = FC<OwnProps>
