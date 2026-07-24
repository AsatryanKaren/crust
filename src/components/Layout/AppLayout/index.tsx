import { Footer } from '../Footer'
import { Header } from '../Header'
import type { Props } from './types'
import styles from './styles.module.css'

export const AppLayout: Props = ({ children }) => {
  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  )
}
