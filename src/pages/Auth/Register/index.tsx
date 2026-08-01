import { PageShell } from '../../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const Register: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.auth.register.title"
        descriptionKey="pages.auth.register.description"
      />
    </div>
  )
}
