import type { PermissionSchemaType } from 'schema/permission'
import { getWithToken, postWithToken } from './main'

const getPermission = () =>
	getWithToken<{
		permissions: PermissionSchemaType[]
	}>({
		url: 'permission',
	})

const createPermission = (permission: PermissionSchemaType) =>
	postWithToken({
		url: 'permission',
		body: permission,
	})

export { getPermission, createPermission }
