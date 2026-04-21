"use client"

import { useCart } from "~/components/cart-provider"

export function AddToCartButton({
  variantId,
  available,
}: {
  variantId: string
  available: boolean
}) {
  const { add, isPending } = useCart()

  if (!available) {
    return (
      <button
        type="button"
        disabled
        className="mt-6 w-full rounded-full border border-ink/20 py-3 text-sm font-medium text-ink/50"
      >
        Sold out
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => add(variantId)}
      disabled={isPending}
      className="mt-6 w-full rounded-full bg-ink py-3 text-sm font-medium text-cream transition hover:bg-ink/90 disabled:opacity-60"
    >
      {isPending ? "Adding…" : "Add to cart"}
    </button>
  )
}
