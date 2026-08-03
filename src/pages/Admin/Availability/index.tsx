import { PageShell } from '../../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const Availability: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.admin.availability.title"
        descriptionKey="pages.admin.availability.description"
      />
    </div>
  )
}
