import { z } from 'zod'

const ACTIONS = ['create', 'read', 'update', 'delete'] as const

const actionSchema = z
	.enum(ACTIONS, `Action must be one of ${ACTIONS.join(',')}`)

type ActionSchemaType = z.infer<typeof actionSchema>

export type { ActionSchemaType }

export { ACTIONS, actionSchema }
