const isEmpty = <T extends Record<string, unknown>>(
	data: T,
	keys: (keyof T)[]
) => keys.every((key) => data[key] == null)

export { isEmpty }
