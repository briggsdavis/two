import type { Metadata } from "next"
import Link from "next/link"
import { FeedbackLinks } from "~/components/feedback-links"
import { FeedbackStats } from "~/components/feedback-stats"
import { Testimonials } from "~/components/testimonials"

export const metadata: Metadata = {
  title: "About",
  description:
    "How Two O'Clock Trading sources, grades, and lists cards — one at a time, at the quiet hour.",
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
          Two O&apos;Clock Trading started as an expansion of our eBay
          business, which is 26 years old. This can be found under our antiques
          account, <span className="italic">Dunkie</span>, where we sell our
          own collectables from our passions, mainly antique tobacciana and
          vintage jewelry.
        </p>
        <p>
          It was called Two O&apos;Clock as it was the time when our baby son
          napped and we could work on our business. We moved our business from
          Texas to Ohio, where we are now based, and the name traveled with us.
        </p>
        <p>
          Over the years, our own passions have expanded into Pokémon cards,
          and we buy and grade a lot of product now.
        </p>
      </div>

      <FeedbackStats className="mt-20" />

      <Testimonials className="mt-20" />

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
