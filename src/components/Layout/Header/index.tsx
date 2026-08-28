import { BrandName } from '../../_shared/BrandName'
import { HeaderActions } from '../../features/header/HeaderActions'
import { HeaderNav } from '../../features/header/HeaderNav'
import { LanguageSelect } from '../../features/header/LanguageSelect'
import { MobileMenu } from '../../features/header/MobileMenu'
import type { Props } from './types'
import styles from './styles.module.css'

export const Header: Props = () => {
  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.leading}>
          <MobileMenu />
        </div>
        <div className={styles.brand}>
          <BrandName />
        </div>
        <div className={styles.nav}>
          <HeaderNav />
        </div>
        <div className={styles.trailing}>
          <div className={styles.desktopLang}>
            <LanguageSelect />
          </div>
          <HeaderActions />
        </div>
      </div>
    </header>
  )
}
