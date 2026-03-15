import { createFileRoute, Outlet } from '@tanstack/react-router'
import type { FC } from 'react'
import { ThemeSwitch } from '@/components/app/theme/main'

const AuthLayout: FC = () => (
	<div className="min-h-screen flex items-center justify-center p-2">
		<div className="grid grid-cols-1 w-[90%] md:grid-cols-2 m-auto max-w-2xl ring ring-primary/30">
			<Outlet />
		</div>

		<div className="fixed right-5 top-5">
			<ThemeSwitch />
		</div>
	</div>
)

const Route = createFileRoute('/(auth)')({
	component: AuthLayout,
})

export { Route }
