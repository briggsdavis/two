import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatMoney } from "~/lib/money"
import { getProducts } from "~/lib/shopify"

export default async function Home() {
  const products = await getProducts(4)

  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-32">
        <h1 className="font-display text-6xl leading-[1.05] tracking-tight md:text-8xl">
          A small, deliberate
          <br />
          collection of cards{" "}
          <span className="italic">worth holding.</span>
        </h1>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link
            href="/cards"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-cream transition-colors hover:bg-ink/85"
          >
            Browse the cards
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/about"
            className="text-sm text-ink/70 underline-offset-4 hover:text-ink hover:underline"
          >
            What we&apos;re about
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-8 flex items-baseline justify-between gap-6 border-b border-ink/15 pb-4">
          <h2 className="font-display text-3xl tracking-tight italic">
            Latest arrivals
          </h2>
          <Link
            href="/cards"
            className="text-sm text-ink/70 underline-offset-4 hover:text-ink hover:underline"
          >
            See all
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="text-ink/60">Nothing in stock just yet.</p>
        ) : (
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
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mx-auto grid max-w-6xl gap-3 px-6 pb-24 md:grid-cols-2">
        <Link
          href="/about"
          className="group flex flex-col justify-between rounded-2xl border border-ink/15 p-8 transition-colors hover:border-ink/40"
        >
          <div>
            <p className="mb-3 text-xs tracking-[0.2em] text-ink/60 uppercase">
              About
            </p>
            <h3 className="font-display text-3xl tracking-tight">
              A shop run <span className="italic">at two o&apos;clock</span>,
              the quiet hour.
            </h3>
            <p className="mt-4 max-w-md text-ink/70">
              Cards are sourced one at a time, graded, and listed only when
              they&apos;re worth our shelf space.
            </p>
          </div>
          <span className="mt-8 inline-flex items-center gap-2 text-sm text-ink underline-offset-4 group-hover:underline">
            Read the story
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
        </Link>

        <Link
          href="/contact"
          className="group flex flex-col justify-between rounded-2xl border border-ink/15 p-8 transition-colors hover:border-ink/40"
        >
          <div>
            <p className="mb-3 text-xs tracking-[0.2em] text-ink/60 uppercase">
              Contact
            </p>
            <h3 className="font-display text-3xl tracking-tight">
              Looking for something{" "}
              <span className="italic">specific?</span>
            </h3>
            <p className="mt-4 max-w-md text-ink/70">
              Want-lists, consignments, or a card you&apos;d like us to hunt
              down. Send a note and we&apos;ll write back.
            </p>
          </div>
          <span className="mt-8 inline-flex items-center gap-2 text-sm text-ink underline-offset-4 group-hover:underline">
            Get in touch
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
        </Link>
      </section>
    </main>
  )
}
