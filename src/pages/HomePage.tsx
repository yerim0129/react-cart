import { useState } from 'react'
import type { ProductCategory, SortOption } from '@/types/product'
import { useProducts } from '@/hooks/useProducts'
import { useDebounce } from '@/hooks/useDebounce'
import ProductGrid, { ProductGridSkeleton } from '@/components/features/product/ProductGrid'
import ProductFilter from '@/components/features/product/ProductFilter'
import ProductSearch from '@/components/features/product/ProductSearch'
import ErrorMessage from '@/components/common/ErrorMessage'
import styles from './HomePage.module.css'

const HomePage = () => {
  const [category, setCategory] = useState<ProductCategory>('all')
  const [sort, setSort] = useState<SortOption>('latest')
  const [searchInput, setSearchInput] = useState('')
  const search = useDebounce(searchInput, 300)

  const { data: products, isLoading, isError } = useProducts({ category, sort, search })

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
      {products && <ProductGrid products={products} />}
    </div>
  )
}

export default HomePage
