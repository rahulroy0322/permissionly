import type { LucideIcon } from 'lucide-react'
import type { FC } from 'react'
import { cn } from 'ui/lib/utils'
import { Card, CardContent, CardFooter } from 'ui/ui/card'

type StatCardPropsType = {
	value: number | `${number}${'+' | '-'}`
	label: string
	color: `text-${string}-500`
	Icon: LucideIcon
}

const StatCard: FC<StatCardPropsType> = ({ Icon, color, label, value }) => (
	<Card>
		<CardContent>
			<div className="flex items-center justify-between">
				<Icon
					className={cn('size-5', color)}
					size={20}
				/>

				<span className="text-xl font-bold">{value}</span>
			</div>
		</CardContent>
		<CardFooter>
			<p className="text-xs font-semibold text-slate-500 uppercase">{label}</p>
		</CardFooter>
	</Card>
)

export type { StatCardPropsType }

export { StatCard }
