import { z } from 'zod'
import type { UserType } from './auth.schema'
import type { TodoType } from './todo.schema'

type ResorcessType = {
	user: UserType
	todo: TodoType
}

const resorces = ['user', 'todo'] as const satisfies (keyof ResorcessType)[]

const resorcessSchema = z.enum(
	resorces,
	`Resorce must be one of ${resorces.join(',')}`
)

type ResorceSchemaType = z.infer<typeof resorcessSchema>

export type { ResorcessType, ResorceSchemaType }

export { resorcessSchema }
