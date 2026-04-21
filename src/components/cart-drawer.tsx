"use client"

import { Minus, Plus, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { useCart } from "~/components/cart-provider"
import { formatMoney } from "~/lib/money"

export function CartDrawer() {
  const { cart, isOpen, close, update, remove, isPending } = useCart()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [isOpen, close])

  const lines = cart?.lines.nodes ?? []
  const empty = lines.length === 0

  return (
    <>
      <button
        type="button"
        aria-label="Close cart"
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
        onClick={close}
        className={`fixed inset-0 z-40 cursor-default bg-ink/60 backdrop-blur-sm transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-ink/15 px-6 py-4">
          <h2 className="font-display text-2xl tracking-tight">Your cart</h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="rounded-full p-1 hover:bg-ink/10"
          >
            <X className="size-5" />
          </button>
        </header>

        {empty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
            <p className="text-ink/60">Your cart is empty.</p>
            <Link
              href="/cards"
              onClick={close}
              className="rounded-full bg-ink px-5 py-2 text-sm text-cream hover:bg-ink/90"
            >
              Browse cards
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4 p-6">
                  <div className="relative h-20 w-20 shrink-0 rounded-md bg-ink/5">
                    {line.merchandise.product.featuredImage && (
                      <Image
                        src={line.merchandise.product.featuredImage.url}
                        alt={
                          line.merchandise.product.featuredImage.altText ??
                          line.merchandise.product.title
                        }
                        fill
                        sizes="80px"
                        className="object-contain p-1"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${line.merchandise.product.handle}`}
                        onClick={close}
                        className="font-medium hover:underline"
                      >
                        {line.merchandise.product.title}
                      </Link>
                      <span className="text-sm">
                        {formatMoney(line.cost.totalAmount)}
                      </span>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-ink/20">
                        <button
                          type="button"
                          onClick={() =>
                            update(line.id, Math.max(0, line.quantity - 1))
                          }
                          disabled={isPending}
                          aria-label="Decrease quantity"
                          className="p-1.5 hover:bg-ink/5 disabled:opacity-40"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => update(line.id, line.quantity + 1)}
                          disabled={isPending}
                          aria-label="Increase quantity"
                          className="p-1.5 hover:bg-ink/5 disabled:opacity-40"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(line.id)}
                        disabled={isPending}
                        className="text-xs text-ink/60 underline hover:text-ink disabled:opacity-40"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <footer className="border-t border-ink/15 p-6">
              <div className="mb-4 flex items-baseline justify-between">
                <span className="text-sm tracking-wider text-ink/60 uppercase">
                  Subtotal
                </span>
                <span className="text-lg font-medium">
                  {cart && formatMoney(cart.cost.subtotalAmount)}
                </span>
              </div>
              <p className="mb-4 text-xs text-ink/60">
                Shipping and taxes calculated at checkout.
              </p>
              <a
                href={cart?.checkoutUrl ?? "#"}
                className="block w-full rounded-full bg-ink py-3 text-center text-sm font-medium text-cream hover:bg-ink/90"
              >
                Checkout
              </a>
            </footer>
          </>
        )}
      </aside>
    </>
  )
}
