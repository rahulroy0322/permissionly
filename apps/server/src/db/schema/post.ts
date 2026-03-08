import { pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core'
import { times } from './helper'
import { User } from './user'

const Post = pgTable('posts', {
	title: varchar().unique().notNull(),
	slug: varchar().primaryKey(),
	content: text().notNull(),
	desc: varchar({
		length: 125,
	}).notNull(),

	userId: uuid()
		.references(() => User.id)
		.notNull(),

	...times,
})

// type _PermissionType = typeof Post.$inferSelect

// // just for ts check
// const _Permission: _PermissionType = {
// 	id: '',
// 	email: '',
// 	name: '',
// 	pass: '',
// 	role: 'user',
// 	createdAt: '',
// 	updatedAt: '',
// } satisfies UserType

export { Post }
