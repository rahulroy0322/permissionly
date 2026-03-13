import { Link } from '@tanstack/react-router'
import { LayoutDashboard, Shield, Users } from 'lucide-react'
import type { FC } from 'react'
import { LogoText } from '#/logo'
import { SidebarContent } from '@/components/app/sidebar/content'
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupItem,
	SidebarGroupLabel,
} from '@/components/app/sidebar/group'
import { SidebarHeader, SidebarLogo } from '@/components/app/sidebar/header'
import { Sidebar } from '@/components/app/sidebar/main'

const menu = [
	{
		title: 'Getting Started',
		// url: "#",
		items: [
			{
				title: 'DashBoard',
				Icon: <LayoutDashboard />,
				// url: "#",
			},
			{
				title: 'Users',
				// url: "#",
				Icon: <Users />,
			},
		],
	},
]

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
						{items.map(({ title, Icon }) => (
							<SidebarGroupItem
								Icon={Icon}
								key={title}
							>
								{title}
							</SidebarGroupItem>
						))}
					</SidebarGroupContent>
				</SidebarGroup>
			))}
		</SidebarContent>
	</Sidebar>
)

export { AppSidebar }
