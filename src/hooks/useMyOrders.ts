import { useQuery } from '@tanstack/react-query'
import { getMyOrders } from '@/api/orders'
import { useAuthStore } from '@/store/authStore'

export const useMyOrders = () => {
  const user = useAuthStore((s) => s.user)

  return useQuery({
    queryKey: ['orders', 'my', user?.id],
    queryFn: () => getMyOrders(user!.id),
    enabled: user !== null,
  })
}
