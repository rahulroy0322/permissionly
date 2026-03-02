import { useLocation } from 'preact-iso'

export function Header() {
	const { url } = useLocation()

	return (
		<header>
			<nav>
				<a
					class={url === '/' && 'active'}
					href="/"
				>
					Home
				</a>
				<a
					class={url === '/404' && 'active'}
					href="/404"
				>
					404
				</a>
			</nav>
		</header>
	)
}
