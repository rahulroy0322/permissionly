import { createFileRoute } from '@tanstack/react-router'
import type { FC } from 'react'
import type { PermissionSchemaType } from 'schema/permission'
import PermissionsPage from 'src/components/pages/permissions.page'

const PermissionsRoute: FC = () => {
	const data: PermissionSchemaType[] = [
		{
			role: 'super',
			value: true,
		},
		{
			role: 'admin',
			resorce: 'todo',
			value: true,
		},
		{
			role: 'moderator',
			resorce: 'user',
			value: false,
		},
		{
			role: 'moderator',
			resorce: 'user',
			action: 'create',
			value: false,
		},
		{
			role: 'moderator',
			resorce: 'user',
			action: 'update',
			value: false,
		},
		{
			role: 'moderator',
			resorce: 'user',
			action: 'read',
			value: false,
		},
		{
			role: 'moderator',
			resorce: 'user',
			action: 'delete',
			value: false,
		},
	]

	const total = data.length,
		allowed = data.filter(({ value }) => value === true).length,
		denied = data.filter(({ value }) => value === false).length,
		meta = {
			allowed,
			denied,
			logical: total - (allowed + denied),
			total,
		}

	return (
		<PermissionsPage
			data={data}
			{...meta}
		/>
	)
}

const Route = createFileRoute('/admin/permission')({
	component: PermissionsRoute,
})

export { Route }
