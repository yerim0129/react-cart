import type { CartItem as CartItemType } from '@/types/order'
import { formatPrice } from '@/utils/formatPrice'
import styles from './CartItem.module.css'

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (productId: number, quantity: number) => void
  onRemove: (productId: number) => void
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const { product, quantity } = item

  const handleDecrease = () => {
    if (quantity <= 1) return
    onUpdateQuantity(product.id, quantity - 1)
  }

  const handleIncrease = () => {
    if (quantity >= product.stock) return
    onUpdateQuantity(product.id, quantity + 1)
  }

  const handleRemove = () => {
    onRemove(product.id)
  }

  return (
    <div className={styles.item}>
      <img src={product.imageUrl} alt={product.name} className={styles.image} />

      <div className={styles.info}>
        <p className={styles.name}>{product.name}</p>
        <p className={styles.unitPrice}>{formatPrice(product.price)}</p>
      </div>

      <div className={styles.quantityControl}>
        <button
          type="button"
          className={styles.quantityBtn}
          onClick={handleDecrease}
          disabled={quantity <= 1}
          aria-label="수량 감소"
        >
          −
        </button>
        <span className={styles.quantityValue}>{quantity}</span>
        <button
          type="button"
          className={styles.quantityBtn}
          onClick={handleIncrease}
          disabled={quantity >= product.stock}
          aria-label="수량 증가"
        >
          +
        </button>
      </div>

      <p className={styles.subtotal}>{formatPrice(product.price * quantity)}</p>

      <button
        type="button"
        className={styles.removeBtn}
        onClick={handleRemove}
        aria-label="항목 삭제"
      >
        ✕
      </button>
    </div>
  )
}

export default CartItem
