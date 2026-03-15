import { Clock, Eye, Layout } from 'lucide-react'
import type { FC } from 'react'
import type { PostWithUserType } from 'schema/post'
import { PostStatCard } from '#/post/stat.card'
import { PostsTable } from '#/post/table'
import Wraper from '#/wraper'

type PostsPagePropsType = {
	posts: PostWithUserType[]
	total: number
	publised: number
	views: number
	lastChanged: string
}

const { format: dateFormat } = Intl.DateTimeFormat(undefined, {
	dateStyle: 'medium',
})

const { format: numFormat } = Intl.NumberFormat(undefined, {
	notation: 'compact',
	maximumFractionDigits: 1,
})

const PostsPage: FC<PostsPagePropsType> = ({
	posts,
	publised,
	total,
	views,
	lastChanged,
}) => (
	<Wraper className="py-4 ">
		<main className="space-y-4">
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
				<PostStatCard
					className="bg-primary/20 text-primary"
					Icon={Layout}
					label="POBLISHED POSTS"
					value={`${publised}/${total}`}
				/>
				<PostStatCard
					className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600"
					Icon={Eye}
					label="TOTAL VIEWS"
					value={numFormat(views)}
				/>
				<PostStatCard
					className="bg-amber-100 dark:bg-amber-500/20 text-amber-600"
					Icon={Clock}
					label="LAST UPDATED"
					value={dateFormat(new Date(lastChanged))}
				/>
			</div>

			<PostsTable data={posts} />
		</main>
	</Wraper>
)

export { PostsPage }
