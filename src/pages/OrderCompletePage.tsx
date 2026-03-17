import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import styles from './OrderCompletePage.module.css'

interface LocationState {
  orderId: number
}

const OrderCompletePage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as LocationState | null

  useEffect(() => {
    if (!state?.orderId) {
      navigate('/', { replace: true })
    }
  }, [state, navigate])

  if (!state?.orderId) return null

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <span className={styles.icon}>✓</span>
        </div>
        <h1 className={styles.title}>주문이 완료되었습니다</h1>
        <p className={styles.orderId}>주문번호 <strong>#{state.orderId}</strong></p>
        <p className={styles.description}>
          주문하신 상품을 빠르게 배송해드리겠습니다.<br />
          배송 현황은 마이페이지에서 확인하실 수 있습니다.
        </p>
        <div className={styles.actions}>
          <Link to="/mypage" className={styles.primaryBtn}>주문 내역 확인</Link>
          <Link to="/" className={styles.secondaryBtn}>쇼핑 계속하기</Link>
        </div>
      </div>
    </div>
  )
}

export default OrderCompletePage
