import { useToastStore } from '@/store/toastStore'
import styles from './Toast.module.css'

const Toast = () => {
  const { toasts, remove } = useToastStore()

  if (toasts.length === 0) return null

  return (
    <div className={styles.container} aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type]}`}
          role="alert"
        >
          <span className={styles.message}>{toast.message}</span>
          <button
            type="button"
            className={styles.close}
            onClick={() => remove(toast.id)}
            aria-label="알림 닫기"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}

export default Toast
