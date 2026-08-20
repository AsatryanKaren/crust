import styles from './style.module.css';
import type { Props } from './types';

const Button: Props = ({
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
  );
};

export default Button;
