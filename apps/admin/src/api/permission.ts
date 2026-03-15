import type { PermissionSchemaType } from 'schema/permission'
import { getWithToken } from './main'

const getPermission = () =>
	getWithToken<{
		permissions: PermissionSchemaType[]
	}>({
		url: 'permission',
	})

export { getPermission }
