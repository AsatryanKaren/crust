import { PageShell } from '../../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const Reservations: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.admin.reservations.title"
        descriptionKey="pages.admin.reservations.description"
      />
    </div>
  )
}
