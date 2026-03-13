import { Flashlight, Moon, Sun, type LucideIcon } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { FC } from "react"
import { useTheme, type ThemeType } from "./context"


const themes = {
    light: Sun, dark: Moon, system: Flashlight
} as const satisfies Record<
    ThemeType,
    LucideIcon
>


const ThemeSwitch: FC = () => {
    const { setTheme, theme } = useTheme()
    const Icon = themes[theme]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={'size-7 inline-flex items-center justify-center p-1'}
            >
                <Icon
                    size={20}
                />
                <span className="sr-only">Toggle theme</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {
                    Object.entries(themes).map(([mode, Icon]) => (
                        <DropdownMenuItem onClick={() => setTheme(mode as ThemeType)} className='capitalize flex gap-2 items-center justify-center'
                            key={mode}
                        >
                            <Icon
                                size={20}
                            /> {mode}
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export {
    ThemeSwitch
}