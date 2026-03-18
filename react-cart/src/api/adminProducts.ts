import apiClient from './client'
import type { Product } from '@/types/product'

export type ProductFormPayload = Omit<Product, 'id'>

export const createProduct = async (payload: ProductFormPayload): Promise<Product> => {
  const { data } = await apiClient.post<Product>('/products', payload)
  return data
}

export const updateProduct = async (id: number, payload: ProductFormPayload): Promise<Product> => {
  const { data } = await apiClient.put<Product>(`/products/${id}`, payload)
  return data
}

export const deleteProduct = async (id: number): Promise<void> => {
  await apiClient.delete(`/products/${id}`)
}
