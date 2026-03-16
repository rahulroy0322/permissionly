import type { FC } from 'react'
import type { ActivityWithUserType } from 'src/types'
import { Card, CardContent, CardHeader, CardTitle } from 'ui/ui/card'
import { Activities } from '@/activity/main'
import { UserChart, type UserChartPropsType } from './user.chart'

type LeftUserPropsType = Pick<UserChartPropsType, 'data'>

const LeftUser: FC<LeftUserPropsType> = ({ data }) => (
	<Card>
		<CardHeader>
			<CardTitle className="flex items-center justify-between">
				<div className="space-y-1">
					<h3 className="font-bold text-lg">User Acquisition</h3>
					<h4 className="font-medium text-muted-foreground">
						Net growth performance over the last 30 days.
					</h4>
				</div>
				<div className="flex items-center gap-1.5">
					<i className="size-3 block bg-primary" />
					<b>Total Users</b>
				</div>
			</CardTitle>
		</CardHeader>

		<CardContent>
			<UserChart data={data} />
		</CardContent>
	</Card>
)

type LeftPropsType = {
	activities: ActivityWithUserType[]
	data: UserChartPropsType['data']
}

const Left: FC<LeftPropsType> = ({ data, activities }) => (
	<div className="col-span-2">
		<LeftUser data={data} />
		<Activities activities={activities} />
	</div>
)

export type { LeftPropsType }
export { Left }
