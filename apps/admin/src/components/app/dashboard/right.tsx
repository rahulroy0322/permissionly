import { Link } from '@tanstack/react-router'
import { type LucideIcon, Settings, Shield } from 'lucide-react'
import type { FC } from 'react'
import type { RoleSchemaType } from 'schema/role'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { RightChart } from './right.chart'

type StatPropsType = {
	percent: number
	role: Capitalize<RoleSchemaType>
	className: string
}

const Stat: FC<StatPropsType> = ({ percent, role, className }) => (
	<p className="text-base font-bold flex items-center justify-between">
		<span className="flex items-center gap-2 text-muted-foreground">
			<i className={cn('size-3 block', className)} />
			{role}
		</span>

		<span>{percent}%</span>
	</p>
)

type ChartPropsType = Record<RoleSchemaType, number> & {
	total: number
}

const Chart: FC<ChartPropsType> = (props) => {
	const { total, super: superUser, admin, moderator, user } = props
	return (
		<Card>
			<CardHeader className="text-center py-4">
				<CardTitle>
					<h3 className="text-lg font-black tracking-tight">
						Role Distribution
					</h3>
				</CardTitle>
				<CardDescription className="text-sm">
					Allocation of user access types.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-center">
					<RightChart {...props} />
				</div>

				<div>
					<Stat
						className="bg-chart-1"
						percent={Math.floor((superUser / total) * 100)}
						role="Super"
					/>

					<Stat
						className="bg-chart-2"
						percent={Math.floor((admin / total) * 100)}
						role="Admin"
					/>
					<Stat
						className="bg-chart-3"
						percent={Math.floor((moderator / total) * 100)}
						role="Moderator"
					/>
					<Stat
						className="bg-chart-4"
						percent={Math.floor((user / total) * 100)}
						role="User"
					/>
				</div>

				<Button
					className="w-full mt-3"
					render={<Link to="/" />}
				>
					Manage Users
				</Button>
			</CardContent>
		</Card>
	)
}

type JumpItemPropsType = {
	Icon: LucideIcon
	label: string
	color: `text-${string}-500` | (string & {})
}

const JumpItem: FC<JumpItemPropsType> = ({ Icon, color, label }) => (
	<Link
		className="flex items-center gap2 hover:bg-muted-foreground transition-all group p-2 px-4 text-muted-foreground hover:text-background gap-2 duration-250 ring"
		to="/"
	>
		<div
			className={cn(
				'h-full aspect-square flex items-center justify-center',
				color
			)}
		>
			<Icon size={20} />
		</div>
		<p className="text-sm font-bold text-inherit">{label}</p>
	</Link>
)

const items = [
	{ label: 'Security Management', Icon: Shield, color: 'text-emerald-500' },
	{ label: 'System Configuration', Icon: Settings, color: 'text-amber-500' },
] satisfies JumpItemPropsType[]
const JumpSection: FC = () => (
	<Card>
		<CardHeader>
			<CardTitle>Jump to section</CardTitle>
		</CardHeader>
		<CardContent className="space-y-2">
			{items.map((item) => (
				<JumpItem
					{...item}
					key={item.label}
				/>
			))}
		</CardContent>
	</Card>
)

type RightPropsType = ChartPropsType & {}
const Right: FC<RightPropsType> = ({ ...props }) => (
	<div className="h-fit">
		<Chart {...props} />
		<JumpSection />
	</div>
)

export { Right }
