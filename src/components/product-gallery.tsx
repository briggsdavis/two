"use client"

import { X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

type GalleryImage = { url: string; altText: string | null }

export function ProductGallery({
  images,
  title,
}: {
  images: GalleryImage[]
  title: string
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const open = openIndex !== null

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null)
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <div className="flex flex-col gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="relative aspect-square w-full cursor-zoom-in rounded-lg bg-ink/5 transition-transform hover:scale-[1.01]"
          >
            <Image
              src={img.url}
              alt={img.altText ?? title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain p-4"
              priority={i === 0}
            />
          </button>
        ))}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 animate-[fadeIn_150ms_ease-out]"
        >
          <button
            type="button"
            aria-label="Close image"
            onClick={() => setOpenIndex(null)}
            className="absolute inset-0 cursor-zoom-out bg-ink/80 backdrop-blur-sm"
          />
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpenIndex(null)}
            className="absolute top-6 right-6 z-10 rounded-full bg-cream/10 p-2 text-cream transition hover:bg-cream/20"
          >
            <X className="size-6" />
          </button>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
            <div className="relative h-full max-h-[90vh] w-full max-w-5xl animate-[zoomIn_200ms_ease-out]">
              <Image
                src={images[openIndex!].url}
                alt={images[openIndex!].altText ?? title}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
