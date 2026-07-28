import type { FC } from 'react'

import type { FooterColumnItem } from '../types'

type OwnProps = {
  titleKey: string
  items: FooterColumnItem[]
}

export type Props = FC<OwnProps>
