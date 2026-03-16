import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getReviews, createReview } from '@/api/reviews'
import type { CreateReviewPayload } from '@/types/review'

export const useReviews = (productId: number) => {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => getReviews(productId),
    enabled: !!productId,
  })
}

export const useCreateReview = (productId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateReviewPayload) => createReview(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] })
    },
  })
}
