import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { HEADER_NAV_ITEMS } from '../consts'
import type { Props } from './types'
import styles from './styles.module.css'

export const HeaderNav: Props = ({
  orientation = 'horizontal',
  onNavigate,
}) => {
  const { t } = useTranslation()
  const isVertical = orientation === 'vertical'

  return (
    <nav aria-label={t('header.mainNav')}>
      <ul
        className={
          isVertical ? `${styles.list} ${styles.listVertical}` : styles.list
        }
      >
        {HEADER_NAV_ITEMS.map(({ id, to, labelKey }) => (
          <li key={id}>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              end={to === '/'}
              to={to}
              onClick={onNavigate}
            >
              {t(labelKey)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
