import clsx from 'clsx'
import { useWishlistToggle } from '@/hooks/useWishlist'
import styles from './WishlistButton.module.css'

interface WishlistButtonProps {
  productId: number
  size?: 'sm' | 'md'
}

const WishlistButton = ({ productId, size = 'md' }: WishlistButtonProps) => {
  const { isWishlisted, toggle, isLoading } = useWishlistToggle(productId)

  return (
    <button
      type="button"
      className={clsx(styles.btn, styles[size], isWishlisted && styles.active)}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle()
      }}
      disabled={isLoading}
      aria-label={isWishlisted ? '찜 해제' : '찜하기'}
    >
      {isWishlisted ? '♥' : '♡'}
    </button>
  )
}

export default WishlistButton
