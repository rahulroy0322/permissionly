import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import type { FC } from 'react'
import { getPosts } from 'src/api/post'
import { PostsPage } from 'src/components/pages/posts.page'
import { AppLoader } from 'ui/app/loader'

const PostsRoute: FC = () => {
	const { posts, meta } = useLoaderData({
		from: '/admin/post/',
	})
	return (
		<PostsPage
			{...meta}
			posts={posts}
		/>
	)
}

const Route = createFileRoute('/admin/post/')({
	component: PostsRoute,
	pendingComponent: AppLoader,
	loader: async () => {
		const { posts } = await getPosts()

		// todo!
		return {
			posts,
			meta: {
				total: 40,
				publised: 36,
				views: 1890,
				lastChanged: new Date().toDateString(),
			},
		}
	},
})

export { Route }
