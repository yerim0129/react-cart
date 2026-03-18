import { useNavigate } from 'react-router-dom'
import Button from '@/components/common/Button'
import styles from './NotFoundPage.module.css'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>페이지를 찾을 수 없습니다</h1>
      <p className={styles.description}>
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <Button label="홈으로 돌아가기" onClick={() => navigate('/')} />
    </div>
  )
}

export default NotFoundPage
