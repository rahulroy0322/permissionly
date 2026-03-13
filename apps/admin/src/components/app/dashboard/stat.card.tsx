import {
	type LucideIcon,
	type LucideProps,
	TrendingDown,
	TrendingUp,
	TrendingUpDown,
} from 'lucide-react'
import type { FC } from 'react'
import { cn } from '@/lib/utils'

type TrendIconPropsType = {
	change: DashboardStatCardPropsType['change']
} & LucideProps

const TrendIcon: FC<TrendIconPropsType> = ({ change, ...props }) => {
	if (change.startsWith('+')) {
		return <TrendingUp {...props} />
	}

	if (change.startsWith('-')) return <TrendingDown {...props} />
	return <TrendingUpDown {...props} />
}

type DashboardStatCardPropsType = {
	change: `${'+' | '-' | number}${number}${'%' | ''}`
	val: number | string
	label: string
	Icon: LucideIcon
	className: string
}

const DashboardStatCard: FC<DashboardStatCardPropsType> = ({
	val,
	change,
	label,
	Icon,
	className,
}) => (
	<div className="p-4 ring ring-primary grid grid-cols-3">
		<div className="space-y-2">
			<div
				className={cn('size-12 flex items-center justify-center', className)}
			>
				<Icon size={24} />
			</div>
			<h3 className="font-semibold text-sm text-muted-foreground uppercase">
				{label.toUpperCase()}
			</h3>
			<h4 className="font-bold text-xl">{val}</h4>
		</div>
		<div
			className={cn('flex justify-end items-end col-span-2 gap-2 text-3xl', {
				'text-emerald-500': change.startsWith('+'),
				'text-rose-500': change.startsWith('-'),
			})}
		>
			<p className="text-md font-semibold">{change}</p>
			<TrendIcon
				change={change}
				className="size-10"
				size={48}
			/>
		</div>
	</div>
)

export { DashboardStatCard }
