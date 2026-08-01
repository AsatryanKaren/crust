import { PageShell } from '../../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const Content: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.admin.content.title"
        descriptionKey="pages.admin.content.description"
      />
    </div>
  )
}
