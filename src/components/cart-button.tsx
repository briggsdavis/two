"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "~/components/cart-provider"

export function CartButton() {
  const { cart, open } = useCart()
  const count = cart?.totalQuantity ?? 0

  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Open cart (${count} items)`}
      className="relative p-1"
    >
      <ShoppingBag className="size-5" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-semibold text-cream">
          {count}
        </span>
      )}
    </button>
  )
}
