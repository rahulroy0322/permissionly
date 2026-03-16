import { PanelLeftIcon } from 'lucide-react'
import type { ComponentProps, FC } from 'react'
import { cn } from '../../../lib/utils'
import { Button } from '../../ui/button'
import { useSidebar } from './context'

type SidebarPropsType = ComponentProps<'aside'>

const Sidebar: FC<SidebarPropsType> = (props) => {
	'use no memo'
	const { isOpen, closeSidebar } = useSidebar()

	return (
		<div
			className={cn('sidebar group/sidebar')}
			data-state={isOpen ? 'open' : 'close'}
		>
			<button
				className="size-full bg-slate-900/50 md:hidden"
				onClick={closeSidebar}
			/>
			<aside
				className="bg-background absolute left-0 top-0 bottom-0 w-1/2 md:w-full! overflow-hidden shadow"
				{...props}
			/>
		</div>
	)
}

type SidebarTriggerPropsType = Parameters<typeof Button>[0]

const SidebarTrigger: FC<SidebarTriggerPropsType> = (props) => {
	const { toggleSidebar } = useSidebar()

	return (
		<Button
			{...props}
			onClick={(event) => {
				props.onClick?.(event)
				toggleSidebar()
			}}
			size={props.size ?? 'icon-sm'}
			variant={props.variant ?? 'ghost'}
		>
			{props.children ?? <PanelLeftIcon />}
			<span className="sr-only">Toggle Sidebar</span>
		</Button>
	)
}

export { Sidebar, SidebarTrigger }
