import { useNavigate } from 'react-router-dom'
import { useLoginModalStore } from '@/store/loginModalStore'
import Modal from './Modal'
import Button from './Button'
import styles from './LoginRequiredModal.module.css'

const LoginRequiredModal = () => {
  const navigate = useNavigate()
  const { isOpen, close } = useLoginModalStore()

  const handleConfirm = () => {
    close()
    navigate('/login')
  }

  return (
    <Modal isOpen={isOpen} title="로그인이 필요합니다" onClose={close}>
      <p className={styles.message}>이 기능을 사용하려면 로그인이 필요합니다.</p>
      <div className={styles.actions}>
        <Button label="취소" variant="secondary" onClick={close} />
        <Button label="로그인하기" onClick={handleConfirm} />
      </div>
    </Modal>
  )
}

export default LoginRequiredModal
