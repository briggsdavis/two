import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { AddToCartButton } from "~/components/add-to-cart-button"
import { ProductGallery } from "~/components/product-gallery"
import { formatMoney } from "~/lib/money"
import { absoluteUrl, jsonLd, productSeoDescription, siteName } from "~/lib/seo"
import { getProduct } from "~/lib/shopify"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  const product = await getProduct(handle)
  if (!product) return { title: "Not found", robots: { index: false, follow: false } }

  const description = productSeoDescription({
    product,
    descriptionHtml: product.descriptionHtml,
    price: product.variants.nodes[0]?.price ?? product.priceRange.minVariantPrice,
  })
  const image = product.featuredImage?.url
  const url = `/products/${product.handle}`

  return {
    title: product.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: product.title,
      description,
      url,
      images: image
        ? [{ url: image, alt: product.featuredImage?.altText ?? product.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description,
      images: image ? [image] : undefined,
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  const product = await getProduct(handle)
  if (!product) notFound()
  const variant = product.variants.nodes[0]
  const price = variant?.price ?? product.priceRange.minVariantPrice
  const description = productSeoDescription({
    product,
    descriptionHtml: product.descriptionHtml,
    price,
  })
  const productUrl = absoluteUrl(`/products/${product.handle}`)
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images.nodes.map((image) => image.url),
    description,
    url: productUrl,
    offers: {
      "@type": "Offer",
      url: productUrl,
      price: price.amount,
      priceCurrency: price.currencyCode,
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: siteName,
      },
    },
    additionalProperty: [
      product.gradingCompany && {
        "@type": "PropertyValue",
        name: "Grading company",
        value: product.gradingCompany.value,
      },
      product.grade && {
        "@type": "PropertyValue",
        name: "Grade",
        value: product.grade.value,
      },
    ].filter(Boolean),
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(productJsonLd) }}
      />
      <Link
        href="/cards"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-ink/70 hover:text-ink"
      >
        <ArrowLeft className="size-4" />
        Back to cards
      </Link>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ProductGallery images={product.images.nodes} title={product.title} />

        <div>
          <h1 className="font-display text-4xl tracking-tight">{product.title}</h1>

          {(product.gradingCompany || product.grade) && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-ink/20 px-3 py-1 text-xs font-semibold tracking-wider uppercase">
              {product.gradingCompany && <span>{product.gradingCompany.value}</span>}
              {product.gradingCompany && product.grade && <span className="text-ink/30">/</span>}
              {product.grade && <span>Grade {product.grade.value}</span>}
            </div>
          )}

          {(() => {
            return (
              <>
                <p className="mt-4 text-2xl font-medium">{formatMoney(price)}</p>
                {variant && !variant.availableForSale ? (
                  <p className="mt-2 text-sm text-red-700">Sold out</p>
                ) : variant?.quantityAvailable != null ? (
                  <p className="mt-2 text-sm text-ink/60">{variant.quantityAvailable} in stock</p>
                ) : null}
              </>
            )
          })()}

          <div
            className="prose mt-6"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />

          {product.variants.nodes[0] && (
            <AddToCartButton
              variantId={product.variants.nodes[0].id}
              available={product.variants.nodes[0].availableForSale}
            />
          )}
        </div>
      </div>
    </main>
  )
}
