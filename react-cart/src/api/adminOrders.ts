import apiClient from './client'
import type { Order } from '@/types/order'

export const getAllOrders = async (): Promise<Order[]> => {
  const { data } = await apiClient.get<Order[]>('/orders')
  return data
}
