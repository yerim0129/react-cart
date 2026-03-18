import { useAdminOrders } from '@/hooks/useAdminOrders'
import { formatPrice } from '@/utils/formatPrice'
import { formatDateTime } from '@/utils/formatDate'
import Spinner from '@/components/common/Spinner'
import ErrorMessage from '@/components/common/ErrorMessage'
import styles from './AdminOrdersPage.module.css'

const AdminOrdersPage = () => {
  const { data: orders, isLoading, isError } = useAdminOrders()

  if (isLoading) return <Spinner />
  if (isError) return <ErrorMessage message="주문 목록을 불러올 수 없습니다." />

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>주문 관리</h1>

      {orders && orders.length === 0 ? (
        <p className={styles.empty}>주문 내역이 없습니다.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>주문번호</th>
                <th>수령인</th>
                <th>주소</th>
                <th>상품 수</th>
                <th>결제 금액</th>
                <th>주문 일시</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order.id}>
                  <td className={styles.idCell}>#{order.id}</td>
                  <td>
                    <div className={styles.recipient}>
                      <span className={styles.name}>{order.shippingInfo.name}</span>
                      <span className={styles.phone}>{order.shippingInfo.phone}</span>
                    </div>
                  </td>
                  <td className={styles.addressCell}>
                    {order.shippingInfo.address} {order.shippingInfo.detailAddress}
                  </td>
                  <td className={styles.countCell}>
                    {order.items.length}개 상품
                    <div className={styles.itemNames}>
                      {order.items.map((item) => (
                        <span key={item.productId}>
                          {item.product.name} ×{item.quantity}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className={styles.priceCell}>{formatPrice(order.totalPrice)}</td>
                  <td className={styles.dateCell}>{formatDateTime(order.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminOrdersPage
