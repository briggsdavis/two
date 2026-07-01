import type { Metadata } from "next"
import { Fraunces, Instrument_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartDrawer } from "~/components/cart-drawer"
import { CartProvider } from "~/components/cart-provider"
import { SiteFooter } from "~/components/site-footer"
import { SiteNav } from "~/components/site-nav"
import { getCart } from "~/lib/cart"
import { siteDescription, siteName, siteUrl } from "~/lib/seo"
import "~/styles/styles.css"

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cart = await getCart()

  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <Analytics />
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
