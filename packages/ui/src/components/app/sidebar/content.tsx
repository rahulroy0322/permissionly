import type { ComponentProps, FC } from 'react'
import { cn } from '@/lib/utils'

type SidebarContentPropsType = ComponentProps<'div'>

const SidebarContent: FC<SidebarContentPropsType> = (props) => (
	<header
		{...props}
		className={cn(
			'flex-1 px-4 pt-2 mb-2 flex flex-col gap-1 overflow-auto group-data-[state=close]/sidebar:px-2 transition-all duration-150',
			props.className
		)}
	/>
)

export { SidebarContent }
