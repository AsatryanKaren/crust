import { Outlet } from 'react-router-dom'

import { AccountSidebar } from './AccountSidebar'
import type { Props } from './types'
import styles from './styles.module.css'

export const Account: Props = () => {
  return (
    <div className={styles.root}>
      <aside className={styles.sidebar}>
        <AccountSidebar />
      </aside>
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  )
}
