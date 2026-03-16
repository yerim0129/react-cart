export const formatPrice = (price: number): string => {
  if (!Number.isFinite(price)) return '₩0'
  return `₩${price.toLocaleString('ko-KR')}`
}
