import { get, post } from 'api'
import { CONFIG } from 'src/config'

const checkToken = () => {
	const refToken = localStorage.getItem(CONFIG.refreshKey)

	if (!refToken) {
		// ? should never run
		throw new Error('login first')
	}
}

const getWithToken = <T>(props: Omit<Parameters<typeof get>[0], 'base'>) => {
	checkToken()

	return get<T>({
		...props,
		base: CONFIG.BASE,
		headers: {
			Authorization: `Bearer ${localStorage.getItem(CONFIG.accessKey)}`,
			...props.headers,
		},
	})
}

const postWithToken = <T>(props: Omit<Parameters<typeof post>[0], 'base'>) => {
	checkToken()

	return post<T>({
		...props,
		base: CONFIG.BASE,
		headers: {
			Authorization: `Bearer ${localStorage.getItem(CONFIG.accessKey)}`,
			...props.headers,
		},
	})
}

export { getWithToken, postWithToken }
