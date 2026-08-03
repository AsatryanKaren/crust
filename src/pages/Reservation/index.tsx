import { PageShell } from '../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const Reservation: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.reservation.title"
        descriptionKey="pages.reservation.description"
      />
    </div>
  )
}
