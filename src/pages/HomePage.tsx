import { useState, useCallback } from 'react'
import type { ProductCategory, SortOption } from '@/types/product'
import { useInfiniteProducts } from '@/hooks/useInfiniteProducts'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useDebounce } from '@/hooks/useDebounce'
import ProductGrid, { ProductGridSkeleton } from '@/components/features/product/ProductGrid'
import ProductFilter from '@/components/features/product/ProductFilter'
import ProductSearch from '@/components/features/product/ProductSearch'
import Spinner from '@/components/common/Spinner'
import ErrorMessage from '@/components/common/ErrorMessage'
import styles from './HomePage.module.css'

const HomePage = () => {
  const [category, setCategory] = useState<ProductCategory>('all')
  const [sort, setSort] = useState<SortOption>('latest')
  const [searchInput, setSearchInput] = useState('')
  const search = useDebounce(searchInput, 300)

  const {
    products,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProducts({ category, sort, search })

  const loadMoreRef = useIntersectionObserver(
    useCallback(() => {
      if (hasNextPage && !isFetchingNextPage) fetchNextPage()
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])
  )

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>상품 목록</h1>
      <div className={styles.searchWrapper}>
        <ProductSearch value={searchInput} onChange={setSearchInput} />
      </div>
      <div className={styles.filterWrapper}>
        <ProductFilter
          category={category}
          sort={sort}
          onCategoryChange={setCategory}
          onSortChange={setSort}
        />
      </div>

      {isLoading && <ProductGridSkeleton />}
      {isError && <ErrorMessage message="상품을 불러올 수 없습니다. 서버 상태를 확인해주세요." />}
      {!isLoading && <ProductGrid products={products} />}

      {/* 무한스크롤 감지 영역 */}
      <div ref={loadMoreRef} className={styles.loadMoreTrigger} aria-hidden="true" />
      {isFetchingNextPage && (
        <div className={styles.loadingMore}>
          <Spinner size="sm" />
        </div>
      )}
    </div>
  )
}

export default HomePage
