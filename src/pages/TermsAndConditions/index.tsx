import { PageShell } from '../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const TermsAndConditions: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.terms.title"
        descriptionKey="pages.terms.description"
      />
    </div>
  )
}
