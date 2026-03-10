import { z } from 'zod'
import type { UserType } from './auth.schema'
import type { TodoType } from './todo.schema'

// * here
type AttrsType = TodoType

const operatorSchema = z.enum([
	'eq',
	'neq',

	'includes',
	'notIncludes',

	'gt',
	'gte',

	'lt',
	'lte',

	'in',
	'notIn',
])

const refSchema = z.custom<ConditionRefType>(
	(val) => typeof val === 'string' && val.includes('.')
)

const leafSchema = z.discriminatedUnion('op', [
	z.object({
		type: z.literal('leaf'),
		ref: refSchema,
		op: z.literal('check'),
	}),
	z.object({
		type: z.literal('leaf'),
		ref: refSchema,
		op: operatorSchema,
		value: z.union([refSchema, z.string(), z.number(), z.boolean()]),
	}),
])

const conditionSchema: z.ZodType<LeafType | NotType | AndType | OrType> =
	z.lazy(() =>
		z.discriminatedUnion(
			'type',
			[
				leafSchema,
				// not schema
				z.object({
					type: z.literal('not'),
					leaf: conditionSchema,
				}),
				// and schema
				z.object({
					type: z.literal('and'),
					leafs: z.array(conditionSchema),
				}),
				// or schema
				z.object({
					type: z.literal('or'),
					leafs: z.array(conditionSchema),
				}),
			],
			{
				error: 'Please provide a valid condition',
			}
		)
	)

type ConditionRefType =
	| `user.${keyof UserType}`
	| `attr.${keyof AttrsType}`
	| (`${string}.${string}` & {})

type LeafType = z.infer<typeof leafSchema>

type NotType = {
	type: 'not'
	leaf: ConditionType
}

type AndType = {
	type: 'and'
	leafs: NotType['leaf'][]
}

type OrType = Pick<AndType, 'leafs'> & {
	type: 'or'
}

type ConditionType = z.infer<typeof conditionSchema>

export type { ConditionType, LeafType, NotType, AndType, OrType }

export { conditionSchema }
