"use client"

import { useEffect, useState } from "react"

const quotes = [
  "One of the best sellers on eBay, hands down. The seller made sure to pack this item with incredible care and thoughtfulness. They went out of their way to make sure this item was delivered even with some minor delays. I appreciate the quality of the shipping materials. It arrived in perfect condition. The appearance of it looks so beautiful with the shiny holo style!",
  "Extremely fast shipping. Very well packed. Each box of Japanese Mega Cards was wrapped in bubble wrap. Then those were wrapped in more bubble wrap together and shipped in a sturdy box. Items arrived and are exactly what I ordered, brand new sealed, and in perfect condition. I wouldn't hesitate to order from this seller again. Thank you!",
  "Outstanding seller! The PSA-authenticated Pokémon card arrived exactly as described, securely packaged, and in pristine condition. Shipping was incredibly fast, and communication was prompt and professional throughout the entire process. You can truly tell this seller values collectors and quality. I'm extremely satisfied and would gladly purchase again. Highly recommended!",
]

const INTERVAL_MS = 8000

export function Testimonials({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % quotes.length)
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [paused])

  return (
    <section
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Buyer testimonials"
    >
      <div className="mb-6 flex items-baseline justify-between gap-6 border-b border-ink/15 pb-4">
        <h2 className="font-display text-3xl tracking-tight italic">
          In buyers&apos; words
        </h2>
        <span className="text-xs tracking-[0.2em] text-ink/60 uppercase">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(quotes.length).padStart(2, "0")}
        </span>
      </div>

      <div className="grid">
        {quotes.map((q, i) => (
          <blockquote
            key={i}
            aria-hidden={i !== index}
            style={{ gridArea: "1 / 1" }}
            className={`transition-opacity duration-700 ease-out ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <p className="font-display text-xl leading-snug tracking-tight text-ink/90 italic md:text-2xl">
              <span className="mr-1 text-ink/40">“</span>
              {q}
              <span className="ml-1 text-ink/40">”</span>
            </p>
          </blockquote>
        ))}
      </div>

      <div className="mt-8 flex gap-2">
        {quotes.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show testimonial ${i + 1}`}
            aria-current={i === index}
            className={`h-1 rounded-full transition-all ${
              i === index ? "w-10 bg-ink" : "w-5 bg-ink/20 hover:bg-ink/40"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
