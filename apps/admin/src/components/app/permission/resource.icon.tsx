import {
	Database,
	ListTodo,
	type LucideIcon,
	Newspaper,
	User,
} from 'lucide-react'
import type { FC } from 'react'
import type { PermissionSchemaType } from 'schema/permission'
import { cn } from 'ui/lib/utils'

const getIcon = (
	resorce: PermissionSchemaType['resorce']
): {
	Icon: LucideIcon
	color: string
} | null => {
	switch (resorce) {
		case 'user':
			return {
				Icon: User,
				color: 'text-primary',
			}
		case 'todo':
			return {
				Icon: ListTodo,
				color: 'text-blue-500',
			}
		case 'post':
			return {
				Icon: Newspaper,
				color: 'text-emerald-500',
			}
		default:
			return null
	}
}

const ResourceIcon: FC<{
	resorce: PermissionSchemaType['resorce']
}> = ({ resorce }) => {
	const Icon = getIcon(resorce)

	if (!Icon) {
		return (
			<div className="flex items-center gap-2">
				<Database
					className="size-5"
					size={20}
				/>
				<span className="text-md font-semibold">{resorce || 'No Resorce'}</span>
			</div>
		)
	}

	return (
		<Icon.Icon
			className={cn('size-5', Icon.color)}
			size={20}
		/>
	)
}

export { ResourceIcon }
