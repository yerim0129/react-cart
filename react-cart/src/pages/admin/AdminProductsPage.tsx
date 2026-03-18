import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAdminProducts } from '@/hooks/useAdminProducts'
import type { ProductFormPayload } from '@/api/adminProducts'
import type { Product, ProductCategory } from '@/types/product'
import { formatPrice } from '@/utils/formatPrice'
import Modal from '@/components/common/Modal'
import Button from '@/components/common/Button'
import Spinner from '@/components/common/Spinner'
import ErrorMessage from '@/components/common/ErrorMessage'
import styles from './AdminProductsPage.module.css'

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'clothing', label: '의류' },
  { value: 'electronics', label: '전자기기' },
  { value: 'food', label: '식품' },
]

const productSchema = z.object({
  name: z.string().min(1, '상품명을 입력해주세요.'),
  price: z.coerce.number().min(1, '가격을 입력해주세요.'),
  category: z.enum(['clothing', 'electronics', 'food']),
  imageUrl: z.string().url('올바른 이미지 URL을 입력해주세요.'),
  stock: z.coerce.number().min(0, '재고는 0 이상이어야 합니다.'),
  description: z.string().min(1, '상품 설명을 입력해주세요.'),
  rating: z.coerce.number().min(0).max(5),
  reviewCount: z.coerce.number().min(0),
  createdAt: z.string(),
})

type ProductFormValues = z.infer<typeof productSchema>

const defaultValues: ProductFormValues = {
  name: '',
  price: 0,
  category: 'clothing',
  imageUrl: '',
  stock: 0,
  description: '',
  rating: 0,
  reviewCount: 0,
  createdAt: new Date().toISOString().split('T')[0],
}

const AdminProductsPage = () => {
  const { productsQuery, createMutation, updateMutation, deleteMutation } = useAdminProducts()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  })

  const openAddModal = () => {
    setEditingProduct(null)
    reset(defaultValues)
    setModalOpen(true)
  }

  const openEditModal = (product: Product) => {
    setEditingProduct(product)
    reset({
      name: product.name,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
      stock: product.stock,
      description: product.description,
      rating: product.rating,
      reviewCount: product.reviewCount,
      createdAt: product.createdAt,
    })
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
    setEditingProduct(null)
  }

  const onSubmit = (values: ProductFormValues) => {
    const payload: ProductFormPayload = values
    if (editingProduct) {
      updateMutation.mutate(
        { id: editingProduct.id, payload },
        { onSuccess: handleClose }
      )
    } else {
      createMutation.mutate(payload, { onSuccess: handleClose })
    }
  }

  const handleDelete = (product: Product) => {
    if (!window.confirm(`"${product.name}"을(를) 삭제하시겠습니까?`)) return
    deleteMutation.mutate(product.id)
  }

  const isMutating =
    createMutation.isPending || updateMutation.isPending || deleteMutation.isPending

  if (productsQuery.isLoading) return <Spinner />
  if (productsQuery.isError) return <ErrorMessage message="상품 목록을 불러올 수 없습니다." />

  const products = productsQuery.data ?? []

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>상품 관리</h1>
        <Button label="+ 상품 추가" onClick={openAddModal} />
      </div>

      {(createMutation.isError || updateMutation.isError || deleteMutation.isError) && (
        <ErrorMessage message="작업 중 오류가 발생했습니다. 다시 시도해주세요." />
      )}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>이미지</th>
              <th>상품명</th>
              <th>카테고리</th>
              <th>가격</th>
              <th>재고</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className={styles.idCell}>{product.id}</td>
                <td>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className={styles.thumbnail}
                  />
                </td>
                <td className={styles.nameCell}>{product.name}</td>
                <td>
                  <span className={styles.categoryBadge}>
                    {CATEGORIES.find((c) => c.value === product.category)?.label ?? product.category}
                  </span>
                </td>
                <td className={styles.priceCell}>{formatPrice(product.price)}</td>
                <td className={product.stock === 0 ? styles.outOfStock : undefined}>
                  {product.stock}
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.editBtn}
                      onClick={() => openEditModal(product)}
                      disabled={isMutating}
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(product)}
                      disabled={isMutating}
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalOpen}
        title={editingProduct ? '상품 수정' : '상품 추가'}
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formRow}>
            <label className={styles.label}>상품명</label>
            <input className={styles.input} {...register('name')} />
            {errors.name && <p className={styles.error}>{errors.name.message}</p>}
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>카테고리</label>
            <select className={styles.input} {...register('category')}>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formRow}>
              <label className={styles.label}>가격 (원)</label>
              <input type="number" className={styles.input} {...register('price')} />
              {errors.price && <p className={styles.error}>{errors.price.message}</p>}
            </div>
            <div className={styles.formRow}>
              <label className={styles.label}>재고</label>
              <input type="number" className={styles.input} {...register('stock')} />
              {errors.stock && <p className={styles.error}>{errors.stock.message}</p>}
            </div>
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>이미지 URL</label>
            <input className={styles.input} {...register('imageUrl')} />
            {errors.imageUrl && <p className={styles.error}>{errors.imageUrl.message}</p>}
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>상품 설명</label>
            <textarea className={styles.textarea} rows={3} {...register('description')} />
            {errors.description && <p className={styles.error}>{errors.description.message}</p>}
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formRow}>
              <label className={styles.label}>평점 (0–5)</label>
              <input type="number" step="0.1" className={styles.input} {...register('rating')} />
            </div>
            <div className={styles.formRow}>
              <label className={styles.label}>리뷰 수</label>
              <input type="number" className={styles.input} {...register('reviewCount')} />
            </div>
          </div>

          <div className={styles.formActions}>
            <Button label="취소" variant="secondary" onClick={handleClose} />
            <Button
              label={editingProduct ? '수정 완료' : '추가'}
              type="submit"
              disabled={isMutating}
            />
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AdminProductsPage
