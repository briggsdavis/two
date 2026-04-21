"use client"

import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { CartButton } from "~/components/cart-button"

const links = [
  { href: "/cards", label: "Cards" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header className="border-b border-ink/15">
      <nav className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-4 md:grid-cols-[1fr_auto_1fr]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="rounded-full p-1 hover:bg-ink/10 md:hidden"
        >
          <Menu className="size-5" />
        </button>

        <Link
          href="/"
          className="font-display text-xl tracking-tight italic md:justify-self-start"
        >
          Two O&apos;Clock Trading
        </Link>

        <ul className="hidden items-center gap-8 justify-self-center text-sm md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>

        <div className="justify-self-end">
          <CartButton />
        </div>
      </nav>

      <button
        type="button"
        aria-label="Close menu"
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
        onClick={close}
        className={`fixed inset-0 z-40 cursor-default bg-ink/60 backdrop-blur-sm transition-opacity duration-200 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed top-0 left-0 z-50 flex h-full w-full max-w-xs flex-col bg-cream shadow-xl transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink/15 px-6 py-4">
          <span className="font-display text-xl tracking-tight italic">
            Menu
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="rounded-full p-1 hover:bg-ink/10"
          >
            <X className="size-5" />
          </button>
        </div>
        <ul className="flex flex-col items-start px-6 py-6">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={close}
                className="inline-block py-3 font-display text-3xl tracking-tight"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </header>
  )
}
