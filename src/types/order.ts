import type { Product } from './product'

export interface CartItem {
  productId: number
  product: Product
  quantity: number
}

export interface ShippingInfo {
  name: string
  phone: string
  address: string
  detailAddress: string
  memo?: string
}

export interface CreateOrderPayload {
  userId: number
  items: CartItem[]
  shippingInfo: ShippingInfo
  totalPrice: number
  createdAt: string
}

export interface Order extends CreateOrderPayload {
  id: number
}
