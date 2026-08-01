import { PageShell } from '../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const NotFound: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.notFound.title"
        descriptionKey="pages.notFound.description"
      />
    </div>
  )
}
