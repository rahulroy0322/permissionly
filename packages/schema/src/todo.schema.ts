import { z } from 'zod'
import type { UserType } from './auth.schema'
import type { Prettify } from './utils/types'

const todoSchema = z.object({
	title: z.string('Title is required').min(1, 'Title is required'),
	completed: z.boolean().default(false),
	invitedUsers: z.array(z.string()).default([]),
	desc: z.string().optional().nullable().default(null),
})

type TodoSchemaType = z.infer<typeof todoSchema>

type TodoType = Prettify<
	TodoSchemaType & {
		id: string
		userId: string
	}
>

type _UserType = Pick<UserType, 'name' | 'email' | 'id'>

type TodoWithSubAndUserType = TodoType & {
	todos: (TodoType & { user: _UserType })[]
	user: _UserType
}

export type { TodoSchemaType, TodoType, TodoWithSubAndUserType }

export type { todoSchema }
