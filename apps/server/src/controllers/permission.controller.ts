import type { RequestHandler } from 'express'
import { type PermissionSchemaType, permissionSchema } from 'schema/permission'
import { BadError, ServerError, ZodError } from '../error/app.error'
import {
	createPermission,
	getPermission,
	getPermissions,
} from '../services/permission.service'

const createPermissionController: RequestHandler = async (req, res) => {
	if (!req.user) {
		throw new ServerError("some event dosn't handled properly!")
	}

	const { success, data, error } = permissionSchema.safeParse(req.body || {})

	if (!success) {
		throw new ZodError(error)
	}

	const [existsPermission = null] = await getPermission(data)

	if (existsPermission) {
		throw new BadError('Permission Already Exists!')
	}

	const [permission = null] = await createPermission(data)

	if (!permission) {
		throw new ServerError()
	}

	res.created({
		permission: permission as PermissionSchemaType,
	})
}

const getAllPermissionsController: RequestHandler = async (req, res) => {
	if (!req.user) {
		throw new ServerError("some event dosn't handled properly!")
	}

	const permissions = await getPermissions()

	res.created({
		permissions,
	})
}

export { createPermissionController, getAllPermissionsController }
