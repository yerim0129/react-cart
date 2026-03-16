import apiClient from './client'
import type { Order, CreateOrderPayload } from '@/types/order'

export const createOrder = async (payload: CreateOrderPayload): Promise<Order> => {
  const { data } = await apiClient.post<Order>('/orders', payload)
  return data
}
