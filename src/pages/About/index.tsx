import { PageShell } from '../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const About: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.about.title"
        descriptionKey="pages.about.description"
      />
    </div>
  )
}
