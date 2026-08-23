import { EditOutlined, LogoutOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router-dom'

import { IconButton } from '../../../components/_shared/IconButton'
import { useAccountProfile } from '../../../hooks/useAccount'
import { paths } from '../../../routes/paths'
import { formatMediumDate } from '../../../utils/formatAccount'
import { ACCOUNT_COMPACT_MQ, ACCOUNT_NAV_ITEMS } from '../consts'
import type { Props } from './types'
import styles from './styles.module.css'

const useIsCompact = () => {
  const [isCompact, setIsCompact] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia(ACCOUNT_COMPACT_MQ).matches,
  )

  useEffect(() => {
    const media = window.matchMedia(ACCOUNT_COMPACT_MQ)
    const update = () => setIsCompact(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return isCompact
}

export const AccountSidebar: Props = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const isCompact = useIsCompact()
  const profileQuery = useAccountProfile()
  const profile = profileQuery.data

  const memberSince =
    profile !== undefined
      ? formatMediumDate(profile.memberSince, i18n.language)
      : ''

  return (
    <div className={`${styles.root}${isCompact ? ` ${styles.compact}` : ''}`}>
      <div className={styles.profile}>
        <div className={styles.avatarWrap}>
          {profile ? (
            <img
              className={styles.avatar}
              src={profile.avatarUrl}
              alt={profile.displayName}
            />
          ) : (
            <div className={styles.avatarFallback} />
          )}
          <IconButton
            className={styles.editButton}
            ariaLabel={t('account.sidebar.editAvatar')}
          >
            <EditOutlined aria-hidden />
          </IconButton>
        </div>
        <div className={styles.profileText}>
          <p className={styles.name}>{profile?.displayName ?? ''}</p>
          {memberSince ? (
            <p className={styles.memberSince}>
              {t('account.sidebar.memberSince', { date: memberSince })}
            </p>
          ) : null}
        </div>
      </div>

      <nav className={styles.nav} aria-label={t('account.sidebar.navLabel')}>
        {ACCOUNT_NAV_ITEMS.map((item) => {
          const Icon = item.Icon
          return (
            <NavLink
              key={item.id}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `${styles.navLink}${isActive ? ` ${styles.navLinkActive}` : ''}`
              }
            >
              <Icon aria-hidden />
              <span>{t(item.labelKey)}</span>
            </NavLink>
          )
        })}
      </nav>

      <button
        type="button"
        className={styles.signOut}
        onClick={() => {
          navigate(paths.home)
        }}
      >
        <LogoutOutlined aria-hidden />
        <span>{t('account.sidebar.signOut')}</span>
      </button>
    </div>
  )
}
