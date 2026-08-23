import type { FC } from 'react'

import type { AccountReservation } from '../../../types/account'

type OwnProps = {
  reservation: AccountReservation
}

export type Props = FC<OwnProps>
