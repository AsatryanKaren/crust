import type { Props } from './types'
import styles from './styles.module.css'

export const CatalogLayout: Props = ({ sidebar, heading, children }) => {
  return (
    <div className={styles.root}>
      {heading ? <div className={styles.headingArea}>{heading}</div> : null}
      <aside className={styles.sidebar}>{sidebar}</aside>
      <div className={styles.main}>{children}</div>
    </div>
  )
}
