import clsx from 'clsx'
import styles from './Badge.module.css'

interface BadgeProps {
  label: string
  variant?: 'default' | 'success' | 'danger'
}

const Badge = ({ label, variant = 'default' }: BadgeProps) => {
  return (
    <span className={clsx(styles.badge, styles[variant])}>
      {label}
    </span>
  )
}

export default Badge
