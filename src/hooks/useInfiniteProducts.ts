import { useInfiniteQuery } from '@tanstack/react-query'
import { getProductsPage } from '@/api/products'
import type { ProductCategory, SortOption, Product } from '@/types/product'

const LIMIT = 8

interface UseInfiniteProductsOptions {
  category?: ProductCategory
  sort?: SortOption
  search?: string
}

const applyFilters = (products: Product[], options: UseInfiniteProductsOptions): Product[] => {
  let result = [...products]

  if (options.category && options.category !== 'all') {
    result = result.filter((p) => p.category === options.category)
  }

  if (options.search) {
    result = result.filter((p) =>
      p.name.toLowerCase().includes(options.search!.toLowerCase())
    )
  }

  if (options.sort === 'price_asc') {
    result.sort((a, b) => a.price - b.price)
  } else if (options.sort === 'price_desc') {
    result.sort((a, b) => b.price - a.price)
  }

  return result
}

export const useInfiniteProducts = (options: UseInfiniteProductsOptions = {}) => {
  const query = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    queryFn: ({ pageParam }) => getProductsPage(pageParam as number, LIMIT),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === LIMIT ? allPages.length + 1 : undefined,
    staleTime: 1000 * 60 * 5,
  })

  const allProducts = query.data?.pages.flat() ?? []
  const products = applyFilters(allProducts, options)

  return { ...query, products }
}
