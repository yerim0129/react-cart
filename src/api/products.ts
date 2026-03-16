import apiClient from './client'
import type { Product } from '@/types/product'

// 목록 조회
export const getProducts = async (): Promise<Product[]> => {
  const { data } = await apiClient.get<Product[]>('/products')
  return data
}

// 단건 조회
export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await apiClient.get<Product>(`/products/${id}`)
  return data
}
