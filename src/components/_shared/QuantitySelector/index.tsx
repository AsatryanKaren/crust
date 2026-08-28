import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import type { Props } from './types'
import styles from './styles.module.css'

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(max, Math.max(min, value))
}

export const QuantitySelector: Props = ({
  value,
  onChange,
  min,
  max,
  disabled,
  id,
}) => {
  const { t } = useTranslation()

  const commit = (next: number) => {
    if (Number.isNaN(next)) {
      onChange(min)
      return
    }

    onChange(clamp(next, min, max))
  }

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.step}
        aria-label={t('quantitySelector.decrease')}
        disabled={disabled || value <= min}
        onClick={() => commit(value - 1)}
      >
        <MinusOutlined aria-hidden />
      </button>
      <input
        id={id}
        className={styles.input}
        type="text"
        inputMode="numeric"
        value={value}
        disabled={disabled}
        onChange={(event) => {
          const parsed = Number.parseInt(event.target.value, 10)
          commit(parsed)
        }}
      />
      <button
        type="button"
        className={styles.step}
        aria-label={t('quantitySelector.increase')}
        disabled={disabled || value >= max}
        onClick={() => commit(value + 1)}
      >
        <PlusOutlined aria-hidden />
      </button>
    </div>
  )
}
