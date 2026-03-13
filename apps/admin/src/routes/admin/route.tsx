import { createFileRoute } from '@tanstack/react-router'
import type { FC } from 'react'
import { AdminHeader } from '#/admin/header'
import { AppSidebar } from '#/sidebar/main'
import { SidebarProvider } from '@/components/app/sidebar/context'

const AdminLayout: FC = () => (
	<div className="h-screen w-screen flex overflow-hidden">
		<SidebarProvider>
			<AppSidebar />
			<main className="grow">
				<AdminHeader />
			</main>
		</SidebarProvider>
	</div>
)

const Route = createFileRoute('/admin')({
	component: AdminLayout,
})

export { Route }
