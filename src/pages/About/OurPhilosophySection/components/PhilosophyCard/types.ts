import type { FC } from 'react'

import type { PhilosophyId } from '../../consts'

type OwnProps = {
  philosophyId: PhilosophyId
}

export type Props = FC<OwnProps>
