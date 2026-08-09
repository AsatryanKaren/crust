import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { MOBILE_BOTTOM_NAV_ITEMS } from './consts'
import type { Props } from './types'
import styles from './styles.module.css'

export const MobileBottomNav: Props = () => {
  const { t } = useTranslation()

  return (
    <nav className={styles.root} aria-label={t('mobileBottomNav.label')}>
      <ul className={styles.list}>
        {MOBILE_BOTTOM_NAV_ITEMS.map(
          ({ id, to, labelKey, Icon, ActiveIcon, end }) => (
            <li key={id} className={styles.item}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
                to={to}
                end={end}
              >
                {({ isActive }) => {
                  const NavIcon = isActive ? ActiveIcon : Icon

                  return (
                    <>
                      <NavIcon className={styles.icon} aria-hidden />
                      <span className={styles.label}>{t(labelKey)}</span>
                    </>
                  )
                }}
              </NavLink>
            </li>
          ),
        )}
      </ul>
    </nav>
  )
}
