"use client"

import { useEffect } from "react"

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          padding: "4rem 1.5rem",
          maxWidth: "40rem",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: 600 }}>
          Something went wrong
        </h1>
        <p style={{ marginTop: "1rem", color: "#555" }}>
          A fatal error occurred. Please try again.
        </p>
        {error.digest && (
          <p
            style={{
              marginTop: "0.5rem",
              fontFamily: "monospace",
              fontSize: "0.75rem",
              color: "#888",
            }}
          >
            ref: {error.digest}
          </p>
        )}
        <button
          onClick={() => unstable_retry()}
          style={{
            marginTop: "2rem",
            padding: "0.75rem 1.5rem",
            borderRadius: "9999px",
            background: "#111",
            color: "#fff",
            border: 0,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
