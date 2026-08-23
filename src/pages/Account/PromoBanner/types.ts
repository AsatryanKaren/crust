import type { FC } from 'react'

type OwnProps = {
  imageSrc: string
  titleKey: string
  bodyKey: string
  imageAltKey: string
  badgeKey: string
}

export type Props = FC<OwnProps>
