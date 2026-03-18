import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getProducts } from '@/api/products'
import { createProduct, updateProduct, deleteProduct } from '@/api/adminProducts'

export const useAdminProducts = () => {
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['products'] })

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: invalidate,
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Parameters<typeof updateProduct>[1] }) =>
      updateProduct(id, payload),
    onSuccess: invalidate,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: invalidate,
  })

  return {
    productsQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  }
}
