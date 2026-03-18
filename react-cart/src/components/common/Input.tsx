import { forwardRef } from 'react'
import clsx from 'clsx'
import styles from './Input.module.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...rest }, ref) => {
    return (
      <div className={styles.wrapper}>
        {label && <label className={styles.label}>{label}</label>}
        <input
          ref={ref}
          className={clsx(styles.input, error && styles.inputError, className)}
          {...rest}
        />
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
