import { createFileRoute, Link } from '@tanstack/react-router'
import type { FC } from 'react'
import { Button } from 'ui/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from 'ui/ui/card'
import { type MenuItemType, menu } from '@/sidebar/main'

const items = menu.reduce((acc, { items }) => {
	acc.push(...items)

	return acc
}, [] as MenuItemType[])

const DashBoardPage: FC = () => (
	<div className="flex items-center justify-center p-2 min-h-full">
		<div className="grid grid-cols-2 gap-6">
			{items.map(({ Icon, title, url }) => (
				<Link
					key={`${title}-${url}`}
					to={url as '/admin'}
				>
					<Card className="min-w-46">
						<CardHeader>
							<Button
								className="m-auto"
								nativeButton={false}
								render={<CardTitle />}
								size={'icon-lg'}
								variant={'outline'}
							>
								{Icon}
							</Button>
						</CardHeader>
						<CardContent>{title}</CardContent>
					</Card>
				</Link>
			))}
		</div>
	</div>
)

const Route = createFileRoute('/admin/')({
	component: DashBoardPage,
})

export { Route }
