import { z } from 'zod'

const ROLES = ['super', 'admin', 'moderator', 'user'] as const

const roleSchema = z
	.enum(ROLES, `Role must be one of ${ROLES.join(',')}`)
	.default('user')

type RoleSchemaType = z.infer<typeof roleSchema>

export type { RoleSchemaType }

export { roleSchema, ROLES }
