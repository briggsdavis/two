"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="mb-6 text-xs tracking-[0.2em] text-ink/60 uppercase">
        Something went wrong
      </p>
      <h1 className="font-display text-5xl leading-[1.05] tracking-tight md:text-6xl">
        A hiccup on <span className="italic">our end.</span>
      </h1>
      <p className="mt-6 text-lg text-ink/70">
        Try again — if it happens twice, let us know.
      </p>
      {error.digest && (
        <p className="mt-2 font-mono text-xs text-ink/40">
          ref: {error.digest}
        </p>
      )}
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => unstable_retry()}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-cream transition-colors hover:bg-ink/85"
        >
          Try again
        </button>
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
