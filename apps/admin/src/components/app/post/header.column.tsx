import { Link } from '@tanstack/react-router'
import { Edit2, LinkIcon, Trash2 } from 'lucide-react'
import type { PostWithUserType } from 'schema/post'
import {
	type ColumnDef,
	DataTableColumnHeader,
} from '@/components/app/data-table'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

type PostKeyType = keyof PostWithUserType

const columns: ColumnDef<PostWithUserType>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<div className="flex items-center justify-center">
				<Checkbox
					aria-label="Select all"
					checked={
						table.getIsSomePageRowsSelected() ||
						table.getIsAllPageRowsSelected()
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				/>
			</div>
		),
		cell: ({ row }) => (
			<div className="flex items-center justify-center">
				<Checkbox
					aria-label="Select row"
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
				/>
			</div>
		),
		enableSorting: false,
		enableHiding: false,
	},

	{
		accessorKey: 'title' satisfies PostKeyType,
		header: ({ column }) => (
			<DataTableColumnHeader
				className="max-w-90"
				column={column}
				title="IDENTITY"
			/>
		),
		cell: ({
			row: {
				original: { title },
			},
		}) => (
			<div
				className="max-w-90"
				title={title}
			>
				<h2 className="line-clamp-1 text-ellipsis font-bold leading-tight w-full">
					{title}
				</h2>
			</div>
		),
		enableSorting: true,
		enableHiding: true,
	},

	{
		accessorKey: 'slug' satisfies PostKeyType,
		header: ({ column }) => (
			<DataTableColumnHeader
				className="max-w-50"
				column={column}
				title="SLUG"
			/>
		),
		cell: ({
			row: {
				original: { slug },
			},
		}) => (
			<div
				className="max-w-50"
				title={slug}
			>
				<Link
					className="flex items-center gap-1"
					to="/admin/post"
				>
					<LinkIcon
						className="size-3"
						size={10}
					/>{' '}
					{slug}
				</Link>
			</div>
		),
		enableSorting: true,
		enableHiding: true,
	},

	{
		accessorKey: 'desc' satisfies PostKeyType,
		header: ({ column }) => (
			<DataTableColumnHeader
				className="max-w-60"
				column={column}
				title="SUMMARY"
			/>
		),
		cell: ({
			row: {
				original: { desc },
			},
		}) => (
			<div
				className="max-w-60"
				title={desc}
			>
				<h3 className="line-clamp-2 leading-relaxed text-muted-foreground">
					{desc}
				</h3>
			</div>
		),
		enableSorting: true,
		enableHiding: true,
	},

	{
		accessorKey: 'userId' satisfies PostKeyType,
		header: ({ column }) => (
			<DataTableColumnHeader
				className="max-w-30"
				column={column}
				title="AUTHOR"
			/>
		),
		cell: ({
			row: {
				original: {
					author: { name },
				},
			},
		}) => (
			<div
				className="max-w-30"
				title={name}
			>
				{name}
			</div>
		),
		enableSorting: true,
		enableHiding: true,
	},

	{
		id: 'actions',
		header: ({ column }) => (
			<DataTableColumnHeader
				className="text-right"
				column={column}
				title="ACTIONS"
			/>
		),
		maxSize: 2,
		cell: () => (
			<div className="flex items-center justify-end">
				<Button
					size={'icon-sm'}
					variant={'ghost'}
				>
					<Edit2 size={16} />
				</Button>

				<Button
					size={'icon-sm'}
					variant={'destructive'}
				>
					<Trash2 size={16} />
				</Button>
			</div>
		),
	},
]

export { columns }
