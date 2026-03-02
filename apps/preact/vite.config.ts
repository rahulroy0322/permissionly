import preact from '@preact/preset-vite'
import tailwind from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact(), tailwind()],
})
