import { Router } from 'express'
import {
	createPermissionController,
	deletePermissionByIDController,
	getAllPermissionsController,
	getPermissionByIDController,
	getPermissionController,
	updatePermissionByIDController,
} from '../controllers/permission.controller'
import {
	authRequired,
	checkAuth,
	isFromAdmin,
} from '../middlewares/auth.middleware'

const permissionRouter: Router = Router()

const withAdminHostOnly = [checkAuth, authRequired, isFromAdmin]

permissionRouter.get('/permission', getPermissionController)

permissionRouter
	.route('/')
	.get(withAdminHostOnly, getAllPermissionsController)
	.post(withAdminHostOnly, createPermissionController)

permissionRouter
	.route('/:id')
	.get(withAdminHostOnly, getPermissionByIDController)
	.patch(withAdminHostOnly, updatePermissionByIDController)
	.delete(withAdminHostOnly, deletePermissionByIDController)

export default permissionRouter
