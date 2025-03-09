import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':"https://cloth-e-commerce-47l9.onrender.com"
    }
  },
  plugins: [react()],
  server: {port:  5174}
})
