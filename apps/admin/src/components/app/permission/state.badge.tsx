import {
	AlertCircle,
	CheckCircle2,
	Layers,
	type LucideIcon,
} from 'lucide-react'
import type { FC } from 'react'
import type { PermissionSchemaType } from 'schema/permission'
import { Badge } from '@/components/ui/badge'

const getIconAndText = (
	value: PermissionSchemaType['value']
): {
	Icon: LucideIcon
	varient: Parameters<typeof Badge>[0]['variant']
	text: string
} => {
	if (typeof value === 'boolean') {
		switch (value) {
			case true:
				return {
					Icon: CheckCircle2,
					varient: 'success',
					text: 'Allowed',
				}
			case false:
				return {
					Icon: AlertCircle,
					varient: 'destructive',
					text: 'Denied',
				}
		}
	}
	switch (value.type) {
		case 'leaf':
			return {
				Icon: Layers,
				varient: 'warn',
				text: `Conditional (singal)`,
			}
		case 'not':
		case 'and':
		case 'or':
			return {
				Icon: Layers,
				varient: 'warn',
				text: `Conditional (${value.type})`,
			}
		default:
			return {
				Icon: Layers,
				varient: 'default',
				text: 'Unknown type',
			}
	}
}

const StateIcon: FC<{
	value: PermissionSchemaType['value']
}> = ({ value }) => {
	const { Icon, varient, text } = getIconAndText(value)

	return (
		<Badge variant={varient}>
			<Icon size={12} />
			<span>{text}</span>
		</Badge>
	)
}

export { StateIcon }
