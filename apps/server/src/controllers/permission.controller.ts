import type { RequestHandler } from 'express'
import {
	type PermissionSchemaType,
	permissionSchema,
	permissionUpdateSchema,
} from 'schema/permission'
import {
	BadError,
	NotFoundError,
	ServerError,
	ZodError,
} from '../error/app.error'
import {
	createPermission,
	getPermission,
	getPermissionByID,
	getPermissions,
	updatePermissionByID,
} from '../services/permission.service'

const isEmpty = <T extends Record<string, unknown>>(
	data: T,
	keys: (keyof T)[]
) => keys.every((key) => data[key] == null)

// 	if (!data.action && !data.resorce && !data.role && !data.role) {
// 	throw new BadError('Invalid credentials provided!')
// }

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

	res.ok({
		permissions,
	})
}

const getPermissionByIDController: RequestHandler<{
	id: string
}> = async (req, res) => {
	if (!req.user) {
		throw new ServerError("some event dosn't handled properly!")
	}

	const { id } = req.params

	const [permission = null] = await getPermissionByID(id)

	res.ok({
		permission: permission as PermissionSchemaType,
	})
}

const updatePermissionByIDController: RequestHandler<{
	id: string
}> = async (req, res) => {
	if (!req.user) {
		throw new ServerError("some event dosn't handled properly!")
	}

	const { success, data, error } = permissionUpdateSchema
		.exactOptional()
		.safeParse(req.body || {})

	if (!success) {
		throw new ZodError(error)
	}

	if (isEmpty(data, ['action', 'resorce', 'role', 'value'])) {
		throw new BadError('Invalid credentials provided!')
	}

	const { id } = req.params

	const dataAfterRemoved = Object.entries(data).reduce((acc, [key, value]) => {
		if (value != null) {
			// @ts-expect-error
			acc[key] = value
		}

		return acc
	}, {} as PermissionSchemaType)

	const [permission = null] = await updatePermissionByID(id, dataAfterRemoved)

	if (!permission) {
		throw new NotFoundError(undefined, {
			context: 'updatePermissionByIDController',
			user: req.user,
			id,
			permission,
		})
	}

	// todo
	res.ok({
		permission,
	})
}

export {
	createPermissionController,
	getAllPermissionsController,
	getPermissionByIDController,
	updatePermissionByIDController,
}
