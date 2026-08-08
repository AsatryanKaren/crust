import { PageShell } from '../../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const ForgotPassword: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.auth.forgotPassword.title"
        descriptionKey="pages.auth.forgotPassword.description"
      />
    </div>
  )
}
