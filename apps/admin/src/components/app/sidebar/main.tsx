import { type FileRoutesByPath, Link } from '@tanstack/react-router'
import { LayoutDashboard, ListTodo, Newspaper, Shield } from 'lucide-react'
import type { FC, ReactNode } from 'react'
import { SidebarContent } from 'ui/app/sidebar/content'
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupItem,
	SidebarGroupLabel,
} from 'ui/app/sidebar/group'
import { SidebarHeader, SidebarLogo } from 'ui/app/sidebar/header'
import { Sidebar } from 'ui/app/sidebar/main'
import { LogoText } from '@/logo'

type MenuGroupType = {
	title: string
	items: MenuItemType[]
}

type MenuItemType = {
	title: Capitalize<string>
	Icon: ReactNode
	url: keyof FileRoutesByPath
}

const menu = [
	{
		title: 'Getting Started',
		items: [
			{
				title: 'DashBoard',
				Icon: <LayoutDashboard />,
				url: '/admin/dashboard',
			},
		],
	},
	{
		title: 'Resources',
		items: [
			{
				title: 'Todos',
				Icon: <ListTodo />,
				url: '/admin/todo',
			},
			{
				title: 'Posts',
				Icon: <Newspaper />,
				url: '/admin/post',
			},
		],
	},
	{
		title: 'Core',
		items: [
			{
				title: 'Permissions',
				Icon: <Shield />,
				url: '/admin/permission',
			},
		],
	},
] satisfies MenuGroupType[]

const AppSidebar: FC = () => (
	<Sidebar>
		<SidebarHeader>
			<Link to="/">
				<SidebarLogo Icon={<Shield />}>
					<LogoText />
				</SidebarLogo>
			</Link>
		</SidebarHeader>

		<SidebarContent>
			{menu.map(({ title, items }) => (
				<SidebarGroup key={title}>
					<SidebarGroupLabel>{title}</SidebarGroupLabel>
					<SidebarGroupContent>
						{items.map(({ title, url, Icon }) => (
							<Link
								key={title}
								to={url}
							>
								<SidebarGroupItem
									Icon={Icon}
									key={title}
								>
									{title}
								</SidebarGroupItem>
							</Link>
						))}
					</SidebarGroupContent>
				</SidebarGroup>
			))}
		</SidebarContent>
	</Sidebar>
)

export type { MenuItemType }
export { AppSidebar, menu }
