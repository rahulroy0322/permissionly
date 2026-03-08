import { eq, or, type SQL } from 'drizzle-orm'
import type { PostSchemaType } from 'schema/post'
import { db } from '../db/main'
import { Post } from '../db/schema/post'

const _getPosts = ({
	filter = undefined,
	limit = undefined,
	withContent = false,
	withAuthor = false,
	withTime = false,
}: {
	filter?: SQL<unknown>
	limit?: number
	withContent?: boolean
	withAuthor?: boolean
	withTime?: boolean
}) =>
	db.query.Post.findMany({
		where: filter,
		columns: {
			slug: true,
			title: true,
			desc: true,
			...(withContent && {
				content: true,
			}),
			...(withTime && {
				createdAt: true,
				updatedAt: true,
			}),
		},
		...(withAuthor && {
			with: {
				author: {
					columns: {
						id: true,
						name: true,
						role: true,
					},
				},
			},
		}),
		limit,
	}) as unknown as Promise<PostSchemaType[]>

const getPost = ({
	slug,
	title,
	withAuthor,
	withContent,
	withTime,
}: Pick<
	Parameters<typeof _getPosts>[0],
	'withAuthor' | 'withContent' | 'withTime'
> &
	Pick<PostSchemaType, 'slug' | 'title'>) =>
	_getPosts({
		filter: or(eq(Post.slug, slug), eq(Post.title, title)),
		withAuthor,
		withContent,
		withTime,
		limit: 1,
	})

const createPost = (
	post: PostSchemaType & {
		userId: string
	}
) => db.insert(Post).values(post).returning()

const getPosts = (
	props: Partial<
		Pick<
			Parameters<typeof _getPosts>[0],
			'withAuthor' | 'withContent' | 'withTime' | 'limit'
		>
	>
) => _getPosts(props)

// const getPermissionByID = (id: string) =>
// 	_getPermissions({
// 		filter: eq(Permission.id, id),
// 		limit: 1,
// 	})

// const updatePermissionByID = (
// 	id: string,
// 	data: Partial<
// 		Pick<PermissionSchemaType, 'action' | 'resorce' | 'role' | 'value'>
// 	>
// ) =>
// 	db
// 		.update(Permission)
// 		.set(data as typeof Permission.$inferInsert)
// 		.where(eq(Permission.id, id))
// 		.returning() as Promise<PermissionSchemaType[]>

// const deletePermissionByID = (id: string) =>
// 	db.delete(Permission).where(eq(Permission.id, id)).returning() as Promise<
// 		PermissionSchemaType[]
// 	>

export { getPost, createPost, getPosts }
