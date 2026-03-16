import { type LucideIcon, User, UserLock, UserStar, Users } from 'lucide-react'
import type { FC } from 'react'
import type { PermissionSchemaType } from 'schema/permission'
import { cn } from 'ui/lib/utils'

const getIconAndText = (
	role: PermissionSchemaType['role']
): LucideIcon | null => {
	switch (role) {
		case 'super':
			return UserStar
		case 'admin':
			return UserLock
		case 'moderator':
			return Users
		case 'user':
			return User
		default:
			return null
	}
}

const getColor = (
	role: PermissionSchemaType['role']
): `text-${string}-600` | `text-primary` => {
	switch (role) {
		case 'super':
			return 'text-rose-600'
		case 'admin':
			return 'text-emerald-600'
		case 'moderator':
			return 'text-amber-600'
		default:
			return 'text-primary'
	}
}

const UserIcon: FC<{
	role: PermissionSchemaType['role']
}> = ({ role }) => {
	const Icon = getIconAndText(role)

	if (!Icon) {
		return (
			<div className="flex items-center gap-2">
				<User
					className={cn('size-5', getColor(role))}
					size={20}
				/>
				<span className="text-md font-semibold">{role || 'No Role'}</span>
			</div>
		)
	}

	return (
		<Icon
			className={cn('size-5', getColor(role))}
			size={20}
		/>
	)
}

export { UserIcon }
