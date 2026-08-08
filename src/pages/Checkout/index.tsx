import { PageShell } from '../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const Checkout: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.checkout.title"
        descriptionKey="pages.checkout.description"
      />
    </div>
  )
}
