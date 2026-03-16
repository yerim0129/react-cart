import type { Review } from '@/types/review'
import { formatDate } from '@/utils/formatDate'
import styles from './ReviewList.module.css'

interface ReviewListProps {
  reviews: Review[]
}

const StarRating = ({ rating }: { rating: number }) => (
  <span className={styles.stars} aria-label={`${rating}점`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>
        ★
      </span>
    ))}
  </span>
)

const ReviewList = ({ reviews }: ReviewListProps) => {
  if (reviews.length === 0) {
    return (
      <div className={styles.empty}>
        <p>아직 작성된 리뷰가 없습니다. 첫 번째 리뷰를 작성해보세요!</p>
      </div>
    )
  }

  return (
    <ul className={styles.list}>
      {reviews.map((review) => (
        <li key={review.id} className={styles.item}>
          <div className={styles.itemHeader}>
            <div className={styles.authorInfo}>
              <span className={styles.author}>{review.author}</span>
              <StarRating rating={review.rating} />
            </div>
            <span className={styles.date}>{formatDate(review.createdAt)}</span>
          </div>
          <p className={styles.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  )
}

export default ReviewList
