import type { FC, ReactNode } from 'react'

type BreadcrumbItem = {
  key: string
  label: ReactNode
  href?: string
}

type OwnProps = {
  items: BreadcrumbItem[]
}

export type Props = FC<OwnProps>
