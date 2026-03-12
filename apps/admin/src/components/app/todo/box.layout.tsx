import {
	Calendar,
	CornerDownRight,
	Edit2,
	ListTodo,
	Plus,
	Trash2,
} from 'lucide-react'
import type { FC } from 'react'
import type { TodoWithSubAndUserType } from 'schema/todo'
import { Avatar } from '@/components/app/Avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty'
import { TabsContent } from '@/components/ui/tabs'
import { time } from './utlis'

type TitlePropsType = Pick<TodoWithSubAndUserType, 'completed' | 'title'>

const Title: FC<TitlePropsType> = ({ completed, title }) =>
	completed ? <s>{title}</s> : title

type BoxLayoutPropsType = {
	todos: TodoWithSubAndUserType[]
}

const currenTime = new Date()

type SubTaskPropsType = {
	todo: Omit<TodoWithSubAndUserType, 'todos'>
}

const SubTask: FC<SubTaskPropsType> = ({
	todo: {
		title,
		completed,
		user: { name },
	},
}) => (
	<div className="flex gap-1 ring p-2">
		<CornerDownRight
			className="text-primary/70 dark:text-primary shrink-0"
			size={12}
		/>
		<Card className="ring-0 grow bg-transparent p-0">
			<CardHeader className="p-0">
				<CardTitle>
					<Title
						completed={completed}
						title={title}
					/>
				</CardTitle>
				<div className="flex items-center gap-1 text-sm">
					<Avatar
						alt={name}
						className={'size-5!'}
						size="sm"
						src=""
					/>
					<b className="text-xs">{name}</b>
				</div>
			</CardHeader>
			<CardFooter className="p-0 justify-end">
				<CardAction>
					<Button
						className={'bg-transparent!'}
						size={'icon-xs'}
						variant={'ghost'}
					>
						<Edit2 />
					</Button>
				</CardAction>

				<CardAction>
					<Button
						size={'icon-xs'}
						variant={'destructive'}
					>
						<Trash2 />
					</Button>
				</CardAction>
			</CardFooter>
		</Card>
	</div>
)

type TaskPropsType = {
	todo: TodoWithSubAndUserType
}

const Task: FC<TaskPropsType> = ({
	todo: {
		title,
		desc,
		user: { name },
		todos,
		completed,
	},
}) => (
	<Card>
		<CardHeader>
			<CardTitle>
				<Title
					completed={completed}
					title={title}
				/>
			</CardTitle>
			<CardDescription>{desc}</CardDescription>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1 text-sm">
					<Avatar
						alt={name}
						size="sm"
						src=""
					/>
					<b>{name}</b>
				</div>

				<Badge render={<time dateTime={currenTime.toDateString()} />}>
					<Calendar size={12} />
					{time(currenTime.toString())}
				</Badge>
			</div>
		</CardHeader>
		<CardContent>
			<div className="flex items-center justify-between">
				<h3 className="text-muted-foreground text-sm uppercase font-bold tracking-widest">
					Sub-Tasks ({todos.length})
				</h3>

				<Button
					className={'text-primary'}
					variant={'ghost'}
				>
					<Plus size={12} /> Add
				</Button>
			</div>

			{todos.length ? (
				<div className="space-y-2">
					{todos.map((todo) => (
						<SubTask
							key={todo.id}
							todo={todo}
						/>
					))}
				</div>
			) : (
				<Empty className="p-0">
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<ListTodo size={12} />
						</EmptyMedia>
						<EmptyTitle>No sub-tasks.</EmptyTitle>
						<EmptyDescription> No sub-tasks. Add one above.</EmptyDescription>
					</EmptyHeader>
				</Empty>
			)}
		</CardContent>
		<CardFooter className="justify-end">
			<CardAction>
				<Button
					className={'bg-transparent!'}
					size={'icon'}
					variant={'ghost'}
				>
					<Edit2 />
				</Button>
			</CardAction>

			<CardAction>
				<Button
					size={'icon'}
					variant={'destructive'}
				>
					<Trash2 />
				</Button>
			</CardAction>
		</CardFooter>
	</Card>
)

const BoxLayout: FC<BoxLayoutPropsType> = ({ todos }) => (
	<TabsContent
		className="space-y-2"
		value="box"
	>
		{todos.map((todo) => (
			<Task
				key={todo.id}
				todo={todo}
			/>
		))}
	</TabsContent>
)

export { BoxLayout }
