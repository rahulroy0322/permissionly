import { Router } from 'express'
import {
	createPostController,
	getAllPostsController,
} from '../controllers/post.controller'
import { authRequired, checkAuth } from '../middlewares/auth.middleware'

const postRouter = Router()

// todo add permission
const withPermission = [checkAuth, authRequired]

// postRouter.get('/permission', getPermissionController)

postRouter
	.route('/')
	.get(withPermission, getAllPostsController)
	.post(withPermission, createPostController)

// postRouter
// 	.route('/:id')
// 	.get(withAdminHostOnly, getPermissionByIDController)
// 	.patch(withAdminHostOnly, updatePermissionByIDController)
// 	.delete(withAdminHostOnly, deletePermissionByIDController)

export default postRouter
