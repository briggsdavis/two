import type { Metadata } from "next"
import { FeedbackLinks } from "~/components/feedback-links"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions, want-lists, consignments — get in touch with Two O'Clock Cards.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact", url: "/contact" },
}

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="mb-6 text-xs tracking-[0.2em] text-ink/60 uppercase">
        Contact
      </p>
      <h1 className="font-display text-5xl leading-[1.05] tracking-tight md:text-6xl">
        Say hello, send a <span className="italic">want-list.</span>
      </h1>

      <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/80">
        Questions about a listing, consignments, or hunting down a specific
        card. Write to us and we&apos;ll write back, usually within a day.
      </p>

      <dl className="mt-12 grid gap-8 sm:grid-cols-2">
        <div>
          <dt className="text-xs tracking-[0.2em] text-ink/60 uppercase">
            Email
          </dt>
          <dd className="mt-2 font-display text-2xl tracking-tight">
            <a
              href="mailto:hello@twooclocktrading.com"
              className="underline-offset-4 hover:underline"
            >
              hello@twooclocktrading.com
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs tracking-[0.2em] text-ink/60 uppercase">
            Hours
          </dt>
          <dd className="mt-2 text-ink/80">
            Replies go out between
            <br />
            two and five, most days.
          </dd>
        </div>
      </dl>

      <FeedbackLinks className="mt-20" />
    </main>
  )
}
