import { TriangleAlert } from 'lucide-react'
import type { FC } from 'react'
import type { TodoWithSubAndUserType } from 'schema/todo'
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty'
import { TabsContent } from '@/components/ui/tabs'

type TableLayoutPropsType = {
	todos: TodoWithSubAndUserType[]
}

const TableLayout: FC<TableLayoutPropsType> = () => (
	<TabsContent value="table">
		<Empty className="text-amber-600 dark:text-amber-500">
			<EmptyHeader>
				<EmptyMedia>
					<TriangleAlert
						className="size-8"
						size={20}
					/>
				</EmptyMedia>
				<EmptyTitle className="text-2xl font-bold">TODO!</EmptyTitle>
				<EmptyDescription className="text-inherit text-lg font-semibold">
					This is under development
				</EmptyDescription>
			</EmptyHeader>
		</Empty>
	</TabsContent>
)

export { TableLayout }
