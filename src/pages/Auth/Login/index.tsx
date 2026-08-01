import { PageShell } from '../../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const Login: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.auth.login.title"
        descriptionKey="pages.auth.login.description"
      />
    </div>
  )
}
