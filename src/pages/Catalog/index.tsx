import { PageShell } from '../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const Catalog: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.catalog.title"
        descriptionKey="pages.catalog.description"
      />
    </div>
  )
}
