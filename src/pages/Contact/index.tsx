import { PageShell } from '../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const Contact: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.contact.title"
        descriptionKey="pages.contact.description"
      />
    </div>
  )
}
