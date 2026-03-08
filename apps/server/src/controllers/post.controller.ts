import type { RequestHandler } from 'express'
import { postSchema } from 'schema/post'
import { BadError, ServerError, ZodError } from '../error/app.error'
import { createPost, getPost, getPosts } from '../services/post.service'

const createPostController: RequestHandler = async (req, res) => {
	if (!req.user) {
		throw new ServerError("some event dosn't handled properly!")
	}

	const { success, data, error } = postSchema.safeParse(req.body || {})

	if (!success) {
		throw new ZodError(error)
	}

	const [existsPost = null] = await getPost(data)

	if (existsPost) {
		if (existsPost.slug === data.slug) {
			throw new BadError('Post with slug Already Exists!')
		}
		if (existsPost.title === data.title) {
			throw new BadError('Post with title Already Exists!')
		}
		// * FALLBACK
		throw new BadError('Post Already Exists!')
	}

	const [post = null] = await createPost({
		...data,
		userId: req.user.id,
	})

	if (!post) {
		throw new ServerError()
	}

	res.created({
		post,
	})
}

const getAllPostsController: RequestHandler = async (req, res) => {
	if (!req.user) {
		throw new ServerError("some event dosn't handled properly!")
	}

	const posts = await getPosts({
		withAuthor: true,
		withTime: true,
	})

	res.ok({
		posts,
	})
}

// const getPermissionByIDController: RequestHandler<{
// 	id: string
// }> = async (req, res) => {
// 	if (!req.user) {
// 		throw new ServerError("some event dosn't handled properly!")
// 	}

// 	const { id } = req.params

// 	const [permission = null] = await getPermissionByID(id)

// 	res.ok({
// 		permission: permission as PermissionSchemaType,
// 	})
// }

// const getPermissionController: RequestHandler = async (req, res) => {
// 	const { success, data, error } = queryPermissionSchema.safeParse(
// 		req.query || {}
// 	)

// 	if (!success) {
// 		throw new ZodError(error)
// 	}

// 	const [permission = null] = await getPermission(data)

// 	res.ok({
// 		permission: permission as PermissionSchemaType,
// 	})
// }

// const updatePermissionByIDController: RequestHandler<{
// 	id: string
// }> = async (req, res) => {
// 	if (!req.user) {
// 		throw new ServerError("some event dosn't handled properly!")
// 	}

// 	const { success, data, error } = permissionUpdateSchema.safeParse(
// 		req.body || {}
// 	)

// 	if (!success) {
// 		throw new ZodError(error)
// 	}

// 	if (isEmpty(data, ['action', 'resorce', 'role', 'value'])) {
// 		throw new BadError('Invalid credentials provided!')
// 	}

// 	const { id } = req.params

// 	const dataAfterRemoved = Object.entries(data).reduce((acc, [key, value]) => {
// 		if (value != null) {
// 			// @ts-expect-error
// 			acc[key] = value
// 		}

// 		return acc
// 	}, {} as PermissionSchemaType)

// 	const [permission = null] = await updatePermissionByID(id, dataAfterRemoved)

// 	res.ok({
// 		permission: permission as PermissionSchemaType,
// 	})
// }

// const deletePermissionByIDController: RequestHandler<{
// 	id: string
// }> = async (req, res) => {
// 	if (!req.user) {
// 		throw new ServerError("some event dosn't handled properly!")
// 	}

// 	const { id } = req.params

// 	const [permission = null] = await deletePermissionByID(id)

// 	if (!permission) {
// 		throw new ForbidenError()
// 	}

// 	res.ok({
// 		message: 'permission deleted successfully',
// 	})
// }

export { createPostController, getAllPostsController }
