import { Router } from 'express'
import {
	createPermissionController,
	getAllPermissionsController,
} from '../controllers/permission.controller'
import {
	authRequired,
	checkAuth,
	isFromAdmin,
} from '../middlewares/auth.middleware'

const permissionRouter = Router()

permissionRouter
	.route('/')
	.get(checkAuth, authRequired, isFromAdmin, getAllPermissionsController)

	.post(checkAuth, authRequired, isFromAdmin, createPermissionController)

// permissionRouter.post('/login', loginController)

// permissionRouter.get('/me', checkAuth, authRequired, meController)

// permissionRouter.get('/profile', checkAuth, authRequired, meController)

// permissionRouter.get('/token', refreshController)

export default permissionRouter
