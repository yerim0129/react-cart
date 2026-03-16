import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types/order'
import type { Product } from '@/types/product'

interface CartState {
  itemsByUser: Record<number, CartItem[]>
  getItems: (userId: number) => CartItem[]
  addItem: (userId: number, product: Product, quantity?: number) => void
  removeItem: (userId: number, productId: number) => void
  updateQuantity: (userId: number, productId: number, quantity: number) => void
  clearCart: (userId?: number) => void
  getTotalPrice: (userId: number) => number
  getTotalCount: (userId: number) => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      itemsByUser: {},

      getItems: (userId) => get().itemsByUser[userId] ?? [],

      addItem: (userId, product, quantity = 1) => {
        set((state) => {
          const items = state.itemsByUser[userId] ?? []
          const existing = items.find((item) => item.productId === product.id)
          const updated = existing
            ? items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            : [...items, { productId: product.id, product, quantity }]
          return { itemsByUser: { ...state.itemsByUser, [userId]: updated } }
        })
      },

      removeItem: (userId, productId) => {
        set((state) => {
          const items = state.itemsByUser[userId] ?? []
          return {
            itemsByUser: {
              ...state.itemsByUser,
              [userId]: items.filter((item) => item.productId !== productId),
            },
          }
        })
      },

      updateQuantity: (userId, productId, quantity) => {
        if (quantity < 1) return
        set((state) => {
          const items = state.itemsByUser[userId] ?? []
          return {
            itemsByUser: {
              ...state.itemsByUser,
              [userId]: items.map((item) =>
                item.productId === productId ? { ...item, quantity } : item
              ),
            },
          }
        })
      },

      clearCart: (userId) => {
        if (userId === undefined) {
          set({ itemsByUser: {} })
        } else {
          set((state) => ({
            itemsByUser: { ...state.itemsByUser, [userId]: [] },
          }))
        }
      },

      getTotalPrice: (userId) =>
        (get().itemsByUser[userId] ?? []).reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),

      getTotalCount: (userId) =>
        (get().itemsByUser[userId] ?? []).reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: 'cart-storage',
      version: 1,
      migrate: (persistedState) => {
        const state = persistedState as CartState
        const cleaned: Record<number, CartItem[]> = {}
        for (const [userId, items] of Object.entries(state.itemsByUser ?? {})) {
          cleaned[Number(userId)] = items.filter(
            (item) => item.product != null && Number.isFinite(item.product.price)
          )
        }
        return { ...state, itemsByUser: cleaned }
      },
    }
  )
)
