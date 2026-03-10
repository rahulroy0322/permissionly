import { Router } from 'express'
import authRouter from './auth.route'
import permissionRouter from './permission.route'
import postRouter from './post.route'

const apiRouter: Router = Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/permission', permissionRouter)
apiRouter.use('/post', postRouter)

export default apiRouter
