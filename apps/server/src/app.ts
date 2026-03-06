// import cors from 'cors'

import cors from 'cors'
import express, { type Express, json, type Response, urlencoded } from 'express'
import type { UserType } from 'schema/auth'
import type { PermissionSchemaType } from 'schema/permission'
import ENV from './config/env.config'
import { auth } from './lib/auth.lib'
import { errorMiddleware } from './middlewares/error.middleware'
import { notFoundMiddleware } from './middlewares/not-found.middleware'
import apiRouter from './routes'

const app: Express = express()

app.use(
	cors({
		origin: ENV.FRONTEND_URLS,
	})
)
app.use(json())
app.use(
	urlencoded({
		extended: true,
	})
)

// // req-> info
// app.use(requestInfoMiddleware);

app.use(auth.initialize())

// api routes
app.use('/api/v1', apiRouter)

// middlewares
app.use(notFoundMiddleware)
app.use(errorMiddleware)

export default app

type ResourcesType = {
	user: Partial<UserType> & Pick<UserType, 'id' | 'name' | 'email' | 'role'>
	token: {
		refresh?: string
		access: string
	}
	permission: PermissionSchemaType
}

declare global {
	// biome-ignore lint/style/noNamespace: simplify
	namespace Express {
		interface User extends UserType {}
		interface Response {
			ok: FnType
			created: FnType

			accepted: FnType
			error: ErrFnType
		}
	}
}

type FnType = <Resorce extends keyof ResourcesType>(
	// data: Record<Resorce, ResourcesType[Resorce]> & {
	// 	[key: string]: unknown
	// }
	data: Partial<
		| (Record<Resorce, ResourcesType[Resorce]> & {
				[key: string]: unknown
		  })
		| Record<`${Resorce}s`, []>
	>
) => Response

type ErrFnType = (data: { status: number; error: Error }) => Response

type SuccessType = {
	success: true
	data: Record<string, unknown>
}

type ErrorType<E = Error> = {
	success: false
	error: E
}

type ResType<E = Error> = SuccessType | ErrorType<E>

const jsonify = ({
	status,
	res,
	data,
}: {
	status: number
	res: Response
	data: ResType
}) => res.status(status).json(data)

express.response.ok = function (data) {
	return jsonify({
		status: 200,
		res: this,
		data: {
			success: true,
			data,
		},
	})
}

express.response.created = function (data) {
	return jsonify({
		status: 201,
		res: this,
		data: {
			success: true,
			data,
		},
	})
}

express.response.accepted = function (data) {
	return jsonify({
		status: 202,
		res: this,
		data: {
			success: true,
			data,
		},
	})
}

express.response.error = function ({ status, error }) {
	return jsonify({
		status,
		res: this,
		data: {
			success: false,
			error,
		},
	})
}
