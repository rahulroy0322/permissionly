import type { RequestHandler } from 'express'
import { type PostSchemaType, postSchema, postUpdateSchema } from 'schema/post'
import {
	BadError,
	ForbidenError,
	ServerError,
	ZodError,
} from '../error/app.error'
import {
	createPost,
	deletePostBySLUG,
	getPost,
	getPostBySLUG,
	getPosts,
	updatePostBySLUG,
} from '../services/post.service'
import { isEmpty } from '../utils/empty'

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

const getAllPostsController: RequestHandler = async (_req, res) => {
	const posts = await getPosts({
		withAuthor: true,
		withTime: true,
	})

	res.ok({
		posts,
	})
}

const getPostBySLUGController: RequestHandler<{
	slug: string
}> = async (req, res) => {
	const { slug } = req.params

	const [post = null] = await getPostBySLUG(slug, {
		withPosts: true,
		withContent: true,
		withTime: true,
	})

	res.ok({
		post: post as PostSchemaType,
	})
}

const updatePostBySLUGController: RequestHandler<{
	slug: string
}> = async (req, res) => {
	if (!req.user) {
		throw new ServerError("some event dosn't handled properly!")
	}

	const { success, data, error } = postUpdateSchema.safeParse(req.body || {})

	if (!success) {
		throw new ZodError(error)
	}

	if (isEmpty(data, ['content', 'desc', 'title', 'slug'])) {
		throw new BadError('Invalid credentials provided!')
	}

	const { slug } = req.params

	const dataAfterRemoved = Object.entries(data).reduce((acc, [key, value]) => {
		if (value != null) {
			// @ts-expect-error
			acc[key] = value
		}

		return acc
	}, {} as PostSchemaType)

	const [post = null] = await updatePostBySLUG(slug, dataAfterRemoved)

	res.ok({
		post: post as PostSchemaType,
	})
}

const deletePostBySLUGController: RequestHandler<{
	slug: string
}> = async (req, res) => {
	if (!req.user) {
		throw new ServerError("some event dosn't handled properly!")
	}

	const { slug } = req.params

	const [post = null] = await deletePostBySLUG(slug)

	if (!post) {
		throw new ForbidenError()
	}

	res.ok({
		message: 'post deleted successfully',
	})
}

export {
	createPostController,
	getAllPostsController,
	getPostBySLUGController,
	updatePostBySLUGController,
	deletePostBySLUGController,
}
