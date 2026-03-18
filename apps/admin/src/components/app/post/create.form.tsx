import { useRouter } from '@tanstack/react-router'
import { PostFrom } from 'forms'
import { type FC, useCallback, useState } from 'react'
import type { PostSchemaType } from 'schema/post'
import { createPost } from 'src/api/post'
import { Button } from 'ui/ui/button'
import { toast } from 'ui/ui/sonner'

const PostCreateFrom: FC = () => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	const handleSubmit = useCallback(
		async (post: PostSchemaType) => {
			try {
				setLoading(true)

				await createPost(post)
				router.navigate({
					to: '/admin/post'
				}
				)
			} catch (e) {
				toast.error((e as Error).message)
			} finally {
				setLoading(false)
			}
		},
		[router]
	)

	return (
		<PostFrom
			Button={Button}
			disabled={loading}
			handleSubmit={handleSubmit}
		/>
	)
}

export { PostCreateFrom }
