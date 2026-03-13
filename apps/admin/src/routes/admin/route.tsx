import { createFileRoute, Outlet } from '@tanstack/react-router'
import type { FC } from 'react'
import { AdminHeader } from '#/admin/header'
import { AppSidebar } from '#/sidebar/main'
import { SidebarProvider } from '@/components/app/sidebar/context'

const AdminLayout: FC = () => (
	<div className="h-screen w-screen flex overflow-hidden">
		<SidebarProvider>
			<AppSidebar />
			<main className="grow overflow-hidden flex flex-col">
				<AdminHeader />
				<div className="flex-1 overflow-auto">
					<Outlet />
				</div>
			</main>
		</SidebarProvider>
	</div>
)

const Route = createFileRoute('/admin')({
	component: AdminLayout,
})

export { Route }
