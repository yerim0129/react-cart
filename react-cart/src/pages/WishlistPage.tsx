import { Link } from 'react-router-dom'
import { useProducts } from '@/hooks/useProducts'
import { useWishlistStore } from '@/store/wishlistStore'
import { formatPrice } from '@/utils/formatPrice'
import WishlistButton from '@/components/features/wishlist/WishlistButton'
import Spinner from '@/components/common/Spinner'
import ErrorMessage from '@/components/common/ErrorMessage'
import styles from './WishlistPage.module.css'

const WishlistPage = () => {
  const { productIds } = useWishlistStore()
  const { data: products, isLoading, isError } = useProducts()

  const wishlistedProducts = products?.filter((p) => productIds.includes(p.id)) ?? []

  if (isLoading) {
    return (
      <div className={styles.center}>
        <Spinner size="lg" />
      </div>
    )
  }

  if (isError) {
    return <ErrorMessage message="상품 정보를 불러올 수 없습니다." />
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>찜한 상품</h1>
      <p className={styles.count}>{wishlistedProducts.length}개의 상품</p>

      {wishlistedProducts.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>찜한 상품이 없습니다.</p>
          <Link to="/" className={styles.shopLink}>쇼핑하러 가기</Link>
        </div>
      ) : (
        <ul className={styles.grid}>
          {wishlistedProducts.map((product) => (
            <li key={product.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Link to={`/products/${product.id}`}>
                  <img src={product.imageUrl} alt={product.name} className={styles.image} />
                </Link>
                <div className={styles.wishlistBtn}>
                  <WishlistButton productId={product.id} size="sm" />
                </div>
              </div>
              <div className={styles.body}>
                <Link to={`/products/${product.id}`}>
                  <p className={styles.name}>{product.name}</p>
                </Link>
                <p className={styles.price}>{formatPrice(product.price)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default WishlistPage
