import { timestamp, uuid } from 'drizzle-orm/pg-core'

const defaults = {
	id: uuid('id').primaryKey().defaultRandom(),
	createdAt: timestamp('created_at', {
		mode: 'string',
	})
		.defaultNow()
		.notNull(),
	updatedAt: timestamp('updated_at', {
		mode: 'string',
	})
		.defaultNow()
		.notNull()
		.$onUpdate(() => new Date().toString()),
}

export { defaults }
