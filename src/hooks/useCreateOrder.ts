import { useMutation } from '@tanstack/react-query'
import { createOrder } from '@/api/orders'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'

export const useCreateOrder = () => {
  const navigate = useNavigate()
  const clearCart = useCartStore((s) => s.clearCart)
  const user = useAuthStore((s) => s.user)

  return useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      if (user) clearCart(user.id)
      navigate('/order-complete', { state: { orderId: data.id } })
    },
  })
}
