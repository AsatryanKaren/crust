import { PageShell } from '../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const Cart: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.cart.title"
        descriptionKey="pages.cart.description"
      />
    </div>
  )
}
