import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'
import styles from './ErrorBoundary.module.css'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // 실무에서는 Sentry 등 에러 모니터링 서비스로 전송
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <p className={styles.icon}>⚠</p>
          <h1 className={styles.title}>예상치 못한 오류가 발생했습니다</h1>
          <p className={styles.description}>
            잠시 후 다시 시도해주세요. 문제가 계속되면 고객센터에 문의해주세요.
          </p>
          {import.meta.env.DEV && this.state.error && (
            <pre className={styles.detail}>{this.state.error.message}</pre>
          )}
          <button type="button" className={styles.button} onClick={this.handleReset}>
            홈으로 돌아가기
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
