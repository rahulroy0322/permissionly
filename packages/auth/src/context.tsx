import {
	createContext,
	type FC,
	type ReactNode,
	use,
	useCallback,
	useEffect,
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

const req = async <T extends Record<string, unknown>>({
	url,
	base,
	method,
	// @ts-expect-error
	body,
	headers,
}: {
	base: string
	url: string
	headers?: Record<string, string>
} & (
	| {
			method: 'GET'
	  }
	| {
			method: 'POST'
			body: Record<string, unknown>
	  }
)) => {
	const res = await fetch(`${base}/api/v1/auth/${url}`, {
		method,
		body: body ? JSON.stringify(body) : undefined,
		headers: {
			'content-type': 'application/json',
			...(headers || {}),
		},
	})

	const data = (await res.json()) as ResType<T>

	if (!data.success) {
		throw data.error
	}

	return data.data
}

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

	const login = useCallback(
		async (body: LoginSchemaType) => {
			try {
				setError(null)
				setLoading(true)

				const {
					token: { access, refresh },
					user,
				} = await req<{
					user: UserType
					token: {
						refresh: string
						access: string
					}
				}>({
					base,
					url: 'login',
					body,
					method: 'POST',
				})
				localStorage.setItem(accessKey, access)
				localStorage.setItem(refreshKey, refresh)
				setUser(user)
			} catch (e) {
				setError(e as Error)
			} finally {
				setLoading(false)
			}
		},
		[base, accessKey, refreshKey]
	)

	const register = useCallback(
		async (body: RegisterSchemaType) => {
			try {
				setError(null)
				setLoading(true)

				const {
					token: { access, refresh },
					user,
				} = await req<{
					user: UserType
					token: {
						refresh: string
						access: string
					}
				}>({
					base,
					url: 'register',
					body,
					method: 'POST',
				})
				localStorage.setItem(accessKey, access)
				localStorage.setItem(refreshKey, refresh)
				setUser(user)
			} catch (e) {
				setError(e as Error)
			} finally {
				setLoading(false)
			}
		},
		[base, accessKey, refreshKey]
	)

	const refreshToken = useCallback(
		() =>
			req<{
				token: {
					refresh?: string
					access: string
				}
			}>({
				base,
				url: 'token',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem(refreshKey)}`,
				},
			}),
		[base, refreshKey]
	)

	const me = useCallback(
		(token: string) =>
			req<{
				user: UserType
			}>({
				base,
				url: 'me',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[base]
	)

	// biome-ignore lint/correctness/useExhaustiveDependencies: once only
	useEffect(() => {
		const token = localStorage.getItem(accessKey)

		const main = async () => {
			try {
				setLoading(true)
				setError(null)
				// biome-ignore lint/style/noNonNullAssertion: checked
				setUser((await me(token!)).user)
			} catch (e) {
				if ((e as Error).name === 'UnAuthenticatedError') {
					try {
						const {
							token: { refresh, access },
						} = await refreshToken()

						localStorage.setItem(accessKey, access)
						if (refresh) {
							localStorage.setItem(refreshKey, refresh)
						}
						setUser((await me(access)).user)
					} catch (e) {
						setError(e as Error)
					}
				}
			} finally {
				setLoading(false)
			}
		}

		if (token) {
			main()
		}
	}, [])

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
