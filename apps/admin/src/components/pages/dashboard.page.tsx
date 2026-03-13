import { ListTodo, MessageSquare, Newspaper, Users } from 'lucide-react'
import type { FC } from 'react'
import { Left, type LeftPropsType } from '#/dashboard/left'
import { Right } from '#/dashboard/right'
import { DashboardStatCard } from '#/dashboard/stat.card'
import Wraper from '#/wraper'

// TODO!
// biome-ignore lint/complexity/noBannedTypes: temp
type StatsPropsType = {}

const Stats: FC<StatsPropsType> = () => (
	<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
		<DashboardStatCard
			change="+12%"
			className="bg-primary/10 text-primary"
			Icon={Users}
			label="Total Users"
			val={'1,284'}
		/>
		<DashboardStatCard
			change="+5%"
			className="text-emerald-600 bg-emerald-500/10"
			Icon={ListTodo}
			label="Active Todos"
			val={432}
		/>
		<DashboardStatCard
			change="+18%"
			className="text-indigo-600 bg-indigo-500/10"
			Icon={Newspaper}
			label="Published Posts"
			val={89}
		/>
		<DashboardStatCard
			change="-2%"
			className="text-rose-600 bg-rose-500/10"
			Icon={MessageSquare}
			label="Total Comments"
			val={'2,103'}
		/>
	</div>
)

type DashboardPagePropsType = LeftPropsType

const DashboardPage: FC<DashboardPagePropsType> = ({ activities, data }) => (
	<Wraper className="py-4 ">
		<main className="space-y-4">
			<Stats />
			<div className="grid grid-cols-1 lg:grid-cols-3 *:space-y-2 space-x-2">
				<Left
					activities={activities}
					data={data}
				/>
				<Right
					admin={3}
					moderator={25}
					super={1}
					total={69}
					user={40}
				/>
			</div>
		</main>
	</Wraper>
)

export { DashboardPage }
