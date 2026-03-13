import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import type { FC } from 'react'
import type { ActivityWithUserType } from 'src/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ActivityCard } from './activity.card'

type ActivitiesPropsType = {
	activities: ActivityWithUserType[]
}

const Activities: FC<ActivitiesPropsType> = ({ activities }) => (
	<Card>
		<CardHeader>
			<CardTitle className="flex items-center justify-between">
				<div className="space-y-1">
					<h3 className="font-bold text-lg">System Pulse</h3>
					<h4 className="font-medium text-muted-foreground">
						Audit of recent administrative actions.
					</h4>
				</div>

				<Button
					className={'items-center gap-1'}
					nativeButton={false}
					render={<Link to="/" />}
					variant={'link'}
				>
					View Full Logs <ArrowUpRight size={16} />
				</Button>
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-2">
			{activities.map(({ id, user: { name }, action, text }) => (
				<ActivityCard
					action={action}
					key={id}
					name={name}
					text={text}
				/>
			))}
		</CardContent>
	</Card>
)

export { Activities }
