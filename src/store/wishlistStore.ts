import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistState {
  productIds: number[]
  addToWishlist: (productId: number) => void
  removeFromWishlist: (productId: number) => void
  isWishlisted: (productId: number) => boolean
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],

      addToWishlist: (productId) => {
        set((state) => ({
          productIds: [...state.productIds, productId],
        }))
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          productIds: state.productIds.filter((id) => id !== productId),
        }))
      },

      isWishlisted: (productId) => get().productIds.includes(productId),
    }),
    { name: 'wishlist-storage' }
  )
)
