import { z } from 'zod'
import type { Prettify } from './utils/types'

const todoSchema = z.object({
	title: z.string('Title is required').min(1, 'Title is required'),
	completed: z.boolean().default(false),
	invitedUsers: z.array(z.string()).default([]),
})

type TodoSchemaType = z.infer<typeof todoSchema>

type TodoType = Prettify<
	TodoSchemaType & {
		id: string
		userId: string
	}
>

export type { TodoSchemaType, TodoType }

export type { todoSchema }
