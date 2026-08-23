import { Button } from 'antd'

import type { Props } from './types'
import styles from './styles.module.css'

export const IconButton: Props = ({
  ariaLabel,
  children,
  onClick,
  disabled,
  className,
}) => {
  return (
    <Button
      type="text"
      shape="circle"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.root}${className ? ` ${className}` : ''}`}
      icon={children}
    />
  )
}
