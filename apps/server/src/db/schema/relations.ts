import { relations } from 'drizzle-orm'
import { Post } from './post'
import { User } from './user'

const UsersRelations = relations(User, ({ many }) => ({
	posts: many(Post),
}))

const PostsRelations = relations(Post, ({ one }) => ({
	author: one(User, {
		fields: [Post.userId],
		references: [User.id],
	}),
}))

export { UsersRelations, PostsRelations }
