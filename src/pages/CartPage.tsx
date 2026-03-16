import { Link } from 'react-router-dom'
import { useCartStore } from '@/store/cartStore'
import CartItem from '@/components/features/cart/CartItem'
import CartSummary from '@/components/features/cart/CartSummary'
import styles from './CartPage.module.css'

const CartPage = () => {
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>장바구니가 비어 있습니다.</p>
        <Link to="/" className={styles.shopLink}>쇼핑 계속하기</Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>장바구니</h1>
      <div className={styles.layout}>
        <section className={styles.itemsSection}>
          <div className={styles.itemsHeader}>
            <span>상품 정보</span>
            <span className={styles.headerRight}>수량</span>
            <span className={styles.headerRight}>금액</span>
          </div>
          {items.map((item) => (
            <CartItem
              key={item.productId}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </section>

        <aside className={styles.summarySection}>
          <CartSummary items={items} />
        </aside>
      </div>
    </div>
  )
}

export default CartPage
