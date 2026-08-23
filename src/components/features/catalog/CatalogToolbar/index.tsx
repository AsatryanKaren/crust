import { DownOutlined, SortAscendingOutlined } from '@ant-design/icons'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import { Input } from 'antd'
import { useEffect, useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { ProductSort } from '../../../../types/product'
import { SORT_OPTIONS } from './consts'
import type { Props } from './types'
import styles from './styles.module.css'

export const CatalogToolbar: Props = ({
  search,
  sort,
  onSearchChange,
  onSortChange,
  showSearch = true,
  showSort = true,
}) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const rootClassName =
    showSort && !showSearch ? `${styles.root} ${styles.sortOnly}` : styles.root

  useEffect(() => {
    if (!open) {
      return
    }

    const onPointerDown = (event: MouseEvent) => {
      if (
        !(event.target instanceof Node) ||
        !sortRef.current?.contains(event.target)
      ) {
        setOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const selectSort = (value: ProductSort) => {
    onSortChange(value)
    setOpen(false)
  }

  return (
    <div className={rootClassName}>
      {showSearch ? (
        <Input
          className={styles.search}
          allowClear
          value={search}
          placeholder={t('pages.catalog.searchPlaceholder')}
          aria-label={t('pages.catalog.searchAriaLabel')}
          prefix={
            <SearchOutlined className={styles.searchIcon} fontSize="small" />
          }
          onChange={(event) => onSearchChange(event.target.value)}
        />
      ) : null}
      {showSort ? (
        <div className={styles.sort} ref={sortRef}>
          <span className={styles.sortLabel}>
            {t('pages.catalog.sortLabel')}:
          </span>
          <div className={styles.sortSelect}>
            <button
              type="button"
              className={styles.sortTrigger}
              aria-expanded={open}
              aria-haspopup="listbox"
              aria-controls={menuId}
              aria-label={t('pages.catalog.sortAriaLabel')}
              onClick={() => setOpen((value) => !value)}
            >
              <span className={styles.sortIcon} aria-hidden>
                <SortAscendingOutlined />
              </span>
              <span className={styles.sortValue}>
                {t(`pages.catalog.sort.${sort}`)}
              </span>
              <DownOutlined className={styles.sortChevron} aria-hidden />
            </button>
            {open ? (
              <ul className={styles.sortMenu} id={menuId} role="listbox">
                {SORT_OPTIONS.map((option) => (
                  <li
                    key={option}
                    role="option"
                    aria-selected={option === sort}
                  >
                    <button
                      type="button"
                      className={
                        option === sort
                          ? `${styles.sortOption} ${styles.sortOptionActive}`
                          : styles.sortOption
                      }
                      onClick={() => selectSort(option)}
                    >
                      {t(`pages.catalog.sort.${option}`)}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
