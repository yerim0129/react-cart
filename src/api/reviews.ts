import apiClient from './client'
import type { Review, CreateReviewPayload } from '@/types/review'

export const getReviews = async (productId: number): Promise<Review[]> => {
  const { data } = await apiClient.get<Review[]>(`/reviews?productId=${productId}`)
  return data
}

export const createReview = async (payload: CreateReviewPayload): Promise<Review> => {
  const { data } = await apiClient.post<Review>('/reviews', {
    ...payload,
    createdAt: new Date().toISOString(),
  })
  return data
}
