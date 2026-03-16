import { useQuery } from '@tanstack/react-query'
import { getProductById } from '@/api/products'

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  })
}
