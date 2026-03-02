import preact from '@preact/preset-vite'
import { defineConfig } from 'vite'
import tailwind from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact(),tailwind()],
})
