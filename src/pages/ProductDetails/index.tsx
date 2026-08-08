import { PageShell } from '../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const ProductDetails: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.productDetails.title"
        descriptionKey="pages.productDetails.description"
      />
    </div>
  )
}
