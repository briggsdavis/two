import Link from "next/link"

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="mb-6 text-xs tracking-[0.2em] text-ink/60 uppercase">
        404
      </p>
      <h1 className="font-display text-5xl leading-[1.05] tracking-tight md:text-6xl">
        We couldn&apos;t find <span className="italic">that one.</span>
      </h1>
      <p className="mt-6 text-lg text-ink/70">
        The card or page you&apos;re after may have sold, moved, or never
        existed. Have a look at what&apos;s in stock.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/cards"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-cream transition-colors hover:bg-ink/85"
        >
          Browse the cards
        </Link>
        <Link
          href="/"
          className="text-sm text-ink/70 underline-offset-4 hover:text-ink hover:underline"
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}
