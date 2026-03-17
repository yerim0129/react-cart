import { useState } from 'react'
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
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>ShopTS</Link>

        {/* 데스크탑 nav */}
        <nav className={styles.nav} aria-label="주요 메뉴">
          <Link to="/" className={styles.navLink}>상품</Link>
          {user !== null ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin/products" className={styles.adminLink}>관리자</Link>
              )}
              <Link to="/wishlist" className={styles.navLink}>찜하기</Link>
              <Link to="/cart" className={styles.cartLink} aria-label={`장바구니 ${totalQuantity > 0 ? `${totalQuantity}개` : ''}`}>
                장바구니
                {totalQuantity > 0 && (
                  <span className={styles.badge} aria-hidden="true">{totalQuantity}</span>
                )}
              </Link>
              <span className={styles.userName}>{user.name}</span>
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

        {/* 모바일 햄버거 버튼 */}
        <button
          type="button"
          className={styles.hamburger}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {menuOpen && (
        <nav id="mobile-menu" className={styles.mobileMenu} aria-label="모바일 메뉴">
          <Link to="/" className={styles.mobileLink} onClick={closeMenu}>상품</Link>
          {user !== null ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin/products" className={styles.mobileLink} onClick={closeMenu}>관리자</Link>
              )}
              <Link to="/wishlist" className={styles.mobileLink} onClick={closeMenu}>찜하기</Link>
              <Link to="/cart" className={styles.mobileLink} onClick={closeMenu}>
                장바구니 {totalQuantity > 0 && `(${totalQuantity})`}
              </Link>
              <span className={styles.mobileUserName}>{user.name}</span>
              <button
                type="button"
                className={styles.mobileLogoutBtn}
                onClick={() => { logout(); closeMenu() }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.mobileLink} onClick={closeMenu}>로그인</Link>
              <Link to="/register" className={styles.mobileLink} onClick={closeMenu}>회원가입</Link>
            </>
          )}
        </nav>
      )}
    </header>
  )
}

export default Header
