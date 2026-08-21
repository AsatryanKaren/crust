import { Menu } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { categoryIconMap } from '../consts'
import type { Props } from './types'
import styles from './styles.module.css'

const COMPACT_MQ = '(max-width: 1024px)'

const useIsCompact = () => {
  const [isCompact, setIsCompact] = useState(
    () =>
      typeof window !== 'undefined' && window.matchMedia(COMPACT_MQ).matches,
  )

  useEffect(() => {
    const media = window.matchMedia(COMPACT_MQ)
    const update = () => setIsCompact(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return isCompact
}

export const CategorySidebar: Props = ({
  categories,
  activeSlug,
  onSelect,
}) => {
  const { t } = useTranslation()
  const isCompact = useIsCompact()

  return (
    <nav
      className={styles.root}
      aria-label={t('pages.catalog.categoriesTitle')}
    >
      <h2 className={styles.title}>{t('pages.catalog.categoriesTitle')}</h2>
      <Menu
        className={`${styles.menu}${isCompact ? ` ${styles.menuCompact}` : ''}`}
        mode={isCompact ? 'horizontal' : 'inline'}
        disabledOverflow={isCompact}
        selectedKeys={[activeSlug]}
        onClick={({ key }) => onSelect(String(key))}
        items={categories.map((category) => ({
          key: category.slug,
          icon: categoryIconMap[category.icon],
          label: (
            <span
              aria-current={category.slug === activeSlug ? 'page' : undefined}
            >
              {t(category.nameKey)}
            </span>
          ),
        }))}
      />
    </nav>
  )
}
