import { defineConfig } from "vite"

import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { fileURLToPath } from "url"


export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(fileURLToPath(import.meta.url), "..", "src"),
    },
  },
})