import {
	Eye,
	type LucideIcon,
	PenLine,
	Plus,
	ShieldQuestion,
	Trash2,
} from 'lucide-react'
import type { FC } from 'react'
import type { PermissionSchemaType } from 'schema/permission'
import { Badge } from 'ui/ui/badge'

const getIconAndText = (
	action: PermissionSchemaType['action']
): {
	Icon: LucideIcon
	varient: Parameters<typeof Badge>[0]['variant']
} => {
	switch (action) {
		case 'create':
			return {
				Icon: Plus,
				varient: 'default',
			}
		case 'read':
			return {
				Icon: Eye,
				varient: 'secondary',
			}
		case 'update':
			return {
				Icon: PenLine,
				varient: 'warn',
			}
		case 'delete':
			return {
				Icon: Trash2,
				varient: 'destructive',
			}

		default:
			return {
				Icon: ShieldQuestion,
				varient: 'secondary',
			}
	}
}

const ActionIcon: FC<{
	action: PermissionSchemaType['action']
}> = ({ action }) => {
	const { Icon, varient } = getIconAndText(action)

	return (
		<Badge variant={varient}>
			<Icon size={20} />
			<span className="text-md font-semibold">{action || 'No Action'}</span>
		</Badge>
	)
}

export { ActionIcon }
