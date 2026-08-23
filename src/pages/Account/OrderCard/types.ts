import type { FC } from 'react'

import type { AccountOrder } from '../../../types/account'

type OwnProps = {
  order: AccountOrder
}

export type Props = FC<OwnProps>
