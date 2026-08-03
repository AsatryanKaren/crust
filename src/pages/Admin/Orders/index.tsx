import { PageShell } from '../../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const Orders: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.admin.orders.title"
        descriptionKey="pages.admin.orders.description"
      />
    </div>
  )
}
