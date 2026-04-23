"use client"

import { Slider } from "@base-ui-components/react/slider"
import { X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { fetchProductsPage } from "~/app/cards/actions"
import { formatMoney } from "~/lib/money"
import type { ProductListItem } from "~/lib/shopify"

export function CardsGrid({
  initialProducts,
  initialEndCursor,
  initialHasNextPage,
}: {
  initialProducts: ProductListItem[]
  initialEndCursor: string | null
  initialHasNextPage: boolean
}) {
  const [range, setRange] = useState<[number, number]>([1, 10])
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [products, setProducts] = useState(initialProducts)
  const [cursor, setCursor] = useState(initialEndCursor)
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage)
  const [loading, setLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const loadingRef = useRef(false)
  const generationRef = useRef(0)
  const isInitialRef = useRef(true)

  useEffect(() => {
    const effective = query.trim().length >= 2 ? query : ""
    const id = setTimeout(() => setDebouncedQuery(effective), 250)
    return () => clearTimeout(id)
  }, [query])

  const filters = useMemo(
    () => ({
      query: debouncedQuery,
      gradeMin: range[0],
      gradeMax: range[1],
    }),
    [debouncedQuery, range],
  )

  useEffect(() => {
    if (isInitialRef.current) {
      isInitialRef.current = false
      return
    }
    const gen = ++generationRef.current
    loadingRef.current = true
    setLoading(true)
    fetchProductsPage(filters)
      .then((page) => {
        if (gen !== generationRef.current) return
        setProducts(page.nodes)
        setCursor(page.pageInfo.endCursor)
        setHasNextPage(page.pageInfo.hasNextPage)
      })
      .finally(() => {
        if (gen === generationRef.current) {
          loadingRef.current = false
          setLoading(false)
        }
      })
  }, [filters])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el || !hasNextPage) return
    const observer = new IntersectionObserver(
      async (entries) => {
        if (!entries[0]?.isIntersecting) return
        if (loadingRef.current || !cursor) return
        const gen = generationRef.current
        loadingRef.current = true
        setLoading(true)
        try {
          const page = await fetchProductsPage(filters, cursor)
          if (gen !== generationRef.current) return
          setProducts((prev) => [...prev, ...page.nodes])
          setCursor(page.pageInfo.endCursor)
          setHasNextPage(page.pageInfo.hasNextPage)
        } finally {
          if (gen === generationRef.current) {
            loadingRef.current = false
            setLoading(false)
          }
        }
      },
      { rootMargin: "400px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [cursor, hasNextPage, filters])

  return (
    <>
      <div className="mb-10 grid grid-cols-1 items-end gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label
            htmlFor="card-search"
            className="mb-2 block text-sm font-medium"
          >
            Search
          </label>
          <div className="relative flex items-center border-b border-ink/20 focus-within:border-ink">
            <input
              id="card-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Charizard"
              className="w-full appearance-none bg-transparent pr-6 pb-1 text-sm placeholder:text-ink/40 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-0 bottom-1 text-ink/50 hover:text-ink"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          {query.trim().length === 1 && (
            <p className="mt-1 text-xs text-ink/50">Keep typing…</p>
          )}
        </div>
        <div>
          <div className="mb-2 text-sm font-medium">Grade</div>
          <Slider.Root
            value={range}
            onValueChange={(v) => setRange(v as [number, number])}
            min={1}
            max={10}
            step={1}
            minStepsBetweenValues={0}
            thumbAlignment="edge"
          >
            <Slider.Control className="flex h-5 w-full items-center">
              <Slider.Track className="relative h-1 w-full rounded-full bg-ink/15">
                <Slider.Indicator className="absolute h-full rounded-full bg-ink" />
                <Slider.Thumb className="relative block size-4 cursor-grab rounded-full bg-ink outline-none focus-visible:ring-2 focus-visible:ring-ink/40">
                  <span className="absolute top-full left-1/2 mt-1 -translate-x-1/2 text-xs text-ink/70 tabular-nums">
                    {range[0]}
                  </span>
                </Slider.Thumb>
                <Slider.Thumb className="relative block size-4 cursor-grab rounded-full bg-ink outline-none focus-visible:ring-2 focus-visible:ring-ink/40">
                  <span className="absolute top-full left-1/2 mt-1 -translate-x-1/2 text-xs text-ink/70 tabular-nums">
                    {range[1]}
                  </span>
                </Slider.Thumb>
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <li key={p.id}>
            <Link href={`/products/${p.handle}`} className="block">
              <div className="relative aspect-square w-full rounded-lg bg-ink/5">
                {p.featuredImage && (
                  <Image
                    src={p.featuredImage.url}
                    alt={p.featuredImage.altText ?? p.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-contain p-2"
                  />
                )}
                {(p.gradingCompany || p.grade) && (
                  <span className="absolute top-2 left-2 rounded-full bg-ink px-2 py-1 text-[10px] font-semibold tracking-wider text-cream uppercase">
                    {p.gradingCompany?.value}
                    {p.gradingCompany && p.grade && " "}
                    {p.grade && p.grade.value}
                  </span>
                )}
              </div>
              <div className="mt-2 flex items-baseline justify-between gap-2">
                <span className="font-medium">{p.title}</span>
                <span className="text-sm text-ink/70">
                  {formatMoney(p.priceRange.minVariantPrice)}
                </span>
              </div>
              {!p.availableForSale && (
                <span className="text-xs text-red-600">Sold out</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
      {!loading && products.length === 0 && (
        <p className="py-12 text-center text-sm text-ink/50">No cards match.</p>
      )}
      {hasNextPage && (
        <div
          ref={sentinelRef}
          className="mt-8 py-8 text-center text-sm text-ink/50"
        >
          {loading ? "Loading…" : ""}
        </div>
      )}
    </>
  )
}
