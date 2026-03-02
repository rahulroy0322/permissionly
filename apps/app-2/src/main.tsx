import { createRouter } from '@tanstack/react-router'
import { Can } from 'policy/web'
import type { FC } from 'react'
import ReactDOM from 'react-dom/client'
import { Button } from 'ui/ui/button'
import { routeTree } from './routeTree.gen'

const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
	scrollRestoration: true,
})

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

// const rootElement = document.getElementById('app')!

// if (!rootElement.innerHTML) {
//   const root = ReactDOM.createRoot(rootElement)
//   root.render(<RouterProvider router={router} />)
// }

const Profile: FC = () => {
	return (
		<div className="bg-red-100 text-center">
			Loggedin User Profile
			<p>Proceted data</p>
		</div>
	)
}

// my impl
// TODO!
const MyApp: FC = () => {
	return (
		<div>
			<Button>hi</Button>
			<Can
				action="view"
				resorce="todos"
				user={{
					id: '',
					role: 'super',
				}}
			>
				{Profile}
			</Can>
		</div>
	)
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement)
	root.render(<MyApp />)
}
