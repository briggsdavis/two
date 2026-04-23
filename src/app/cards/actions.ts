"use server"

import { getProductsPage, type ProductFilters } from "~/lib/shopify"

export async function fetchProductsPage(
  filters: ProductFilters,
  after?: string,
) {
  return getProductsPage({ first: 24, after, ...filters })
}
