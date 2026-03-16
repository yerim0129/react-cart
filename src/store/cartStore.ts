import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types/order'
import type { Product } from '@/types/product'

interface CartState {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((item) => item.productId === product.id)
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }
          return {
            items: [...state.items, { productId: product.id, product, quantity }],
          }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }))
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () =>
        get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),

      getTotalCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: 'cart-storage' }
  )
)
