import type { ImageLoaderProps } from "next/image"

export default function shopifyLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  const url = new URL(src, "https://cdn.shopify.com")
  url.searchParams.set("width", String(width))
  if (quality) url.searchParams.set("quality", String(quality))
  return url.toString()
}
