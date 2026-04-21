import { defineConfig } from "oxfmt"

export default defineConfig({
  printWidth: 80,
  semi: false,
  sortImports: { newlinesBetween: false },
  sortTailwindcss: { stylesheet: "src/styles/styles.css" },
})
