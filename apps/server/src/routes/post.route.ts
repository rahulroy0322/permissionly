import { Router } from 'express'
import {
	createPostController,
	deletePostBySLUGController,
	getAllPostsController,
	getPostBySLUGController,
	updatePostBySLUGController,
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
	.patch(withPermission, updatePostBySLUGController)
	.delete(withPermission, deletePostBySLUGController)

export default postRouter
