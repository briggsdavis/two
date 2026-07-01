import type { ProductListItem } from "~/lib/shopify"
import { formatMoney } from "~/lib/money"

export const siteUrl = "https://twooclocktrading.com"
export const siteName = "Two O'Clock Trading"
export const siteDescription =
  "A small, deliberate collection of graded trading cards, sourced one at a time and listed only when they're worth our shelf space."

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString()
}

export function stripHtml(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function productSeoDescription({
  product,
  descriptionHtml = "",
  price,
}: {
  product: ProductListItem
  descriptionHtml?: string
  price?: ProductListItem["priceRange"]["minVariantPrice"]
}) {
  const explicit = stripHtml(descriptionHtml)
  if (explicit) return explicit.slice(0, 200)

  const grade = [
    product.gradingCompany?.value,
    product.grade?.value && `grade ${product.grade.value}`,
  ]
    .filter(Boolean)
    .join(" ")
  const priceText = price ? ` Listed at ${formatMoney(price)}.` : ""
  const availability = product.availableForSale ? "available" : "sold"

  return `${product.title}${grade ? `, ${grade}` : ""}, ${availability} from ${siteName}.${priceText}`
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c")
}
