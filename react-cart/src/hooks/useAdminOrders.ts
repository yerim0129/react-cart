import { useQuery } from '@tanstack/react-query'
import { getAllOrders } from '@/api/adminOrders'

export const useAdminOrders = () => {
  return useQuery({
    queryKey: ['admin', 'orders'],
    queryFn: getAllOrders,
  })
}
