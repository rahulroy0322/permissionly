import { createFileRoute } from '@tanstack/react-router'
import type { FC } from 'react'
import type { TodoWithSubAndUserType } from 'schema/todo'
import { TodosPage } from 'src/components/pages/todos.page'

const todos: TodoWithSubAndUserType[] = [
	{
		id: '1',
		title: 'Design System Architecture',
		desc: 'Create the core data models and relationships',
		completed: false,
		todos: [
			{
				id: '3',
				title: 'Define User Types',
				desc: null,
				completed: false,
				user: {
					id: '1',
					email: '',
					name: 'Alex Rivera',
				},
				userId: '1',
				invitedUsers: [],
			},
			{
				id: '4',
				title: 'Setup UI Components',
				desc: null,
				completed: false,
				user: {
					id: '2',
					email: '',
					name: 'Sarah Chen',
				},
				userId: '2',
				invitedUsers: [],
			},
		],
		user: {
			id: '1',
			email: '',
			name: 'Alex Rivera',
		},
		userId: '1',
		invitedUsers: ['2'],
	},
	{
		id: '2',
		title: 'Implement Auth Flow',
		desc: 'JWT based authentication with refresh tokens.',
		completed: false,
		todos: [],
		user: {
			id: '3',
			email: '',
			name: 'Mike Johnson',
		},
		userId: '3',
		invitedUsers: [],
	},
]

const TodosRoute: FC = () => {
	return (
		<TodosPage
			todos={todos}
			// {...meta}
		/>
	)
}

const Route = createFileRoute('/admin/todo')({
	component: TodosRoute,
})

export { Route }
