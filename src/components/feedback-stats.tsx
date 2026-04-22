export function FeedbackStats({ className = "" }: { className?: string }) {
  return (
    <dl
      className={`flex flex-wrap gap-x-16 gap-y-8 border-t border-ink/15 pt-8 ${className}`}
    >
      <div>
        <dt className="text-xs tracking-[0.2em] text-ink/60 uppercase">
          Positive feedback
        </dt>
        <dd className="mt-2 font-display text-4xl tracking-tight md:text-5xl">
          99.7<span className="text-ink/50">%</span>
        </dd>
      </div>
      <div>
        <dt className="text-xs tracking-[0.2em] text-ink/60 uppercase">
          Items sold
        </dt>
        <dd className="mt-2 font-display text-4xl tracking-tight md:text-5xl">
          8.0<span className="text-ink/50">K</span>
        </dd>
      </div>
    </dl>
  )
}
