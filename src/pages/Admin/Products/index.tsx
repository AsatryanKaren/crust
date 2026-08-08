import { PageShell } from '../../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const Products: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.admin.products.title"
        descriptionKey="pages.admin.products.description"
      />
    </div>
  )
}
