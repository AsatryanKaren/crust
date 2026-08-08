import { PageShell } from '../../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const Categories: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.admin.categories.title"
        descriptionKey="pages.admin.categories.description"
      />
    </div>
  )
}
