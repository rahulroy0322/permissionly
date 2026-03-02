import { pgTable, varchar } from 'drizzle-orm/pg-core'
import type { UserType } from 'schema/auth'
import { ROLES } from 'schema/role'
import { defaults } from './helper'

const User = pgTable('users', {
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 155 }).notNull().unique(),
	pass: varchar(),
	role: varchar({
		enum: ROLES,
		length: 10,
	})
		.notNull()
		.default('user'),
	...defaults,
})

type _UserType = typeof User.$inferSelect

// just for ts check
const _user: _UserType = {
	id: '',
	email: '',
	name: '',
	pass: '',
	role: 'user',
	createdAt: '',
	updatedAt: '',
} satisfies UserType

export { User }
