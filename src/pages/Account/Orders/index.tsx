import { PageShell } from '../../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const Orders: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.accountOrders.title"
        descriptionKey="pages.accountOrders.description"
      />
    </div>
  )
}
