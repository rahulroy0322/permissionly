import { z } from 'zod'
import type { UserType } from './auth.schema'
import type { PostSchemaType } from './post.schema'
import type { TodoType } from './todo.schema'

type ResorcessType = {
	user: UserType
	todo: TodoType
	post: PostSchemaType
}

const resorces = [
	'user',
	'todo',
	'post',
] as const satisfies (keyof ResorcessType)[]

const resorcessSchema = z.enum(
	resorces,
	`Resorce must be one of ${resorces.join(',')}`
)

type ResorceSchemaType = z.infer<typeof resorcessSchema>

export type { ResorcessType, ResorceSchemaType }

export { resorcessSchema }
