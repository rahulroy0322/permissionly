import type { LucideIcon } from 'lucide-react'
import type { FC } from 'react'
import { cn } from 'ui/lib/utils'
import { Card } from 'ui/ui/card'

type PostStatCardPropsType = {
	value: string
	label: Uppercase<string>
	Icon: LucideIcon
	className: string
}

const PostStatCard: FC<PostStatCardPropsType> = ({
	value,
	label,
	Icon,
	className,
}) => (
	<Card className="p-4 flex-row items-center">
		<div className={cn('p-2', className)}>
			<Icon
				className="size-8"
				size={24}
			/>
		</div>

		<div>
			<h3 className="text-md font-bold text-muted-foreground">{label}</h3>
			<h4 className="text-2xl font-bold">{value}</h4>
		</div>
	</Card>
)

export { PostStatCard }
