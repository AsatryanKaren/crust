import { PageShell } from '../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const Payment: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.payment.title"
        descriptionKey="pages.payment.description"
      />
    </div>
  )
}
