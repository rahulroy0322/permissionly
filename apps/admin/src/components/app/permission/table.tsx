import type { FC } from 'react'
import type { PermissionSchemaType } from 'schema/permission'
import {
	DataTable,
	getCoreRowModel,
	useReactTable,
} from '@/components/app/data-table'
import { columns } from './header.column'

type PermissionsTablePropsType = {
	data: PermissionSchemaType[]
}

const PermissionsTable: FC<PermissionsTablePropsType> = ({ data }) => {
	const table = useReactTable<PermissionSchemaType>({
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

export { PermissionsTable }
