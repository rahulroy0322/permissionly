import { Clock, Eye, Layout } from 'lucide-react'
import type { FC } from 'react'
import type { PostWithUserType } from 'schema/post'
import { PostStatCard } from '#/post/stat.card'
import { PostsTable } from '#/post/table'
import Wraper from '#/wraper'

type PostsPagePropsType = {
	posts: PostWithUserType[]
}

const PostsPage: FC<PostsPagePropsType> = ({ posts }) => (
	<Wraper className="py-4 ">
		<main className="space-y-4">
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
				<PostStatCard
					className="bg-primary/20 text-primary"
					Icon={Layout}
					label="POBLISHED POSTS"
					value={4}
				/>
				<PostStatCard
					className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600"
					Icon={Eye}
					label="TOTAL VIEWS"
					value={'12.4k'}
				/>
				<PostStatCard
					className="bg-amber-100 dark:bg-amber-500/20 text-amber-600"
					Icon={Clock}
					label="LAST UPDATED"
					value={'2023-11-01'}
				/>
			</div>

			<PostsTable data={posts} />
		</main>
	</Wraper>
)

export { PostsPage }
