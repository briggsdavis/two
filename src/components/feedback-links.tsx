import { ArrowUpRight } from "lucide-react"

const feedbackLinks = [
  {
    label: "All-time feedback",
    description: "Every review left for the shop on eBay.",
    href: "https://www.ebay.com/fdbk/feedback_profile/REPLACE_ME",
  },
  {
    label: "Recent feedback",
    description: "What buyers have said over the last month.",
    href: "https://www.ebay.com/fdbk/feedback_profile/REPLACE_ME?filter=feedback_page%3ARECEIVED_AS_SELLER",
  },
]

export function FeedbackLinks({ className = "" }: { className?: string }) {
  return (
    <section className={className}>
      <div className="mb-6 flex items-baseline justify-between gap-6 border-b border-ink/15 pb-4">
        <h2 className="font-display text-3xl tracking-tight italic">
          Live feedback
        </h2>
        <span className="text-xs tracking-[0.2em] text-ink/60 uppercase">
          eBay
        </span>
      </div>
      <p className="mb-6 max-w-xl text-ink/70">
        We sell on eBay too. Read what buyers have said, straight from the
        source.
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {feedbackLinks.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col justify-between rounded-2xl border border-ink/15 p-6 transition-colors hover:border-ink/40"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-display text-xl tracking-tight">
                  {l.label}
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-ink/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
              </div>
              <p className="mt-3 text-sm text-ink/70">{l.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
