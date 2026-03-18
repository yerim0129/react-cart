import clsx from 'clsx'
import { useWishlistToggle } from '@/hooks/useWishlist'
import { useToastStore } from '@/store/toastStore'
import styles from './WishlistButton.module.css'

interface WishlistButtonProps {
  productId: number
  size?: 'sm' | 'md'
}

const WishlistButton = ({ productId, size = 'md' }: WishlistButtonProps) => {
  const { isWishlisted, toggle, isLoading } = useWishlistToggle(productId)
  const showToast = useToastStore((s) => s.show)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggle()
    showToast(isWishlisted ? '찜 목록에서 삭제했습니다.' : '찜 목록에 추가했습니다.', isWishlisted ? 'info' : 'success')
  }

  return (
    <button
      type="button"
      className={clsx(styles.btn, styles[size], isWishlisted && styles.active)}
      onClick={handleClick}
      disabled={isLoading}
      aria-label={isWishlisted ? '찜 해제' : '찜하기'}
    >
      {isWishlisted ? '♥' : '♡'}
    </button>
  )
}

export default WishlistButton
