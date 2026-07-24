import { DownOutlined } from '@ant-design/icons'
import { useEffect, useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from '../../../../i18n/consts'
import type { Props } from './types'
import styles from './styles.module.css'

/** Display order matching common language switcher UIs (AM → RU → EN). */
const LANGUAGE_MENU_ORDER: SupportedLanguage[] = ['hy', 'ru', 'en']

export const LanguageSelect: Props = ({ placement = 'down' }) => {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  const resolvedLanguage = i18n.resolvedLanguage ?? i18n.language
  const languageCode = resolvedLanguage.split('-')[0] as SupportedLanguage
  const currentCode = SUPPORTED_LANGUAGES.includes(languageCode)
    ? languageCode
    : 'en'

  useEffect(() => {
    if (!open) {
      return
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
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

  const selectLanguage = (language: SupportedLanguage) => {
    void i18n.changeLanguage(language)
    setOpen(false)
  }

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={menuId}
        aria-label={t('header.language')}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{t(`header.languages.${currentCode}`)}</span>
        {placement === 'down' ? (
          <DownOutlined className={styles.chevron} aria-hidden />
        ) : null}
      </button>
      {open ? (
        <ul
          className={
            placement === 'up'
              ? `${styles.menu} ${styles.menuUp}`
              : styles.menu
          }
          id={menuId}
          role="listbox"
        >
          {LANGUAGE_MENU_ORDER.map((language) => (
            <li
              key={language}
              role="option"
              aria-selected={language === currentCode}
            >
              <button
                type="button"
                className={
                  language === currentCode
                    ? `${styles.option} ${styles.optionActive}`
                    : styles.option
                }
                onClick={() => selectLanguage(language)}
              >
                {t(`header.languages.${language}`)}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
