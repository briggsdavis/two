import type { Metadata } from "next"
import Link from "next/link"
import { FeedbackLinks } from "~/components/feedback-links"

export const metadata: Metadata = {
  title: "About",
  description:
    "How Two O'Clock Cards sources, grades, and lists cards — one at a time, at the quiet hour.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About", url: "/about" },
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="mb-6 text-xs tracking-[0.2em] text-ink/60 uppercase">
        About
      </p>
      <h1 className="font-display text-5xl leading-[1.05] tracking-tight md:text-6xl">
        A small shop, run at <span className="italic">two o&apos;clock.</span>
      </h1>

      <div className="mt-12 space-y-6 text-lg leading-relaxed text-ink/80">
        <p>
          Two O&apos;Clock Trading started as a side table at a card show and
          has stayed roughly that size on purpose. We sell graded cards we
          like, one at a time, and we&apos;d rather list ten good cards than a
          hundred ordinary ones.
        </p>
        <p>
          Every card is photographed in natural light, described honestly,
          and packed with the same care we&apos;d want as the buyer. If
          something arrives and isn&apos;t right, we make it right.
        </p>
        <p>
          Most days, we sit down to grade, list, and pack at two o&apos;clock.
          The name stuck.
        </p>
      </div>

      <FeedbackLinks className="mt-20" />

      <div className="mt-20 border-t border-ink/15 pt-8">
        <p className="text-sm text-ink/60">
          Have a question or a card you&apos;d like us to look at?{" "}
          <Link
            href="/contact"
            className="text-ink underline-offset-4 hover:underline"
          >
            Get in touch
          </Link>
          .
        </p>
      </div>
    </main>
  )
}
