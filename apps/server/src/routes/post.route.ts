import { Router } from 'express'
import {
	createPostController,
	getAllPostsController,
	getPostBySLUGController,
	updatePermissionBySLUGController,
} from '../controllers/post.controller'
import { authRequired, checkAuth } from '../middlewares/auth.middleware'

const postRouter = Router()

// todo add permission
const withPermission = [checkAuth, authRequired]

// postRouter.get('/permission', getPermissionController)

postRouter
	.route('/')
	.get(getAllPostsController)
	.post(withPermission, createPostController)

postRouter
	.route('/:slug')
	.get(getPostBySLUGController)
	.patch(withPermission, updatePermissionBySLUGController)
// 	.delete(withAdminHostOnly, deletePermissionByIDController)

export default postRouter
