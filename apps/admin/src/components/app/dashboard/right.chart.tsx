import { type FC, useMemo } from 'react'
import { Label, Pie, PieChart } from 'recharts'
import type { RoleSchemaType } from 'schema/role'
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from 'ui/ui/chart'

const config = {
	super: {
		label: 'Super User',
		color: 'var(--chart-1)',
	},
	admin: {
		label: 'Admin',
		color: 'var(--chart-2)',
	},
	moderator: {
		label: 'Moderator',
		color: 'var(--chart-3)',
	},
	user: {
		label: 'User',
		color: 'var(--chart-4)',
	},
} satisfies Record<RoleSchemaType, unknown> satisfies ChartConfig

type ChartDataType<Role extends RoleSchemaType> = {
	role: Role
	total: number
	fill: `var(--color-${Role})`
}

type RightChartUIPropsType = {
	data: ChartDataType<RoleSchemaType>[]
	total: number
}

const RightChartUI: FC<RightChartUIPropsType> = ({ data, total }) => (
	<ChartContainer
		className="aspect-square size-48"
		config={config}
	>
		<PieChart>
			<ChartTooltip content={<ChartTooltipContent hideLabel />} />
			<Pie
				data={data}
				dataKey="total"
				innerRadius={60}
				nameKey="role"
				strokeWidth={5}
			>
				<Label
					content={({ viewBox }) => {
						if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
							return (
								<text
									dominantBaseline="middle"
									textAnchor="middle"
									x={viewBox.cx}
									y={viewBox.cy}
								>
									<tspan
										className="fill-foreground text-3xl font-bold"
										x={viewBox.cx}
										y={viewBox.cy}
									>
										{total.toLocaleString()}
									</tspan>
									<tspan
										className="fill-muted-foreground"
										x={viewBox.cx}
										y={(viewBox.cy || 0) + 24}
									>
										Users
									</tspan>
								</text>
							)
						}
					}}
				/>
			</Pie>
		</PieChart>
	</ChartContainer>
)

type RightChartPropsType = Record<RoleSchemaType, number> & {
	total: number
}

const RightChart: FC<RightChartPropsType> = ({
	total,
	super: superUser,
	admin,
	moderator,
	user,
}) => {
	const data = useMemo((): ChartDataType<RoleSchemaType>[] => {
		const data: ChartDataType<RoleSchemaType>[] = []

		data.push({
			role: 'super',
			total: superUser,
			fill: 'var(--color-super)',
		})

		data.push({
			role: 'admin',
			total: admin,
			fill: 'var(--color-admin)',
		})

		data.push({
			role: 'moderator',
			total: moderator,
			fill: 'var(--color-moderator)',
		})

		data.push({
			role: 'user',
			total: user,
			fill: 'var(--color-user)',
		})

		return data
	}, [admin, moderator, superUser, user])

	return (
		<RightChartUI
			data={data}
			total={total}
		/>
	)
}

export type { RightChartPropsType }

export { RightChart }
