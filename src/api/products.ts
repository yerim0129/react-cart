import apiClient from './client'
import type { Product } from '@/types/product'

// 목록 조회 (전체)
export const getProducts = async (): Promise<Product[]> => {
  const { data } = await apiClient.get<Product[]>('/products')
  return data
}

// 목록 조회 (페이지네이션)
export const getProductsPage = async (page: number, limit = 8): Promise<Product[]> => {
  const { data } = await apiClient.get<Product[]>('/products', {
    params: { _page: page, _limit: limit },
  })
  return data
}

// 단건 조회
export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await apiClient.get<Product>(`/products/${id}`)
  return data
}
