import { createRouter, RouterProvider } from '@tanstack/react-router'
import React, { type FC } from 'react'
import ReactDOM from 'react-dom/client'
import { Button } from 'ui/ui/button'
import { routeTree } from './routeTree.gen'
import { Can } from 'policy/web'

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
	return <div>
		<Button>hi</Button>
		<Can user={{
			id: '',
			role: 'super'
		}} resorce='todos' action='view'>
			{Profile}
		</Can>
	</div>
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement)
	root.render(<MyApp />)
}
