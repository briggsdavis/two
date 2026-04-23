import "server-only"
import { createStorefrontApiClient } from "@shopify/storefront-api-client"
import type { Money } from "~/lib/money"

const domain = process.env.SHOPIFY_STORE_DOMAIN
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

if (!domain || !token) {
  throw new Error(
    "Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN",
  )
}

const shopify = createStorefrontApiClient({
  storeDomain: domain,
  apiVersion: "2026-04",
  publicAccessToken: token,
})

export type ProductListItem = {
  id: string
  handle: string
  title: string
  featuredImage: { url: string; altText: string | null } | null
  priceRange: { minVariantPrice: Money }
  availableForSale: boolean
  grade: { value: string } | null
  gradingCompany: { value: string } | null
}

type ProductDetail = ProductListItem & {
  descriptionHtml: string
  images: { nodes: { url: string; altText: string | null }[] }
  variants: {
    nodes: {
      id: string
      title: string
      availableForSale: boolean
      quantityAvailable: number | null
      price: Money
    }[]
  }
  grade: { value: string } | null
  gradingCompany: { value: string } | null
}

const PRODUCT_FIELDS = `#graphql
  fragment ProductFields on Product {
    id
    handle
    title
    availableForSale
    featuredImage { url altText }
    priceRange { minVariantPrice { amount currencyCode } }
    grade: metafield(namespace: "custom", key: "grade") { value }
    gradingCompany: metafield(namespace: "custom", key: "grading_company") { value }
  }
`

const PRODUCT_SEARCH_QUERY = `#graphql
  ${PRODUCT_FIELDS}
  query Search(
    $first: Int!
    $after: String
    $query: String!
    $productFilters: [ProductFilter!]
  ) {
    search(
      first: $first
      after: $after
      query: $query
      types: [PRODUCT]
      productFilters: $productFilters
    ) {
      nodes { ... on Product { ...ProductFields } }
      pageInfo { hasNextPage endCursor }
    }
  }
`

const PRODUCT_DETAIL_QUERY = `#graphql
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      descriptionHtml
      availableForSale
      featuredImage { url altText }
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 10) { nodes { url altText } }
      variants(first: 50) {
        nodes {
          id
          title
          availableForSale
          quantityAvailable
          price { amount currencyCode }
        }
      }
      grade: metafield(namespace: "custom", key: "grade") { value }
      gradingCompany: metafield(namespace: "custom", key: "grading_company") { value }
    }
  }
`

type ProductPage = {
  nodes: ProductListItem[]
  pageInfo: { hasNextPage: boolean; endCursor: string | null }
}

export type ProductFilters = {
  query?: string
  gradeMin?: number
  gradeMax?: number
}

export async function getProducts(first = 24): Promise<ProductListItem[]> {
  const page = await getProductsPage({ first })
  return page.nodes
}

type MetafieldFilter = {
  productMetafield: { namespace: string; key: string; value: string }
}

export async function getProductsPage({
  first = 24,
  after,
  query,
  gradeMin = 1,
  gradeMax = 10,
}: {
  first?: number
  after?: string
} & ProductFilters = {}): Promise<ProductPage> {
  const q = query?.trim().replace(/[()"*~\\]/g, "") || "*"

  const productFilters: MetafieldFilter[] = []
  if (gradeMin > 1 || gradeMax < 10) {
    for (let g = gradeMin; g <= gradeMax; g++) {
      productFilters.push({
        productMetafield: {
          namespace: "custom",
          key: "grade",
          value: String(g),
        },
      })
    }
  }

  const { data, errors } = await shopify.request<{
    search: ProductPage
  }>(PRODUCT_SEARCH_QUERY, {
    variables: {
      first,
      after,
      query: q,
      productFilters: productFilters.length ? productFilters : undefined,
    },
  })
  if (errors) throw new Error(errors.message)
  return (
    data?.search ?? {
      nodes: [],
      pageInfo: { hasNextPage: false, endCursor: null },
    }
  )
}

export async function getProduct(
  handle: string,
): Promise<ProductDetail | null> {
  const { data, errors } = await shopify.request<{
    product: ProductDetail | null
  }>(PRODUCT_DETAIL_QUERY, { variables: { handle } })
  if (errors) throw new Error(errors.message)
  return data?.product ?? null
}

type CartLine = {
  id: string
  quantity: number
  cost: { totalAmount: Money }
  merchandise: {
    id: string
    title: string
    product: {
      handle: string
      title: string
      featuredImage: { url: string; altText: string | null } | null
    }
    price: Money
  }
}

export type Cart = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    subtotalAmount: Money
    totalAmount: Money
  }
  lines: { nodes: CartLine[] }
}

const CART_FIELDS = `#graphql
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        cost { totalAmount { amount currencyCode } }
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            product {
              handle
              title
              featuredImage { url altText }
            }
          }
        }
      }
    }
  }
`

export async function cartCreate(variantId: string, quantity = 1) {
  const { data, errors } = await shopify.request<{
    cartCreate: { cart: Cart; userErrors: { message: string }[] }
  }>(
    `${CART_FIELDS}
    mutation CartCreate($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart { ...CartFields }
        userErrors { message }
      }
    }`,
    { variables: { lines: [{ merchandiseId: variantId, quantity }] } },
  )
  if (errors) throw new Error(errors.message)
  return data!.cartCreate.cart
}

export async function cartGet(cartId: string): Promise<Cart | null> {
  const { data, errors } = await shopify.request<{ cart: Cart | null }>(
    `${CART_FIELDS}
    query CartGet($id: ID!) { cart(id: $id) { ...CartFields } }`,
    { variables: { id: cartId } },
  )
  if (errors) throw new Error(errors.message)
  return data?.cart ?? null
}

export async function cartLinesAdd(
  cartId: string,
  variantId: string,
  quantity = 1,
) {
  const { data, errors } = await shopify.request<{
    cartLinesAdd: { cart: Cart }
  }>(
    `${CART_FIELDS}
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
      }
    }`,
    {
      variables: {
        cartId,
        lines: [{ merchandiseId: variantId, quantity }],
      },
    },
  )
  if (errors) throw new Error(errors.message)
  return data!.cartLinesAdd.cart
}

export async function cartLinesUpdate(
  cartId: string,
  lineId: string,
  quantity: number,
) {
  const { data, errors } = await shopify.request<{
    cartLinesUpdate: { cart: Cart }
  }>(
    `${CART_FIELDS}
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
      }
    }`,
    { variables: { cartId, lines: [{ id: lineId, quantity }] } },
  )
  if (errors) throw new Error(errors.message)
  return data!.cartLinesUpdate.cart
}

export async function cartLinesRemove(cartId: string, lineIds: string[]) {
  const { data, errors } = await shopify.request<{
    cartLinesRemove: { cart: Cart }
  }>(
    `${CART_FIELDS}
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ...CartFields }
      }
    }`,
    { variables: { cartId, lineIds } },
  )
  if (errors) throw new Error(errors.message)
  return data!.cartLinesRemove.cart
}
