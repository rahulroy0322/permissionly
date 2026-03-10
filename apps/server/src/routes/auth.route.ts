import { Router } from 'express'
import {
	loginController,
	meController,
	refreshController,
	registerController,
} from '../controllers/auth.controller'
import { authRequired, checkAuth } from '../middlewares/auth.middleware'

const authRouter: Router = Router()

authRouter.post('/register', registerController)

authRouter.post('/login', loginController)

authRouter.get('/me', checkAuth, authRequired, meController)

authRouter.get('/profile', checkAuth, authRequired, meController)

authRouter.get('/token', refreshController)

export default authRouter
