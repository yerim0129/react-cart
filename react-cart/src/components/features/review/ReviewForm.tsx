import { useState } from 'react'
import clsx from 'clsx'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import type { CreateReviewPayload } from '@/types/review'
import styles from './ReviewForm.module.css'

interface ReviewFormProps {
  productId: number
  onSubmit: (payload: CreateReviewPayload) => void
  isLoading: boolean
}

const ReviewForm = ({ productId, onSubmit, isLoading }: ReviewFormProps) => {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) { setError('별점을 선택해주세요.'); return }
    if (author.trim().length < 2) { setError('작성자 이름을 2자 이상 입력해주세요.'); return }
    if (content.trim().length < 5) { setError('리뷰 내용을 5자 이상 입력해주세요.'); return }
    setError('')
    onSubmit({ productId, rating, content: content.trim(), author: author.trim() })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.ratingWrapper}>
        <span className={styles.ratingLabel}>별점</span>
        <div className={styles.stars}>
          {Array.from({ length: 5 }).map((_, i) => {
            const value = i + 1
            return (
              <button
                key={value}
                type="button"
                className={clsx(
                  styles.star,
                  value <= (hovered || rating) && styles.starActive
                )}
                onClick={() => setRating(value)}
                onMouseEnter={() => setHovered(value)}
                onMouseLeave={() => setHovered(0)}
                aria-label={`${value}점`}
              >
                ★
              </button>
            )
          })}
        </div>
      </div>

      <Input
        label="작성자"
        placeholder="홍길동"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <div className={styles.textareaWrapper}>
        <label className={styles.textareaLabel}>리뷰 내용</label>
        <textarea
          className={styles.textarea}
          placeholder="상품 사용 후기를 작성해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />
      </div>

      {error && <p className={styles.errorText}>{error}</p>}

      <Button label={isLoading ? '제출 중...' : '리뷰 등록'} type="submit" fullWidth disabled={isLoading} />
    </form>
  )
}

export default ReviewForm
