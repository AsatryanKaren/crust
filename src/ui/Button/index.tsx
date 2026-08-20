import type { Props } from './types'
import styles from './styles.module.css'

export const Button: Props = ({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  disabled,
  htmlType = 'button',
}) => {
  return (
    <button
      type={htmlType}
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
