import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-ink/15">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-3">
        <div>
          <h3 className="mb-3 font-display text-xl tracking-tight italic">
            Two O&apos;Clock Trading
          </h3>
          <p className="text-sm text-ink/70">
            A small shop for collectors of singular cards. Carefully sourced,
            individually graded, shipped with care.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold tracking-wide uppercase">
            Shop
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-ink/70">
            <li>
              <Link href="/cards">All cards</Link>
            </li>
            <li>
              <Link href="/cards">New arrivals</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold tracking-wide uppercase">
            Company
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-ink/70">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink/15">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-xs text-ink/60">
          <span>© {new Date().getFullYear()} Two O&apos;Clock Trading</span>
          <span>
            Made by{" "}
            <a
              href="https://briggsdavis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Briggs Davis
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
