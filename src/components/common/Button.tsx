import clsx from 'clsx'
import styles from './Button.module.css'

interface ButtonProps {
  label: string
  variant?: 'primary' | 'secondary' | 'danger'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  fullWidth?: boolean
  onClick?: () => void
}

const Button = ({
  label,
  variant = 'primary',
  type = 'button',
  disabled,
  fullWidth,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        fullWidth && styles.fullWidth
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button
