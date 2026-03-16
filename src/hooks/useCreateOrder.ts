import { useMutation } from '@tanstack/react-query'
import { createOrder } from '@/api/orders'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '@/store/cartStore'

export const useCreateOrder = () => {
  const navigate = useNavigate()
  const clearCart = useCartStore((s) => s.clearCart)

  return useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      clearCart()
      navigate('/order-complete', { state: { orderId: data.id } })
    },
  })
}
