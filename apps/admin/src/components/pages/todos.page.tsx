import { LayoutTemplate, List, Table } from 'lucide-react'
import type { FC } from 'react'
import type { TodoWithSubAndUserType } from 'schema/todo'
import { BoxLayout } from '#/todo/box.layout'
import { TableLayout } from '#/todo/table.layout'
import Wraper from '#/wraper'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

type TodosPagePropsType = {
	todos: TodoWithSubAndUserType[]
}

const TodosPage: FC<TodosPagePropsType> = ({ todos }) => (
	<Wraper className="py-4 ">
		<main className="space-y-4">
			<div>
				<h1 className="text-3xl font-black tracking-tight">Active Tasks</h1>
				<p className="text-sm text-muted-foreground mt-1">
					Manage your team's objectives and sub-tasks.
				</p>
			</div>
			<Tabs
				className="flex-col w-full ring-1"
				defaultValue="box"
			>
				<TabsList className={'w-full'}>
					<TabsTrigger value="box">
						<Button
							className="bg-transparent! text-inherit"
							render={<LayoutTemplate />}
							size={'icon'}
						/>
					</TabsTrigger>
					<TabsTrigger value="table">
						<Button
							className="bg-transparent! text-inherit"
							render={<Table />}
							size={'icon'}
						/>
					</TabsTrigger>
					<TabsTrigger
						disabled
						value="list"
					>
						<Button
							className="bg-transparent! text-inherit"
							render={<List />}
							size={'icon'}
						/>
					</TabsTrigger>
				</TabsList>
				<BoxLayout todos={todos} />
				<TableLayout todos={todos} />
			</Tabs>
		</main>
	</Wraper>
)

export { TodosPage }
