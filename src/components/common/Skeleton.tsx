import styles from './Skeleton.module.css'

interface SkeletonProps {
  width?: string
  height?: string
  borderRadius?: string
}

const Skeleton = ({ width = '100%', height = '16px', borderRadius = '4px' }: SkeletonProps) => {
  return (
    <div
      className={styles.skeleton}
      style={
        {
          '--skeleton-width': width,
          '--skeleton-height': height,
          '--skeleton-radius': borderRadius,
        } as React.CSSProperties
      }
    />
  )
}

export default Skeleton
