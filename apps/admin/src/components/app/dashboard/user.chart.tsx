import type { FC } from 'react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'

type UserChartPropsType = {
	data: {
		date: string
		users: number
	}[]
}

const config = {
	users: {
		label: 'Users',
		color: 'var(--chart-4)',
	},
} satisfies ChartConfig

const UserChart: FC<UserChartPropsType> = ({ data }) => (
	<ChartContainer
		className="ring"
		config={config}
	>
		<LineChart data={data}>
			<CartesianGrid
				stroke="var(--ring)"
				strokeDasharray="3 3"
			/>

			<XAxis
				dataKey="date"
				strokeDasharray="3 3"
				tickFormatter={(value) => value.slice(0, 2)}
			/>

			<ChartTooltip
				content={<ChartTooltipContent hideLabel />}
				cursor={false}
			/>
			<Line
				dataKey="users"
				dot={false}
				stroke="var(--chart-4)"
				strokeWidth={2}
				type="natural"
			/>
		</LineChart>
	</ChartContainer>
)

export type { UserChartPropsType }

export { UserChart }
