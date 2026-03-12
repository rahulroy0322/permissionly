import {
	Database,
	ListTodo,
	type LucideIcon,
	Newspaper,
	User,
} from 'lucide-react'
import type { FC } from 'react'
import type { PermissionSchemaType } from 'schema/permission'

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
				color: '',
			}
		case 'todo':
			return {
				Icon: ListTodo,
				color: '',
			}
		case 'post':
			return {
				Icon: Newspaper,
				color: '',
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
				<Database size={20} />
				<span className="text-md font-semibold">{resorce || 'No Resorce'}</span>
			</div>
		)
	}

	return (
		<Icon.Icon
			className={Icon.color}
			size={20}
		/>
	)
}

export { ResourceIcon }
