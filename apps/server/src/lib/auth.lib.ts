import auth from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import ENV from '../config/env.config'
import { BadError } from '../error/app.error'
import logger from '../logger/pino'
import { getUserByID } from '../services/user.service'
import type { TokenType } from '../utils/token'

// var opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'secret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

auth.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: ENV.JWT_SECRET,
		},
		async (
			{
				id,
				email,
			}: TokenType & {
				email?: string
			},
			done
		) => {
			try {
				if (!email) {
					throw new BadError('wrong token provided!')
				}

				// TODO! check cache
				const user = await getUserByID(id)

				if (!user) {
					return done(null, false, {
						msg: 'user not found',
					})
				}
				done(null, user)
			} catch (e) {
				logger.error(e, 'User not found', { id })
				return done(e, false)
			}
		}
	)
)

export { auth }
