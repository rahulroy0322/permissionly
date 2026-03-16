import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import type { FC } from 'react'
import { getPosts } from 'src/api/post'
import { PostsPage } from 'src/components/pages/posts.page'
import { AppLoader } from 'ui/app/loader'

// TODO!

/* 
const _posts: PostWithUserType[] = [
	{
		slug: 'mastering-rbac-systems',
		title: 'Mastering RBAC Systems',
		desc: 'A deep dive into Role-Based Access Control.',
		content: 'Full article content here...',
		userId: '1',
		user: {
			id: '1',
			name: 'Alex Rivera',
			email: '',
		},
	},
	{
		slug: 'future-of-ai-uis',
		title: 'The Future of AI Interfaces',
		desc: 'How generative AI is changing how we build.',
		content: 'Exploring the new frontier...',
		userId: '2',
		user: {
			id: '2',
			name: 'Sarah Chen',
			email: '',
		},
	},
	{
		slug: 'modern-state-management',
		title: 'Modern State Management',
		desc: 'Why simple state is often better than complex stores.',
		content: 'Full article content here...',
		userId: '3',
		user: {
			id: '3',
			name: 'Mike Johnson',
			email: '',
		},
	},
]
*/
const PostsRoute: FC = () => {
	const { posts, meta } = useLoaderData({
		from: '/admin/post',
	})
	return (
		<PostsPage
			{...meta}
			posts={posts}
		/>
	)
}

const Route = createFileRoute('/admin/post')({
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
