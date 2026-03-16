import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useProduct } from '@/hooks/useProduct'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/utils/formatPrice'
import Badge from '@/components/common/Badge'
import Button from '@/components/common/Button'
import Spinner from '@/components/common/Spinner'
import ErrorMessage from '@/components/common/ErrorMessage'
import Skeleton from '@/components/common/Skeleton'
import styles from './ProductDetailPage.module.css'

const CATEGORY_LABELS: Record<string, string> = {
  clothing: '의류',
  electronics: '전자기기',
  food: '식품',
}

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)

  const { data: product, isLoading, isError } = useProduct(Number(id))
  const addItem = useCartStore((state) => state.addItem)

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  const handleIncrease = () => {
    if (!product) return
    setQuantity((prev) => Math.min(product.stock, prev + 1))
  }

  const handleAddToCart = () => {
    if (!product) return
    addItem(product, quantity)
    navigate('/cart')
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

          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>{formatPrice(product.price)}</p>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.meta}>
            <span className={styles.metaItem}>
              ⭐ {product.rating.toFixed(1)} ({product.reviewCount}개 리뷰)
            </span>
            <span className={styles.metaItem}>
              재고 {product.stock}개
            </span>
          </div>

          {!isOutOfStock && (
            <div className={styles.quantityWrapper}>
              <span className={styles.quantityLabel}>수량</span>
              <div className={styles.quantityControl}>
                <button
                  type="button"
                  className={styles.quantityBtn}
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className={styles.quantityValue}>{quantity}</span>
                <button
                  type="button"
                  className={styles.quantityBtn}
                  onClick={handleIncrease}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
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
    </div>
  )
}

export default ProductDetailPage
