import { and, eq, isNull, type SQL } from 'drizzle-orm'
import type { PermissionSchemaType } from 'schema/permission'
import { db } from '../db/main'
import { Permission } from '../db/schema/permission'

const checkNull = <T extends typeof Permission>({
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
			role: true,
			value: true,
			action: true,
			resorce: true,
		},
		limit,
	})

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

// const getUserByID = (id: string) =>
// 	db.query.User.findFirst({
// 		where: eq(User.id, id),
// 		columns: {
// 			email: true,
// 			pass: true,
// 			id: true,
// 			role: true,
// 			name: true,
// 		},
// 	})

export { getPermission, createPermission, getPermissions }
