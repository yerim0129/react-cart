import { useNavigate } from 'react-router-dom'
import type { CartItem } from '@/types/order'
import { formatPrice } from '@/utils/formatPrice'
import Button from '@/components/common/Button'
import styles from './CartSummary.module.css'

const SHIPPING_FEE = 3000
const FREE_SHIPPING_THRESHOLD = 50000

interface CartSummaryProps {
  items: CartItem[]
}

const CartSummary = ({ items }: CartSummaryProps) => {
  const navigate = useNavigate()
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shippingFee = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const finalPrice = totalPrice + shippingFee

  const handleCheckout = () => {
    navigate('/checkout')
  }

  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>주문 요약</h2>

      <div className={styles.rows}>
        <div className={styles.row}>
          <span className={styles.label}>상품 금액</span>
          <span className={styles.value}>{formatPrice(totalPrice)}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>배송비</span>
          <span className={shippingFee === 0 ? styles.freeShipping : styles.value}>
            {shippingFee === 0 ? '무료' : formatPrice(shippingFee)}
          </span>
        </div>
        {totalPrice < FREE_SHIPPING_THRESHOLD && (
          <p className={styles.shippingNotice}>
            {formatPrice(FREE_SHIPPING_THRESHOLD - totalPrice)} 더 담으면 무료 배송
          </p>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.totalRow}>
        <span className={styles.totalLabel}>총 결제 금액</span>
        <span className={styles.totalValue}>{formatPrice(finalPrice)}</span>
      </div>

      <Button label="결제하기" fullWidth onClick={handleCheckout} />
    </div>
  )
}

export default CartSummary
