import { PageShell } from '../../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const Locations: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.admin.locations.title"
        descriptionKey="pages.admin.locations.description"
      />
    </div>
  )
}
