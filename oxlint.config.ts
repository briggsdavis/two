import { defineConfig } from "oxlint"

export default defineConfig({
  plugins: [
    "eslint",
    "typescript",
    "oxc",
    "unicorn",
    "react",
    "react-perf",
    "nextjs",
    "jsx-a11y",
    "promise",
  ],
})
