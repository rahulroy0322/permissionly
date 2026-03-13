import type { FC } from 'react'
import { MeHeader } from '#/me.header'
import { SidebarTrigger } from '@/components/app/sidebar/main'
import { Path } from './path'

const AdminHeader: FC = () => (
	<header className="flex items-center justify-between p-2">
		<div className="flex items-center gap-2">
			<SidebarTrigger />
			<Path />
		</div>
		<MeHeader />
	</header>
)

export { AdminHeader }
