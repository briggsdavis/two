import type { Metadata } from "next"
import { CardsGrid } from "~/components/cards-grid"
import { getProductsPage } from "~/lib/shopify"

export const metadata: Metadata = {
  title: "Cards",
  description:
    "Browse the current collection of graded cards available at Two O'Clock.",
  alternates: { canonical: "/cards" },
  openGraph: { title: "Cards", url: "/cards" },
}

export default async function CardsPage() {
  const { nodes, pageInfo } = await getProductsPage()

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-6 font-display text-5xl tracking-tight">Cards</h1>
      <CardsGrid
        initialProducts={nodes}
        initialEndCursor={pageInfo.endCursor}
        initialHasNextPage={pageInfo.hasNextPage}
      />
    </main>
  )
}
