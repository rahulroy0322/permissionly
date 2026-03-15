import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import type { FC } from 'react'
import { getPermission } from 'src/api/permission'
import { PermissionsPage } from 'src/components/pages/permissions.page'
import { AppLoader } from '@/components/app/loader'

const PermissionsRoute: FC = () => {
	const { meta, permissions } = useLoaderData({
		from: '/admin/permission',
	})

	return (
		<PermissionsPage
			data={permissions}
			{...meta}
		/>
	)
}

const Route = createFileRoute('/admin/permission')({
	component: PermissionsRoute,
	pendingComponent: AppLoader,
	loader: async () => {
		const { permissions } = await getPermission()

		// ! todo move to table
		const total = permissions.length,
			allowed = permissions.filter(({ value }) => value === true).length,
			denied = permissions.filter(({ value }) => value === false).length

		const meta = {
			allowed,
			denied,
			logical: total - (allowed + denied),
			total,
		}

		return {
			permissions,
			meta,
		}
	},
})

export { Route }
