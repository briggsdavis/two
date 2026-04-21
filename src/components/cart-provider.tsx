"use client"

import { createContext, useCallback, useContext, useState } from "react"
import { addToCart, removeLine, updateLine } from "~/lib/cart"
import type { Cart } from "~/lib/shopify"

type CartContextValue = {
  cart: Cart | null
  isOpen: boolean
  open: () => void
  close: () => void
  add: (variantId: string) => Promise<void>
  update: (lineId: string, quantity: number) => Promise<void>
  remove: (lineId: string) => Promise<void>
  isPending: boolean
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({
  initialCart,
  children,
}: {
  initialCart: Cart | null
  children: React.ReactNode
}) {
  const [cart, setCart] = useState<Cart | null>(initialCart)
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const wrap = useCallback(
    async (fn: () => Promise<Cart | null>, opens = false) => {
      setIsPending(true)
      try {
        const next = await fn()
        setCart(next)
        if (opens) setIsOpen(true)
      } finally {
        setIsPending(false)
      }
    },
    [],
  )

  const value: CartContextValue = {
    cart,
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    add: (variantId) => wrap(() => addToCart(variantId), true),
    update: (lineId, quantity) => wrap(() => updateLine(lineId, quantity)),
    remove: (lineId) => wrap(() => removeLine(lineId)),
    isPending,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}
