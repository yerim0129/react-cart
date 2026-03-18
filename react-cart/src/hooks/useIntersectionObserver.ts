import { useEffect, useRef, useCallback } from 'react'

export const useIntersectionObserver = (
  onIntersect: () => void,
  options?: IntersectionObserverInit,
) => {
  const ref = useRef<HTMLDivElement>(null)

  const stableCallback = useCallback(onIntersect, [onIntersect])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) stableCallback()
    }, { threshold: 0.1, ...options })

    observer.observe(el)
    return () => observer.disconnect()
  }, [stableCallback, options])

  return ref
}
