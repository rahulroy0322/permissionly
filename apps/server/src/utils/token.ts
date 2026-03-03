import jwt, { type SignOptions } from 'jsonwebtoken'
import type { UserType } from 'schema/auth'
import { ENV } from '../config/env.config'

type RefreshTokenType = Pick<UserType, 'id'>
// {
//     id: string
//     // device: string // for extra security
// }

type AccessTokenType = Pick<UserType, 'id' | 'name' | 'email' | 'role'>

type TokenType = AccessTokenType | RefreshTokenType

const signToken = (data: TokenType, options: SignOptions) =>
	jwt.sign(data, ENV.JWT_SECRET, options)

const verifyToken = <T extends TokenType>(data: string) =>
	jwt.verify(data, ENV.JWT_SECRET) as T & {
		iat: number
		exp: number
	}

const signAccessToken = (data: AccessTokenType) =>
	signToken(data, {
		expiresIn: '15m',
	})

const signRefreshToken = (data: RefreshTokenType) =>
	signToken(data, {
		expiresIn: '7 day',
	})

export type { TokenType }

export { signAccessToken, signRefreshToken, verifyToken }
