import type { RequestHandler } from 'express'
import type { AuthenticateCallback } from 'passport'
import { UnAuthenticatedError } from '../error/app.error'
import { auth } from '../lib/auth.lib'

const checkAuth: RequestHandler = (req, res, next): RequestHandler =>
	auth.authenticate(
		'jwt',
		{
			session: false,
		},
		((err, user) => {
			if (err) {
				return next(err)
			}
			req.user = user || undefined
			next()
		}) satisfies AuthenticateCallback
	)(req, res, next)

const authRequired: RequestHandler = async (req, _res, next) => {
	if (!req.user) {
		throw new UnAuthenticatedError('Login to access!')
	}

	next()
}

// const roleRequired = (roles: RoleSchemaType[]) => {
//   return (async (req, _res, next) => {
//     const user = req.user
//     if (!user) {
//       throw new ServerError("some event dosn't handled properly!", {
//         user: 'undefined',
//       })
//     }

//     if (!roles.includes(user.role)) {
//       throw new ForbidenError("You Don't Sufficient permition")
//     }
//     next()
//   }) satisfies RequestHandler
// }

export { checkAuth, authRequired }
