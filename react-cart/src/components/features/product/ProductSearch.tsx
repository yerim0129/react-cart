import styles from './ProductSearch.module.css'

interface ProductSearchProps {
  value: string
  onChange: (value: string) => void
}

const ProductSearch = ({ value, onChange }: ProductSearchProps) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>🔍</span>
      <input
        type="text"
        className={styles.input}
        placeholder="상품 검색..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          className={styles.clearBtn}
          onClick={() => onChange('')}
          aria-label="검색어 지우기"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default ProductSearch
