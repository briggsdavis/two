<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Images

`next.config.ts` uses a custom app-wide image loader (`src/lib/shopify-loader.ts`) that routes every `next/image` src to `cdn.shopify.com?width=N`. This bypasses Vercel image optimization (free, since Shopify's CDN handles resizing + WebP/AVIF).

**Caveat:** the loader is global. Local images (e.g. `/public/logo.png`) or other remote hosts will break — they'll get rewritten as `cdn.shopify.com/logo.png`. Before adding non-Shopify images, either:
- branch inside the loader: `if (!src.includes('shopify')) return src` (and add `remotePatterns` back for any remote hosts), or
- pass `loader={shopifyLoader}` per-image and drop the global loader from the config.
