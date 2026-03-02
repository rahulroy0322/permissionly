// import cors from 'cors'
import express, { type Express, json, urlencoded } from 'express'

// import type { TokenUserType } from './@types/user'
// import { auth } from './auth/main'
// import ENV from './config/env.config'
// import { errorMiddleware } from './middlewares/error.middleware'
// import { notFoundMiddleware } from './middlewares/not-found.middleware'
// import apiRouter from './routes'

const app: Express = express()

// app.use(
//   cors({
//     origin: ENV.FRONTEND_URLS,
//   })
// )
app.use(json())
app.use(
	urlencoded({
		extended: true,
	})
)

// // req-> info
// app.use(requestInfoMiddleware);

// app.use(auth.initialize())

// api routes
// app.use('/api/v1', apiRouter)

// middlewares
// app.use(notFoundMiddleware)
// app.use(errorMiddleware)

// declare global {
//   namespace Express {
//     interface User extends TokenUserType {}
//   }
// }

export default app
