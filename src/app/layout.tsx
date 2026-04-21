import type { Metadata } from "next"
import { Fraunces, Instrument_Sans } from "next/font/google"
import { CartDrawer } from "~/components/cart-drawer"
import { CartProvider } from "~/components/cart-provider"
import { SiteFooter } from "~/components/site-footer"
import { SiteNav } from "~/components/site-nav"
import { getCart } from "~/lib/cart"
import "~/styles/styles.css"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
const siteName = "Two O'Clock Cards"
const siteDescription =
  "A small, deliberate collection of graded trading cards, sourced one at a time and listed only when they're worth our shelf space."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName,
    title: siteName,
    description: siteDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
  robots: { index: true, follow: true },
}

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
})

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cart = await getCart()

  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <CartProvider initialCart={cart}>
          <SiteNav />
          <div className="flex-1">{children}</div>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}
