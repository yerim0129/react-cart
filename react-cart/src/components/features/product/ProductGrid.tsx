import { useNavigate } from 'react-router-dom'
import type { Product } from '@/types/product'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import ProductCard from './ProductCard'
import Skeleton from '@/components/common/Skeleton'
import styles from './ProductGrid.module.css'

interface ProductGridProps {
  products: Product[]
}

const ProductGrid = ({ products }: ProductGridProps) => {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const addItem = useCartStore((s) => s.addItem)

  const handleAddToCart = (product: Product) => {
    if (!user) {
      navigate('/login')
      return
    }
    addItem(user.id, product)
  }

  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <p>검색 결과가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
      ))}
    </div>
  )
}

export const ProductGridSkeleton = () => {
  return (
    <div className={styles.grid}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className={styles.skeletonCard}>
          <Skeleton height="200px" borderRadius="0" />
          <div className={styles.skeletonBody}>
            <Skeleton width="60px" height="20px" />
            <Skeleton height="18px" />
            <Skeleton width="80px" height="22px" />
            <Skeleton height="36px" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductGrid
