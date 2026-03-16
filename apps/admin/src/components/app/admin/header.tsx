import type { FC } from 'react'
import { SidebarTrigger } from 'ui/app/sidebar/main'
import { ThemeSwitch } from 'ui/app/theme/main'
import { MeHeader } from '@/me.header'
import Wraper from '@/wraper'
import { Path } from './path'

const AdminHeader: FC = () => (
	<Wraper className="shadow-lg">
		<header className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<SidebarTrigger />
				<Path />
			</div>
			<div className="flex items-center gap-4">
				<ThemeSwitch />
				<MeHeader />
			</div>
		</header>
	</Wraper>
)

export { AdminHeader }
