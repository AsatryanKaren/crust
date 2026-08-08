import { PageShell } from '../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const Order: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.order.title"
        descriptionKey="pages.order.description"
      />
    </div>
  )
}
