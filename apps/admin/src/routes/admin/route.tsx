import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { useAuth } from 'auth'
import type { FC } from 'react'
import { AppLoader } from 'ui/components/app/loader.tsx'
import { AdminHeader } from '#/admin/header'
import { AppSidebar } from '#/sidebar/main'
import { SidebarProvider } from '@/components/app/sidebar/context'

const AdminLayoutImpl: FC = () => (
	<div className="h-screen w-screen flex overflow-hidden">
		<SidebarProvider defaultOpen>
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

const AdminLayout: FC = () => {
	const { loading, user } = useAuth()

	if (loading) {
		return <AppLoader page />
	}

	if (!user) {
		return <Navigate to="/login" />
	}

	return <AdminLayoutImpl />
}

const Route = createFileRoute('/admin')({
	component: AdminLayout,
})

export { Route }
