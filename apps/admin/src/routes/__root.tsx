import { TanStackDevtools } from '@tanstack/react-devtools'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import type { FC } from 'react'

// import Footer from '#/footer'
// import Header from '#/header'

const RootLayout: FC = () => {
	// const user = null
	return (
		<div>
			{/* <Header user={user} />
			<div> */}
			<Outlet />
			{/* </div>
			<Footer /> */}
			<TanStackDevtools
				config={{
					position: 'bottom-right',
				}}
				plugins={[
					{
						name: 'TanStack Router',
						render: <TanStackRouterDevtoolsPanel />,
					},
				]}
			/>
		</div>
	)
}

const Route = createRootRoute({
	component: RootLayout,
})

export { Route }
