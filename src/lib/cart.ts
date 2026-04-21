"use server"

import { updateTag } from "next/cache"
import { cookies } from "next/headers"
import {
  cartCreate,
  cartGet,
  cartLinesAdd,
  cartLinesRemove,
  cartLinesUpdate,
  type Cart,
} from "~/lib/shopify"

const COOKIE = "cartId"
const MAX_AGE = 60 * 60 * 24 * 14 // 14 days

async function setCartCookie(cartId: string) {
  const store = await cookies()
  store.set(COOKIE, cartId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  })
}

export async function getCart(): Promise<Cart | null> {
  const store = await cookies()
  const id = store.get(COOKIE)?.value
  if (!id) return null
  try {
    return await cartGet(id)
  } catch {
    return null
  }
}

export async function addToCart(variantId: string, quantity = 1) {
  const store = await cookies()
  const existingId = store.get(COOKIE)?.value
  let cart: Cart | null = null

  if (existingId) {
    try {
      cart = await cartLinesAdd(existingId, variantId, quantity)
    } catch {
      cart = null
    }
  }
  if (!cart) {
    cart = await cartCreate(variantId, quantity)
    await setCartCookie(cart.id)
  }
  updateTag("cart")
  return cart
}

export async function updateLine(lineId: string, quantity: number) {
  const store = await cookies()
  const id = store.get(COOKIE)?.value
  if (!id) return null
  const cart = await cartLinesUpdate(id, lineId, quantity)
  updateTag("cart")
  return cart
}

export async function removeLine(lineId: string) {
  const store = await cookies()
  const id = store.get(COOKIE)?.value
  if (!id) return null
  const cart = await cartLinesRemove(id, [lineId])
  updateTag("cart")
  return cart
}
