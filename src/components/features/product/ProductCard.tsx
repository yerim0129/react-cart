import { Link } from 'react-router-dom'
import type { Product } from '@/types/product'
import { formatPrice } from '@/utils/formatPrice'
import Badge from '@/components/common/Badge'
import Button from '@/components/common/Button'
import WishlistButton from '@/components/features/wishlist/WishlistButton'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

const CATEGORY_LABELS: Record<string, string> = {
  clothing: '의류',
  electronics: '전자기기',
  food: '식품',
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const isOutOfStock = product.stock === 0

  const handleAddToCart = () => {
    onAddToCart(product)
  }

  return (
    <article className={styles.card}>
      <Link to={`/products/${product.id}`} className={styles.imageLink}>
        <img src={product.imageUrl} alt={product.name} className={styles.image} />
        {isOutOfStock && (
          <div className={styles.outOfStockOverlay}>품절</div>
        )}
        <div className={styles.wishlistBtn}>
          <WishlistButton productId={product.id} size="sm" />
        </div>
      </Link>
      <div className={styles.body}>
        <div className={styles.meta}>
          <Badge label={CATEGORY_LABELS[product.category] ?? product.category} />
          {isOutOfStock && <Badge label="품절" variant="danger" />}
        </div>
        <Link to={`/products/${product.id}`}>
          <h3 className={styles.name}>{product.name}</h3>
        </Link>
        <p className={styles.price}>{formatPrice(product.price)}</p>
        <p className={styles.stock}>
          {isOutOfStock ? '재고 없음' : `재고 ${product.stock}개`}
        </p>
        <Button
          label="장바구니 담기"
          fullWidth
          disabled={isOutOfStock}
          onClick={handleAddToCart}
        />
      </div>
    </article>
  )
}

export default ProductCard
