import type { Metadata } from "next"
import { CardsGrid } from "~/components/cards-grid"
import { absoluteUrl, jsonLd } from "~/lib/seo"
import { getProductsPage } from "~/lib/shopify"

export const metadata: Metadata = {
  title: "Cards",
  description: "Browse the current collection of graded cards available at Two O'Clock.",
  alternates: { canonical: "/cards" },
  openGraph: { title: "Cards", url: "/cards" },
}

export default async function CardsPage() {
  const { nodes, pageInfo } = await getProductsPage()
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cards available at Two O'Clock Trading",
    itemListElement: nodes.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/products/${product.handle}`),
      name: product.title,
      image: product.featuredImage?.url,
    })),
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(itemList) }} />
      <h1 className="mb-6 font-display text-5xl tracking-tight">Cards</h1>
      <CardsGrid
        initialProducts={nodes}
        initialEndCursor={pageInfo.endCursor}
        initialHasNextPage={pageInfo.hasNextPage}
      />
    </main>
  )
}
