import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProduct } from '@/hooks/useProduct'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { useReviews, useCreateReview } from '@/hooks/useReviews'
import { formatPrice } from '@/utils/formatPrice'
import { useToastStore } from '@/store/toastStore'
import { useLoginModalStore } from '@/store/loginModalStore'
import Badge from '@/components/common/Badge'
import Button from '@/components/common/Button'
import ErrorMessage from '@/components/common/ErrorMessage'
import Skeleton from '@/components/common/Skeleton'
import Modal from '@/components/common/Modal'
import WishlistButton from '@/components/features/wishlist/WishlistButton'
import ReviewList from '@/components/features/review/ReviewList'
import ReviewForm from '@/components/features/review/ReviewForm'
import styles from './ProductDetailPage.module.css'

const CATEGORY_LABELS: Record<string, string> = {
  clothing: '의류',
  electronics: '전자기기',
  food: '식품',
}

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [quantity, setQuantity] = useState(1)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  const { data: product, isLoading, isError } = useProduct(Number(id))
  const { data: reviews = [] } = useReviews(Number(id))
  const { mutate: createReview, isPending: isReviewLoading } = useCreateReview(Number(id))
  const user = useAuthStore((s) => s.user)
  const addItem = useCartStore((state) => state.addItem)
  const showToast = useToastStore((s) => s.show)
  const openLoginModal = useLoginModalStore((s) => s.open)

  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1))
  const handleIncrease = () => {
    if (!product) return
    setQuantity((prev) => Math.min(product.stock, prev + 1))
  }

  const handleAddToCart = () => {
    if (!product) return
    if (!user) { openLoginModal(); return }
    addItem(user.id, product, quantity)
    showToast(`${product.name}을(를) 장바구니에 담았습니다.`)
  }

  const handleReviewSubmit = (payload: Parameters<typeof createReview>[0]) => {
    createReview(payload, {
      onSuccess: () => setIsReviewModalOpen(false),
    })
  }

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.skeletonLayout}>
          <Skeleton height="480px" borderRadius="var(--radius-md)" />
          <div className={styles.skeletonInfo}>
            <Skeleton width="80px" height="24px" />
            <Skeleton height="36px" />
            <Skeleton width="120px" height="32px" />
            <Skeleton height="80px" />
            <Skeleton height="48px" />
          </div>
        </div>
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className={styles.page}>
        <ErrorMessage message="상품 정보를 불러올 수 없습니다." />
        <div className={styles.backWrapper}>
          <Link to="/" className={styles.backLink}>← 목록으로 돌아가기</Link>
        </div>
      </div>
    )
  }

  const isOutOfStock = product.stock === 0

  return (
    <div className={styles.page}>
      <div className={styles.backWrapper}>
        <Link to="/" className={styles.backLink}>← 목록으로 돌아가기</Link>
      </div>

      <div className={styles.layout}>
        <div className={styles.imageSection}>
          <img src={product.imageUrl} alt={product.name} className={styles.image} />
          {isOutOfStock && <div className={styles.outOfStockOverlay}>품절</div>}
        </div>

        <div className={styles.infoSection}>
          <div className={styles.badges}>
            <Badge label={CATEGORY_LABELS[product.category] ?? product.category} />
            {isOutOfStock && <Badge label="품절" variant="danger" />}
          </div>

          <div className={styles.nameRow}>
            <h1 className={styles.name}>{product.name}</h1>
            <WishlistButton productId={product.id} />
          </div>

          <p className={styles.price}>{formatPrice(product.price)}</p>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.meta}>
            <span className={styles.metaItem}>
              ⭐ {product.rating.toFixed(1)} ({product.reviewCount}개 리뷰)
            </span>
            <span className={styles.metaItem}>재고 {product.stock}개</span>
          </div>

          {!isOutOfStock && (
            <div className={styles.quantityWrapper}>
              <span className={styles.quantityLabel}>수량</span>
              <div className={styles.quantityControl}>
                <button type="button" className={styles.quantityBtn} onClick={handleDecrease} disabled={quantity <= 1}>−</button>
                <span className={styles.quantityValue}>{quantity}</span>
                <button type="button" className={styles.quantityBtn} onClick={handleIncrease} disabled={quantity >= product.stock}>+</button>
              </div>
            </div>
          )}

          <div className={styles.totalPrice}>
            총 금액 <strong>{formatPrice(product.price * quantity)}</strong>
          </div>

          <Button
            label={isOutOfStock ? '품절된 상품입니다' : '장바구니 담기'}
            fullWidth
            disabled={isOutOfStock}
            onClick={handleAddToCart}
          />
        </div>
      </div>

      {/* 리뷰 섹션 */}
      <section className={styles.reviewSection}>
        <div className={styles.reviewHeader}>
          <h2 className={styles.reviewTitle}>리뷰 {reviews.length > 0 && `(${reviews.length})`}</h2>
          <Button label="리뷰 작성" variant="secondary" onClick={() => setIsReviewModalOpen(true)} />
        </div>
        <ReviewList reviews={reviews} />
      </section>

      <Modal
        isOpen={isReviewModalOpen}
        title="리뷰 작성"
        onClose={() => setIsReviewModalOpen(false)}
      >
        <ReviewForm
          productId={product.id}
          onSubmit={handleReviewSubmit}
          isLoading={isReviewLoading}
        />
      </Modal>
    </div>
  )
}

export default ProductDetailPage
