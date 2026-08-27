import { useTranslation } from 'react-i18next'

import type { Props } from './types'
import styles from './styles.module.css'

export const ProductSelection: Props = ({
  variants,
  value,
  onChange,
  disabled,
}) => {
  const { t } = useTranslation()

  return (
    <div className={styles.root}>
      <p className={styles.label}>{t('pages.productDetails.selectionLabel')}</p>
      <div className={styles.group} role="radiogroup">
        {variants.map((variant) => {
          const isSelected = variant.id === value

          return (
            <button
              key={variant.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`${styles.pill}${isSelected ? ` ${styles.pillActive}` : ''}`}
              disabled={disabled}
              onClick={() => onChange(variant.id)}
            >
              {t(variant.labelKey)}
            </button>
          )
        })}
      </div>
    </div>
  )
}
