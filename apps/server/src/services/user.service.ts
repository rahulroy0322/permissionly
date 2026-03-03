import { eq } from 'drizzle-orm'
import { db } from '../db/main'
import { User } from '../db/schema/user'

const getUserByEmail = (email: string) =>
	db.query.User.findFirst({
		where: eq(User.email, email),
		columns: {
			email: true,
			pass: true,
			id: true,
			role: true,
			name: true,
		},
	})

const createUser = (user: typeof User.$inferInsert) =>
	db.insert(User).values(user).returning()

const getUserByID = (id: string) =>
	db.query.User.findFirst({
		where: eq(User.id, id),
		columns: {
			email: true,
			pass: true,
			id: true,
			role: true,
			name: true,
		},
	})

export { getUserByEmail, createUser, getUserByID }
