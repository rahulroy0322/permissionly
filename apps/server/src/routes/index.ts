import { Router } from 'express'
import authRouter from './auth.route'
import permissionRouter from './permission.route'

const apiRouter = Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/permission', permissionRouter)

export default apiRouter
