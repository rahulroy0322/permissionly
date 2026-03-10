import 'dotenv/config'

import { envSchema } from 'schema/env'
import { formatZodError } from 'schema/utils/zod'

const { success, data, error } = envSchema.safeParse(process.env)

if (!success) {
	console.error('ERROR!: ', formatZodError(error))
	process.exit(1)
}

const ENV = data

const { PORT } = ENV
const isDev = ENV.ENV === 'dev'

const DB_CONFIG = {
	host: ENV.DB_HOST,
	user: ENV.DB_USER,
	password: ENV.DB_PASSWORD,
	database: ENV.DB_DATABASE,
	ssl: ENV.DB_HOST !== 'localhost',
}

export { ENV, PORT, isDev, DB_CONFIG }

export default ENV
