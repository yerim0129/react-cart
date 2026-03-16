import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useWishlistStore } from '@/store/wishlistStore'
import { addWishlist, removeWishlist, getWishlists } from '@/api/wishlist'

export const useWishlistItems = () => {
  return useQuery({
    queryKey: ['wishlists'],
    queryFn: getWishlists,
  })
}

export const useWishlistToggle = (productId: number) => {
  const queryClient = useQueryClient()
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlistStore()
  const wishlisted = isWishlisted(productId)

  const { data: wishlists } = useWishlistItems()

  const addMutation = useMutation({
    mutationFn: () => addWishlist(productId),
    onMutate: () => addToWishlist(productId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlists'] }),
    onError: () => removeFromWishlist(productId),
  })

  const removeMutation = useMutation({
    mutationFn: () => {
      const item = wishlists?.find((w) => w.productId === productId)
      if (!item) return Promise.resolve()
      return removeWishlist(item.id)
    },
    onMutate: () => removeFromWishlist(productId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlists'] }),
    onError: () => addToWishlist(productId),
  })

  const toggle = () => {
    if (wishlisted) {
      removeMutation.mutate()
    } else {
      addMutation.mutate()
    }
  }

  return {
    isWishlisted: wishlisted,
    toggle,
    isLoading: addMutation.isPending || removeMutation.isPending,
  }
}
