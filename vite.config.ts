import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    port: 4000,       // 👈 set your desired port here
    strictPort: true, // optional: fail if port is in use
    open: true,       // optional: open browser automatically
  },
})