import { Link } from 'react-router-dom'
import { useCartStore } from '@/store/cartStore'
import styles from './Header.module.css'

const Header = () => {
  const totalQuantity = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  )

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          ShopTS
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            상품
          </Link>
          <Link to="/cart" className={styles.cartLink}>
            장바구니
            {totalQuantity > 0 && (
              <span className={styles.badge}>{totalQuantity}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
