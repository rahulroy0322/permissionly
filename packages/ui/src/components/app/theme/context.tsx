import {
	createContext,
	type FC,
	type ReactNode,
	use,
	useCallback,
	useEffect,
	useState,
} from 'react'

type ThemeType = 'dark' | 'light' | 'system'

type ThemeContextType = {
	theme: ThemeType
	setTheme: (theme: ThemeType) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

type ThemeProviderPropsType = {
	children: ReactNode
	defaultTheme?: ThemeType
	storageKey?: string
}

const ThemeProvider: FC<ThemeProviderPropsType> = ({
	children,
	defaultTheme = 'system',
	storageKey = 'permissionly-theme',
}) => {
	const [theme, _setTheme] = useState<ThemeType>(
		() => (localStorage.getItem(storageKey) as ThemeType) || defaultTheme
	)

	useEffect(() => {
		const root = window.document.documentElement

		root.classList.remove('light', 'dark')

		if (theme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
				.matches
				? 'dark'
				: 'light'

			root.classList.add(systemTheme)
			return
		}

		root.classList.add(theme)
	}, [theme])

	const setTheme = useCallback(
		(theme: ThemeType) => {
			localStorage.setItem(storageKey, theme)
			_setTheme(theme)
		},
		[storageKey]
	)

	return (
		<ThemeContext
			value={{
				theme,
				setTheme,
			}}
		>
			{children}
		</ThemeContext>
	)
}

const useTheme = () => {
	const context = use(ThemeContext)

	if (!context) throw new Error('useTheme must be used within a ThemeProvider')

	return context
}

export type { ThemeType }

export { useTheme, ThemeProvider }
