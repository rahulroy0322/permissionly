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
	withPosts = false,
}: {
	filter?: SQL<unknown>
	limit?: number
	withContent?: boolean
	withAuthor?: boolean
	withTime?: boolean
	withPosts?: boolean
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

		...(withPosts
			? {
					with: {
						author: {
							columns: {
								id: true,
								name: true,
							},
							with: {
								posts: true,
							},
						},
					},
				}
			: withAuthor
				? {
						with: {
							author: {
								columns: {
									id: true,
									name: true,
								},
							},
						},
					}
				: {}),
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
	'withAuthor' | 'withContent' | 'withTime' | 'withPosts'
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
			'withAuthor' | 'withContent' | 'withTime' | 'withPosts' | 'limit'
		>
	>
) => _getPosts(props)

const getPostBySLUG = (
	slug: string,
	props: Partial<
		Pick<
			Parameters<typeof _getPosts>[0],
			'withAuthor' | 'withContent' | 'withTime' | 'withPosts'
		>
	>
) =>
	_getPosts({
		...props,
		filter: eq(Post.slug, slug),
		limit: 1,
	})

const updatePostBySLUG = (slug: string, data: Partial<PostSchemaType>) =>
	db.update(Post).set(data).where(eq(Post.slug, slug)).returning() as Promise<
		PostSchemaType[]
	>

// const deletePermissionByID = (id: string) =>
// 	db.delete(Permission).where(eq(Permission.id, id)).returning() as Promise<
// 		PermissionSchemaType[]
// 	>

export { getPost, createPost, getPosts, getPostBySLUG, updatePostBySLUG }
