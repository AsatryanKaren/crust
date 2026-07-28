import type { FC } from 'react'

type OwnProps = {
  /** Menu opens above the trigger when "up" (mobile drawer). */
  placement?: 'up' | 'down'
}

export type Props = FC<OwnProps>
