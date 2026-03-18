import apiClient from './client'
import type { WishlistItem } from '@/types/wishlist'

export const getWishlists = async (): Promise<WishlistItem[]> => {
  const { data } = await apiClient.get<WishlistItem[]>('/wishlists')
  return data
}

export const addWishlist = async (productId: number): Promise<WishlistItem> => {
  const { data } = await apiClient.post<WishlistItem>('/wishlists', {
    productId,
    createdAt: new Date().toISOString(),
  })
  return data
}

export const removeWishlist = async (id: number): Promise<void> => {
  await apiClient.delete(`/wishlists/${id}`)
}
