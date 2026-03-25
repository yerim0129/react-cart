import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { useCreateOrder } from '@/hooks/useCreateOrder'
import { formatPrice } from '@/utils/formatPrice'
import type { ShippingFormValues } from '@/utils/validators'
import CheckoutForm from '@/components/features/checkout/CheckoutForm'
import ErrorMessage from '@/components/common/ErrorMessage'
import styles from './CheckoutPage.module.css'

const SHIPPING_FEE = 3000
const FREE_SHIPPING_THRESHOLD = 50000

const CheckoutPage = () => {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const getItems = useCartStore((s) => s.getItems)
  const items = user ? getItems(user.id) : []
  const { mutate: createOrder, isPending, isError } = useCreateOrder()
  const isSubmitting = useRef(false)

  useEffect(() => {
    if (items.length === 0 && !isSubmitting.current) {
      navigate('/cart', { replace: true })
    }
  }, [items.length, navigate])

  if (items.length === 0) return null

  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shippingFee = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const finalPrice = totalPrice + shippingFee

  const handleSubmit = (shippingInfo: ShippingFormValues) => {
    isSubmitting.current = true
    createOrder({
      items,
      shippingInfo,
      totalPrice: finalPrice,
      createdAt: new Date().toISOString(),
    })
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>결제</h1>

      {isError && (
        <ErrorMessage message="주문 처리 중 오류가 발생했습니다. 다시 시도해주세요." />
      )}

      <div className={styles.layout}>
        <div className={styles.formSection}>
          <CheckoutForm onSubmit={handleSubmit} isLoading={isPending} />
        </div>

        <aside className={styles.summarySection}>
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>주문 상품</h2>
            <ul className={styles.itemList}>
              {items.map((item) => (
                <li key={item.productId} className={styles.item}>
                  <span className={styles.itemName}>
                    {item.product.name}
                    <span className={styles.itemQty}> × {item.quantity}</span>
                  </span>
                  <span className={styles.itemPrice}>
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className={styles.divider} />
            <div className={styles.row}>
              <span className={styles.rowLabel}>상품 금액</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.rowLabel}>배송비</span>
              <span className={shippingFee === 0 ? styles.free : undefined}>
                {shippingFee === 0 ? '무료' : formatPrice(shippingFee)}
              </span>
            </div>
            <div className={styles.divider} />
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>총 결제 금액</span>
              <span className={styles.totalValue}>{formatPrice(finalPrice)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default CheckoutPage
