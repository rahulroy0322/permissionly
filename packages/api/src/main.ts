type SuccessType<T> = {
	success: true
	data: T
}

type ErrorType<E = Error> = {
	success: false
	error: E
}

type ResType<T> = SuccessType<T> | ErrorType<Error>

type ReqDefType = {
	base: string
	url: string
	headers?: Record<string, string>
}

type ReqGetType = ReqDefType & {
	method: 'GET'
}

type ReqPostType = ReqDefType & {
	method: 'POST'
	body: Record<string, unknown>
}

type ReqParamsType = ReqGetType | ReqPostType

const req = async <T>({
	url,
	base,
	method,
	// @ts-expect-error
	body,
	headers,
}: ReqParamsType) => {
	const res = await fetch(`${base}/api/v1/${url}`, {
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

const get = <T>(params: Omit<ReqGetType, 'method'>) =>
	req<T>({
		method: 'GET',
		...params,
	})

const post = <T>(params: Omit<ReqPostType, 'method'>) =>
	req<T>({
		method: 'POST',
		...params,
	})

export { req, get, post }
