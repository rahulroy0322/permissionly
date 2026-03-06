import { and, eq, isNull, type SQL, type TableConfig } from 'drizzle-orm'
import type { PgTable } from 'drizzle-orm/pg-core'
import type { PermissionSchemaType } from 'schema/permission'
import { db } from '../db/main'
import { Permission } from '../db/schema/permission'

const checkNull = <T extends PgTable<TableConfig>>({
	data,
	key,
	Table,
}: {
	data: null | unknown
	key: keyof T
	Table: T
}) => {
	if (!data) {
		return isNull(
			// @ts-expect-error
			Table[key]
		)
	}
	return eq(
		// @ts-expect-error
		Table[key],
		data
	)
}

const _getPermissions = ({
	filter = undefined,
	limit = undefined,
}: {
	filter?: SQL<unknown>
	limit?: number
}) =>
	db.query.Permission.findMany({
		where: filter,
		columns: {
			id: true,
			role: true,
			value: true,
			action: true,
			resorce: true,
		},
		limit,
	}) as Promise<PermissionSchemaType[]>

const getPermission = ({
	role,
	resorce = null,
	action = null,
}: Partial<Omit<PermissionSchemaType, 'value'>> &
	Pick<PermissionSchemaType, 'role'>) =>
	_getPermissions({
		filter: and(
			eq(Permission.role, role),
			checkNull({
				data: resorce,
				Table: Permission,
				key: 'resorce',
			}),
			checkNull({
				data: action,
				Table: Permission,
				key: 'action',
			})
		),
		limit: 1,
	})

const createPermission = (
	permission: Partial<PermissionSchemaType> &
		Pick<PermissionSchemaType, 'role' | 'value'>
) =>
	db
		.insert(Permission)
		.values(permission as typeof Permission.$inferInsert)
		.returning()

// todo
const getPermissions = () => _getPermissions({})

const getPermissionByID = (id: string) =>
	_getPermissions({
		filter: eq(Permission.id, id),
		limit: 1,
	})

const updatePermissionByID = (
	id: string,
	data: Partial<
		Pick<PermissionSchemaType, 'action' | 'resorce' | 'role' | 'value'>
	>
) =>
	db
		.update(Permission)
		.set(data as typeof Permission.$inferInsert)
		.where(eq(Permission.id, id))
		.returning() as Promise<PermissionSchemaType[]>

export {
	getPermission,
	createPermission,
	getPermissions,
	getPermissionByID,
	updatePermissionByID,
}
