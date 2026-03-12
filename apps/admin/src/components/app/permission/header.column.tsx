import { Edit2, Trash2 } from 'lucide-react'
import type { PermissionSchemaType } from 'schema/permission'
import { UserIcon } from '#/permission/user.icon'
import {
	type ColumnDef,
	DataTableColumnHeader,
} from '@/components/app/data-table'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ActionIcon } from './action.badge'
import { ResourceIcon } from './resource.icon'
import { StateIcon } from './state.badge'

type PermissionKeyType = keyof PermissionSchemaType

const columns: ColumnDef<PermissionSchemaType>[] = [
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
		accessorKey: 'role' satisfies PermissionKeyType,
		header: ({ column }) => (
			<DataTableColumnHeader
				className="max-w-30"
				column={column}
				title="IDENTITY"
			/>
		),
		cell: ({
			row: {
				original: { role },
			},
		}) => (
			<div
				className="flex items-center justify-center max-w-30"
				title={role}
			>
				<UserIcon role={role} />
			</div>
		),
		enableSorting: true,
		enableHiding: true,
	},

	{
		accessorKey: 'resorce' satisfies PermissionKeyType,
		header: ({ column }) => (
			<DataTableColumnHeader
				className="max-w-30"
				column={column}
				title="RESOURCE"
			/>
		),
		cell: ({
			row: {
				original: { resorce },
			},
		}) => (
			<div
				className="flex items-center justify-center max-w-30"
				title={resorce || ''}
			>
				<ResourceIcon resorce={resorce} />
			</div>
		),
		enableSorting: true,
		enableHiding: true,
	},

	{
		accessorKey: 'action' satisfies PermissionKeyType,
		header: ({ column }) => (
			<DataTableColumnHeader
				className="max-w-30"
				column={column}
				title="ACTION"
			/>
		),
		cell: ({
			row: {
				original: { action },
			},
		}) => (
			<div
				className="flex items-center justify-center max-w-30"
				title={action || ''}
			>
				<ActionIcon action={action} />
			</div>
		),
		enableSorting: true,
		enableHiding: true,
	},

	{
		id: 'state',
		header: ({ column }) => (
			<DataTableColumnHeader
				className="max-w-30"
				column={column}
				title="PERMISSION STATE"
			/>
		),
		cell: ({
			row: {
				original: { value },
			},
		}) => (
			<div className="flex items-center justify-center max-w-30">
				<StateIcon value={value} />
			</div>
		),
		enableSorting: false,
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
