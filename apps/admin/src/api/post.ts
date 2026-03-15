import type { PostWithUserType } from 'schema/post'
import { getWithToken } from './main'

const getPosts = () =>
	getWithToken<{
		posts: PostWithUserType[]
	}>({
		url: 'post',
	})

export { getPosts }
