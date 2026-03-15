import { get, post } from 'api'
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

	const login = useCallback(
		async (body: LoginSchemaType) => {
			try {
				setError(null)
				setLoading(true)

				const {
					token: { access, refresh },
					user,
				} = await post<{
					user: UserType
					token: {
						refresh: string
						access: string
					}
				}>({
					base,
					url: 'auth/login',
					body,
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
				} = await post<{
					user: UserType
					token: {
						refresh: string
						access: string
					}
				}>({
					base,
					url: 'auth/register',
					body,
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
			get<{
				token: {
					refresh?: string
					access: string
				}
			}>({
				base,
				url: 'auth/token',
				headers: {
					Authorization: `Bearer ${localStorage.getItem(refreshKey)}`,
				},
			}),
		[base, refreshKey]
	)

	const me = useCallback(
		(token: string) =>
			get<{
				user: UserType
			}>({
				base,
				url: 'auth/me',
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
