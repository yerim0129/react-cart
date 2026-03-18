import clsx from 'clsx'
import type { ProductCategory, SortOption } from '@/types/product'
import styles from './ProductFilter.module.css'

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'clothing', label: '의류' },
  { value: 'electronics', label: '전자기기' },
  { value: 'food', label: '식품' },
]

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'latest', label: '최신순' },
  { value: 'price_asc', label: '가격 낮은순' },
  { value: 'price_desc', label: '가격 높은순' },
]

interface ProductFilterProps {
  category: ProductCategory
  sort: SortOption
  onCategoryChange: (category: ProductCategory) => void
  onSortChange: (sort: SortOption) => void
}

const ProductFilter = ({
  category,
  sort,
  onCategoryChange,
  onSortChange,
}: ProductFilterProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.categories}>
        {CATEGORIES.map((item) => (
          <button
            key={item.value}
            type="button"
            className={clsx(styles.categoryBtn, category === item.value && styles.active)}
            onClick={() => onCategoryChange(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <select
        className={styles.sortSelect}
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ProductFilter
