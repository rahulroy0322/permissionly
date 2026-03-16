import { LaptopMinimal, type LucideIcon, Moon, Sun } from 'lucide-react'
import type { FC } from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from 'ui/ui/dropdown-menu'
import { type ThemeType, useTheme } from './context'

const themes = {
	light: Sun,
	dark: Moon,
	system: LaptopMinimal,
} as const satisfies Record<ThemeType, LucideIcon>

const ThemeSwitch: FC = () => {
	const { setTheme, theme } = useTheme()
	const Icon = themes[theme]

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className={'size-7 inline-flex items-center justify-center p-1'}
			>
				<Icon size={20} />
				<span className="sr-only">Toggle theme</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{Object.entries(themes).map(([mode, Icon]) => (
					<DropdownMenuItem
						className="capitalize flex gap-2 items-center justify-center"
						key={mode}
						onClick={() => setTheme(mode as ThemeType)}
					>
						<Icon size={20} /> {mode}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export { ThemeSwitch }
