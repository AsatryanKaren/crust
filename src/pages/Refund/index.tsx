import { PageShell } from '../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const Refund: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.refund.title"
        descriptionKey="pages.refund.description"
      />
    </div>
  )
}
