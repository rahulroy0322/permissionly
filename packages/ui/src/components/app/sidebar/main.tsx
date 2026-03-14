import { PanelLeftIcon } from 'lucide-react'
import type { ComponentProps, FC } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useSidebar } from './context'

type SidebarPropsType = ComponentProps<'aside'>

const Sidebar: FC<SidebarPropsType> = (props) => {
	'use no memo'
	const { isOpen, closeSidebar } = useSidebar()

	return (
		<div
			className={cn(
				'fixed inset-0 transition-all group/sidebar z-60',
				{
					'-translate-x-full': !isOpen,
				},
				'md:translate-x-0! md:w-60 md:max-w-60 md:static',
				{
					'md:w-15': !isOpen,
				}
			)}
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
