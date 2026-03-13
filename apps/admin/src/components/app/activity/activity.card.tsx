import { Ban, Clock, type LucideProps, Pen, Plus, Trash2 } from 'lucide-react'
import type { FC } from 'react'
import type { ActionSchemaType } from 'schema/action'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

type ActivityCardIconPropsType = Pick<ActivityCardPropsType, 'action'> &
	LucideProps

const ActivityCardIcon: FC<ActivityCardIconPropsType> = ({
	action,
	...props
}) => {
	switch (action) {
		case 'create':
			return <Plus {...props} />
		case 'update':
			return <Pen {...props} />
		case 'delete':
			return <Trash2 {...props} />

		default:
			console.error(`unknown action "${action satisfies never}"`)
			return <Ban {...props} />
	}
}

const config = {
	create: 'text-emerald-500 bg-emerald-500/40',
	update: 'text-amber-500 bg-amber-500/40',
	delete: 'text-destructive bg-destructive/40',
} satisfies Record<ActivityCardPropsType['action'], string>

type ActivityCardPropsType = {
	action: Exclude<ActionSchemaType, 'read'>
	text: string
	name: string
}

const ActivityCard: FC<ActivityCardPropsType> = ({ action, text, name }) => (
	<Card>
		<CardHeader>
			<CardTitle className="flex items-center gap-2">
				<div
					className={cn(
						'size-5 flex items-center justify-center p-1',
						config[action] ?? 'bg-primary/40 text-primary'
					)}
				>
					<ActivityCardIcon
						action={action}
						size={20}
					/>
				</div>
				<p className="space-x-1 text-base flex-1">
					<b>{action === 'create' ? 'Created' : ''}</b>
					<span>{text}</span>
				</p>
			</CardTitle>
		</CardHeader>
		<CardContent>
			<p className="text-sm ml-6">
				<b className="text-muted-foreground">By</b> <span>{name}</span>
			</p>
		</CardContent>
		<CardFooter>
			<p className="font-bold text-muted-foreground flex items-center gap-1">
				<Clock size={10} />
				<span>1 hour ago</span>
			</p>
		</CardFooter>
	</Card>
)

export { ActivityCard }
