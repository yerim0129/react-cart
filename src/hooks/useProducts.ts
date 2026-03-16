import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/api/products'
import type { ProductCategory, SortOption } from '@/types/product'

interface UseProductsOptions {
  category?: ProductCategory
  sort?: SortOption
  search?: string
}

export const useProducts = (options: UseProductsOptions = {}) => {
  return useQuery({
    queryKey: ['products', options],
    queryFn: getProducts,
    select: (data) => {
      let result = [...data]

      // 카테고리 필터
      if (options.category && options.category !== 'all') {
        result = result.filter((p) => p.category === options.category)
      }

      // 검색 필터
      if (options.search) {
        result = result.filter((p) =>
          p.name.toLowerCase().includes(options.search!.toLowerCase())
        )
      }

      // 정렬
      if (options.sort === 'price_asc') {
        result.sort((a, b) => a.price - b.price)
      } else if (options.sort === 'price_desc') {
        result.sort((a, b) => b.price - a.price)
      }

      return result
    },
    staleTime: 1000 * 60 * 5, // 5분
  })
}
