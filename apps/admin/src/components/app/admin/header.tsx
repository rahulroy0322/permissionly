import type { FC } from 'react'
import { MeHeader } from '#/me.header'
import Wraper from '#/wraper'
import { SidebarTrigger } from '@/components/app/sidebar/main'
import { ThemeSwitch } from '@/components/app/theme/main'
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
