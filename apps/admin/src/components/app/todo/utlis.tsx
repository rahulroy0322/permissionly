const time = (time: string): string =>
	new Date(time).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
	})

export { time }
