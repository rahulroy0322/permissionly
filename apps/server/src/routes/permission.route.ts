import { Router } from 'express'
import {
	createPermissionController,
	getAllPermissionsController,
	getPermissionByIDController,
	updatePermissionByIDController,
} from '../controllers/permission.controller'
import {
	authRequired,
	checkAuth,
	isFromAdmin,
} from '../middlewares/auth.middleware'

const permissionRouter = Router()

const withAdminHostOnly = [checkAuth, authRequired, isFromAdmin]

permissionRouter
	.route('/')
	.get(withAdminHostOnly, getAllPermissionsController)

	.post(withAdminHostOnly, createPermissionController)

permissionRouter
	.route('/:id')
	.get(withAdminHostOnly, getPermissionByIDController)
	.patch(withAdminHostOnly, updatePermissionByIDController)

export default permissionRouter
