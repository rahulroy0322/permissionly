import type { FC } from 'react'
import type { PostWithUserType } from 'schema/post'
import {
	DataTable,
	getCoreRowModel,
	useReactTable,
} from '@/components/app/data-table'
import { columns } from './header.column'

type PermissionsTablePropsType = {
	data: PostWithUserType[]
}

const PostsTable: FC<PermissionsTablePropsType> = ({ data }) => {
	const table = useReactTable<PostWithUserType>({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div className="ring-foreground/10 ring-1">
			<DataTable table={table} />
		</div>
	)
}

export { PostsTable }
