import {
	createHashHistory,
	createRouter,
	RouterProvider,
} from '@tanstack/react-router'
import { createRoot } from 'react-dom/client'
import { routeTree } from './routeTree.gen'
import './styles.css'
import 'ui/index.css'

const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
	scrollRestoration: true,
	history: createHashHistory({
		window,
	}),
})

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

const app = document.getElementById('app')

if (!app) {
	createRoot(document.body).render(
		<div className="flex items-center justify-center gap-2 flex-col text-destructive h-screen capitalize">
			<p className="text-5xl font-bold">app not found</p>
			<p className="text-3xl font-semibold">please let developer know</p>
			<a
				className="text-xl font-medium text-muted-foreground"
				href="mailto:rahulroyapd80@gmail.com"
			>
				Go to write email
			</a>
		</div>
	)

	throw new Error('app not found')
}

if (!app.innerHTML) {
	createRoot(app).render(<RouterProvider router={router} />)
}
