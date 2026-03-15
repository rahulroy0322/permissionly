import {
	createContext,
	type FC,
	type ReactNode,
	use,
	useCallback,
	useState,
} from 'react'
import type { LoginSchemaType, RegisterSchemaType, UserType } from 'schema/auth'

type SuccessType<T> = {
	success: true
	data: T
}

type ErrorType<E = Error> = {
	success: false
	error: E
}

type ResType<T> = SuccessType<T> | ErrorType<Error>

type AuthContentType = {
	user: UserType | null
	loading: boolean
	error: Error | null
	login: (body: LoginSchemaType) => void
	register: (body: RegisterSchemaType) => void
}

const AuthContext = createContext<AuthContentType | null>(null)

type AuthProviderPropsType = {
	children: ReactNode
	base: string
	refreshKey?: string
	accessKey?: string
}

const AuthProvider: FC<AuthProviderPropsType> = ({
	base,
	refreshKey = 'auth-refresh-key',
	accessKey = 'auth-access-key',
	...props
}) => {
	const [user, setUser] = useState<AuthContentType['user']>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<Error | null>(null)

	const req = useCallback(
		async ({
			url,
			method,
			body,
		}: {
			url: string
			method: 'POST'
			body: Record<string, unknown>
		}) => {
			try {
				setError(null)
				setLoading(true)
				const res = await fetch(`${base}/api/v1/auth/${url}`, {
					method,
					body: body ? JSON.stringify(body) : undefined,
					headers: {
						'content-type': 'application/json',
					},
				})

				const data = (await res.json()) as ResType<{
					user?: UserType
					token?: {
						refresh?: string
						access: string
					}
				}>

				if (!data.success) {
					throw new Error(data.error.message)
				}
				const {
					data: { token: { refresh, access } = {}, user },
				} = data

				if (refresh) {
					localStorage.setItem(refreshKey, refresh)
				}
				if (access) {
					localStorage.setItem(accessKey, access)
				}

				if (user) {
					setUser(user)
				}
			} catch (e) {
				setError(e as Error)
			} finally {
				setLoading(false)
			}
		},
		[accessKey, base, refreshKey]
	)

	const login = useCallback(
		(body: LoginSchemaType) =>
			req({
				url: 'login',
				body,
				method: 'POST',
			}),
		[req]
	)

	const register = useCallback(
		(body: RegisterSchemaType) =>
			req({
				url: 'register',
				body,
				method: 'POST',
			}),
		[req]
	)
	return (
		<AuthContext
			{...props}
			value={{
				user,
				loading,
				error,
				login,
				register,
			}}
		/>
	)
}

const useAuth = () => {
	const context = use(AuthContext)

	if (!context) {
		throw new Error(`"useAuth" should be wraped inside <AuthProvider>`)
	}

	return context
}

export { AuthProvider, useAuth }
