import { PageShell } from '../../../components/_shared/PageShell'

import type { Props } from './types'
import styles from './styles.module.css'

export const Addresses: Props = () => {
  return (
    <div className={styles.root}>
      <PageShell
        titleKey="pages.accountAddresses.title"
        descriptionKey="pages.accountAddresses.description"
      />
    </div>
  )
}
