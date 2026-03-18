import { useAuthStore } from '@/store/authStore'
import { useMyOrders } from '@/hooks/useMyOrders'
import { formatPrice } from '@/utils/formatPrice'
import { formatDateTime } from '@/utils/formatDate'
import Spinner from '@/components/common/Spinner'
import ErrorMessage from '@/components/common/ErrorMessage'
import styles from './MyPage.module.css'

const MyPage = () => {
  const user = useAuthStore((s) => s.user)
  const { data: orders, isLoading, isError } = useMyOrders()

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>마이페이지</h1>

      {/* 유저 정보 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>내 정보</h2>
        <div className={styles.profileCard}>
          <div className={styles.avatar} aria-hidden="true">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className={styles.profileInfo}>
            <p className={styles.profileName}>{user?.name}</p>
            <p className={styles.profileEmail}>{user?.email}</p>
            <span className={styles.roleBadge}>
              {user?.role === 'admin' ? '관리자' : '일반 회원'}
            </span>
          </div>
        </div>
      </section>

      {/* 주문 내역 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          주문 내역
          {orders && orders.length > 0 && (
            <span className={styles.orderCount}>{orders.length}건</span>
          )}
        </h2>

        {isLoading && <Spinner />}
        {isError && <ErrorMessage message="주문 내역을 불러올 수 없습니다." />}

        {orders && orders.length === 0 && (
          <div className={styles.empty}>
            <p className={styles.emptyText}>아직 주문 내역이 없습니다.</p>
          </div>
        )}

        {orders && orders.length > 0 && (
          <ul className={styles.orderList}>
            {[...orders].reverse().map((order) => (
              <li key={order.id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <span className={styles.orderId}>주문번호 #{order.id}</span>
                  <span className={styles.orderDate}>{formatDateTime(order.createdAt)}</span>
                </div>

                <ul className={styles.itemList}>
                  {order.items.map((item) => (
                    <li key={item.productId} className={styles.item}>
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className={styles.itemImage}
                      />
                      <div className={styles.itemInfo}>
                        <p className={styles.itemName}>{item.product.name}</p>
                        <p className={styles.itemMeta}>
                          {formatPrice(item.product.price)} × {item.quantity}개
                        </p>
                      </div>
                      <p className={styles.itemTotal}>
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className={styles.orderFooter}>
                  <div className={styles.shippingInfo}>
                    <span className={styles.shippingLabel}>배송지</span>
                    <span>{order.shippingInfo.name} · {order.shippingInfo.address} {order.shippingInfo.detailAddress}</span>
                  </div>
                  <div className={styles.totalRow}>
                    <span>총 결제 금액</span>
                    <strong className={styles.totalPrice}>{formatPrice(order.totalPrice)}</strong>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default MyPage
