import { PageShell } from '../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const Allergens: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.allergens.title"
        descriptionKey="pages.allergens.description"
      />
    </div>
  )
}
