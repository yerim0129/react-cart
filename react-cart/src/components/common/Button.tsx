import clsx from 'clsx'
import styles from './Button.module.css'

interface ButtonProps {
  label: string
  variant?: 'primary' | 'secondary' | 'danger'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  isLoading?: boolean
  fullWidth?: boolean
  onClick?: () => void
}

const Button = ({
  label,
  variant = 'primary',
  type = 'button',
  disabled,
  isLoading,
  fullWidth,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[variant],
        (disabled || isLoading) && styles.disabled,
        fullWidth && styles.fullWidth
      )}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading && <span className={styles.spinner} aria-hidden="true" />}
      {label}
    </button>
  )
}

export default Button
