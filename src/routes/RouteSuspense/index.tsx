import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import type { Props } from './types'
import styles from './styles.module.css'

const RouteFallback = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.root} role="status">
      {t('routes.loading')}
    </div>
  )
}

export const RouteSuspense: Props = () => {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Outlet />
    </Suspense>
  )
}
