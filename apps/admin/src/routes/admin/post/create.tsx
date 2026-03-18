import { createFileRoute } from '@tanstack/react-router'
import type { FC } from 'react'
import { PostCreateFrom } from '@/post/create.form'

const PostCreatePage: FC = () => {
	return (
		<div className="h-full p-2">
			<PostCreateFrom />
		</div>
	)
}

const Route = createFileRoute('/admin/post/create')({
	component: PostCreatePage,
})

export { Route }
