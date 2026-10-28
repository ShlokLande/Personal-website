import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// One real HTML file per URL, so /projects/match-a/ works on any static host.
const pages = ['index', 'solar/index', ...['match-a', 'commuteity', 'code-unity', 'dermai', 'learnloop'].map((s) => `projects/${s}/index`)]

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((p) => [p.replace(/\/index$/, '') || 'home', resolve(__dirname, `${p}.html`)])),
    },
  },
})
