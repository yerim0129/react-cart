export interface Product {
  id: number
  name: string
  price: number
  category: ProductCategory
  imageUrl: string
  stock: number
  description: string
  rating: number       // 고도화 대비 — 1차에서는 표시만
  reviewCount: number  // 고도화 대비 — 1차에서는 표시만
  createdAt: string
}

export type ProductCategory = 'all' | 'clothing' | 'electronics' | 'food'
export type SortOption = 'latest' | 'price_asc' | 'price_desc'
