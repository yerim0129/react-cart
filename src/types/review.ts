export interface Review {
  id: number
  productId: number
  rating: number
  content: string
  author: string
  createdAt: string
}

export interface CreateReviewPayload {
  productId: number
  rating: number
  content: string
  author: string
}
