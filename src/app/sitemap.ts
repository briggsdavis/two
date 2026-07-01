import type { MetadataRoute } from "next"
import { absoluteUrl } from "~/lib/seo"
import { getAllProducts } from "~/lib/shopify"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const products = await getAllProducts()

  return [
    {
      url: absoluteUrl("/cards"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...products.map((product) => ({
      url: absoluteUrl(`/products/${product.handle}`),
      lastModified: product.updatedAt ? new Date(product.updatedAt) : now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: product.featuredImage ? [product.featuredImage.url] : undefined,
    })),
  ]
}
