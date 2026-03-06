import type { RequestHandler } from 'express'
import { loginSchema, registerSchema } from 'schema/auth'
import {
	BadError,
	ServerError,
	UnAuthenticatedError,
	ZodError,
} from '../error/app.error'
import {
	createUser,
	getUserByEmail,
	getUserByID,
} from '../services/user.service'
import { hashPassword, validPassword } from '../utils/hash'
import {
	signAccessToken,
	signRefreshToken,
	type TokenType,
	verifyToken,
} from '../utils/token'

const singTokens = ({
	email,
	id,
	name,
	role,
}: Parameters<typeof signAccessToken>[0]): {
	refresh: string
	access: string
} => ({
	refresh: signRefreshToken({
		id,
	}),
	access: signAccessToken({
		id,
		email,
		name,
		role,
	}),
})

const registerController: RequestHandler = async (req, res) => {
	const { success, data, error } = registerSchema.safeParse(req.body || {})

	if (!success) {
		throw new ZodError(error)
	}

	const { password, ..._data } = data

	const existsUser = (await getUserByEmail(_data.email)) ?? null

	if (existsUser) {
		throw new BadError('User Already Exists!')
	}

	const pass = await hashPassword(password)

	const [user] = await createUser({
		..._data,
		pass,
	})

	if (!user) {
		throw new ServerError()
	}

	const { id, name, email, role } = user

	const token = singTokens(user)

	res.created({
		user: {
			id,
			email,
			name,
			role,
		},
		token,
	})
}

const loginController: RequestHandler = async (req, res) => {
	const { success, data, error } = loginSchema.safeParse(req.body || {})

	if (!success) {
		throw new ZodError(error)
	}

	const { password, ..._data } = data

	const user = (await getUserByEmail(_data.email)) ?? null

	if (!user) {
		throw new BadError('Email or Password is invalid!')
	}

	if (!user.pass) {
		// social login
		throw new BadError('invalid mathod of login!')
	}

	if (
		!(await validPassword({
			current: data.password,
			hash: user.pass,
		}))
	) {
		throw new BadError('Email or Password is invalid!')
	}

	const { id, name, email, role } = user

	const token = singTokens(user)

	res.accepted({
		user: {
			id,
			email,
			name,
			role,
		},
		token,
	})
}

const meController: RequestHandler = async (req, res) => {
	if (!req.user) {
		throw new ServerError("some event dosn't handled properly!")
	}

	const { id, email, name, role } = req.user

	res.ok({
		user: {
			id,
			email,
			name,
			role,
		},
	})
}

const refreshController: RequestHandler = async (req, res) => {
	const _token = String(
		req.headers.authorization || req.headers.token || ''
	).split(' ')[1]

	if (!_token) {
		throw new UnAuthenticatedError()
	}

	const { id, email, ...extra } = verifyToken<
		TokenType & {
			email?: string
		}
	>(_token)

	if (email) {
		throw new BadError('wrong token provided!')
	}

	// ! TODO check db for conformation
	const user = await getUserByID(id)

	if (!user) {
		throw new UnAuthenticatedError('Your account had been deleted!')
	}

	const { name, role, email: e } = user

	const token = singTokens({ id, name, email: e, role })

	const expiry = new Date(extra.exp * 1000)

	if (!(expiry <= new Date(Date.now() + 1000 * 60 * 60 * 24 * 2))) {
		// @ts-expect-error
		delete token.refresh
	}

	res.ok({
		token,
	})
}

export { registerController, loginController, meController, refreshController }
