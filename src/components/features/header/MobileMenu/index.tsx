import { CloseOutlined, MenuOutlined } from '@ant-design/icons'
import { useEffect, useId, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BrandName } from '../../../_shared/BrandName'
import { HeaderNav } from '../HeaderNav'
import { LanguageSelect } from '../LanguageSelect'
import type { Props } from './types'
import styles from './styles.module.css'

export const MobileMenu: Props = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const panelId = useId()

  useEffect(() => {
    if (!open) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={t('header.openMenu')}
        onClick={() => setOpen(true)}
      >
        <MenuOutlined aria-hidden />
      </button>

      {open ? (
        <button
          type="button"
          className={styles.backdrop}
          aria-label={t('header.closeMenu')}
          onClick={close}
        />
      ) : null}

      <div
        id={panelId}
        className={open ? `${styles.panel} ${styles.panelOpen}` : styles.panel}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-label={t('header.mainNav')}
      >
        <div className={styles.panelHeader}>
          <BrandName />
          <button
            type="button"
            className={styles.close}
            aria-label={t('header.closeMenu')}
            onClick={close}
          >
            <CloseOutlined aria-hidden />
          </button>
        </div>
        <div className={styles.nav}>
          <HeaderNav orientation="vertical" onNavigate={close} />
        </div>
        <div className={styles.language}>
          <LanguageSelect placement="up" />
        </div>
      </div>
    </>
  )
}
