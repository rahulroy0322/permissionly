import { createFileRoute } from '@tanstack/react-router'
import type { FC } from 'react'
import { DashboardPage } from 'src/components/pages/dashboard.page'
import type { ActivityWithUserType } from 'src/types'
import type { UserChartPropsType } from '#/dashboard/user.chart'

const activities = [
	{
		id: '1',
		action: 'create',
		text: 'User1',
		userId: '1',
		user: { id: '1', name: 'Admin' }, // time: '2 mins ago'
	},
	{
		id: '2',
		action: 'update',
		text: 'Project X',
		userId: '2',
		user: { id: '2', name: 'John Doe' }, // time: '2 mins ago'
	},
	{
		id: '3',
		action: 'create',
		text: 'Q3 Growth...',
		userId: '3',
		user: { id: '3', name: 'Sarah Smith' }, // time: '2 mins ago'
	},
	{
		id: '4',
		action: 'create',
		text: 'Prod-Dashboard',
		userId: '4',
		user: { id: '4', name: 'System' }, // time: '2 mins ago'
	},
	{
		id: '5',
		action: 'update',
		text: 'Harvey S.',
		userId: '5',
		user: { id: '5', name: 'Mike Ross' }, // time: '2 mins ago'
	},
	{
		id: '5',
		action: 'delete',
		text: 'User 1',
		userId: '3',
		user: { id: '3', name: 'Sarah Smith' }, // time: '2 mins ago'
	},
] satisfies ActivityWithUserType[]

const data = [
	{ date: '01-02-2026', users: 10 },
	{ date: '02-02-2026', users: 15 },
	{ date: '03-02-2026', users: 25 },
	{ date: '04-02-2026', users: 15 },
	{ date: '05-02-2026', users: 15 },
	{ date: '06-02-2026', users: 15 },
	{ date: '07-02-2026', users: 15 },
] satisfies UserChartPropsType['data']

const DashboardRoute: FC = () => {
	return (
		<DashboardPage
			activities={activities}
			data={data}
		/>
	)
}

const Route = createFileRoute('/admin/dashboard')({
	component: DashboardRoute,
})

export { Route }
