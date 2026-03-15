import { get } from 'api'
import { CONFIG } from 'src/config'

const getWithToken = <T>(props: Omit<Parameters<typeof get>[0], 'base'>) => {
	const refToken = localStorage.getItem(CONFIG.refreshKey)

	if (!refToken) {
		// ? should never run
		throw new Error('login first')
	}

	return get<T>({
		...props,
		base: CONFIG.BASE,
		headers: {
			Authorization: `Bearer ${localStorage.getItem(CONFIG.accessKey)}`,
			...props.headers,
		},
	})
}

export { getWithToken }
