'use no memo'
import { flexRender, type Table as ReactTable } from '@tanstack/react-table'
import type { ReactNode } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

type DataTablePropsType<T extends Record<string, unknown>> = {
	table: ReactTable<T>
}

const DataTable = <T extends Record<string, unknown>>({
	table,
}: DataTablePropsType<T>): ReactNode => (
	<Table>
		<TableHeader className="sticky top-0 left-0 z-50 bg-background">
			{table.getHeaderGroups().map((header) => (
				<TableRow key={header.id}>
					{header.headers.map((head) => (
						<TableHead
							colSpan={head.colSpan}
							key={head.id}
						>
							{head.isPlaceholder
								? null
								: flexRender(head.column.columnDef.header, head.getContext())}
						</TableHead>
					))}
				</TableRow>
			))}
		</TableHeader>
		<TableBody>
			{table.getRowModel().rows.map((row) => (
				<TableRow key={row.id}>
					{row.getVisibleCells().map((cell) => (
						<TableCell key={cell.id}>
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						</TableCell>
					))}
				</TableRow>
			))}
		</TableBody>
	</Table>
)

export { DataTable }
