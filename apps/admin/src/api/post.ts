import type { PostSchemaType, PostWithUserType } from 'schema/post'
import { getWithToken, postWithToken } from './main'

const getPosts = () =>
	getWithToken<{
		posts: PostWithUserType[]
	}>({
		url: 'post',
	})

const createPost = (post: PostSchemaType) =>
	postWithToken({
		url: 'post',
		body: post,
	})


export { getPosts, createPost }
