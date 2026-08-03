import { PageShell } from '../../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const ResetPassword: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.auth.resetPassword.title"
        descriptionKey="pages.auth.resetPassword.description"
      />
    </div>
  )
}
