import { Link } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useCartStore } from '@/store/cartStore'
import { useLogout } from '@/hooks/useAuth'
import styles from './Header.module.css'

const Header = () => {
  const user = useAuthStore((s) => s.user)
  const totalQuantity = useCartStore((s) =>
    user ? s.getTotalCount(user.id) : 0
  )
  const logout = useLogout()

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>ShopTS</Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>상품</Link>

          {user !== null ? (
            <>
              {user?.role === 'admin' && (
                <Link to="/admin/products" className={styles.adminLink}>관리자</Link>
              )}
              <Link to="/wishlist" className={styles.navLink}>찜하기</Link>
              <Link to="/cart" className={styles.cartLink}>
                장바구니
                {totalQuantity > 0 && (
                  <span className={styles.badge}>{totalQuantity}</span>
                )}
              </Link>
              <span className={styles.userName}>{user?.name}</span>
              <button type="button" className={styles.logoutBtn} onClick={logout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.navLink}>로그인</Link>
              <Link to="/register" className={styles.navLink}>회원가입</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
