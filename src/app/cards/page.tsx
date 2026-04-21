import type { Metadata } from "next"
import { CardsGrid } from "~/components/cards-grid"
import { getProducts } from "~/lib/shopify"

export const metadata: Metadata = {
  title: "Cards",
  description:
    "Browse the current collection of graded cards available at Two O'Clock.",
  alternates: { canonical: "/cards" },
  openGraph: { title: "Cards", url: "/cards" },
}

export default async function CardsPage() {
  const products = await getProducts()

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-6 font-display text-5xl tracking-tight">Cards</h1>
      <CardsGrid products={products} />
    </main>
  )
}
