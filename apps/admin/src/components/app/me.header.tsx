import { Link } from '@tanstack/react-router'
import type { FC } from 'react'
import { Avatar } from '@/components/app/Avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type MeHeaderUIPropsType = {
	name: string
	src: string
}

const MeHeaderUI: FC<MeHeaderUIPropsType> = ({ src, name }) => (
	<DropdownMenu>
		<DropdownMenuTrigger>
			<Avatar
				alt={name}
				className="size-5"
				src={src}
			/>
		</DropdownMenuTrigger>
		<DropdownMenuContent
			align="end"
			className="w-40"
		>
			<DropdownMenuGroup>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuItem
					nativeButton={false}
					render={<Link to="/" />}
				>
					Profile
					<DropdownMenuShortcut className="opacity-50">
						⇧⌘P
					</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem
					nativeButton={false}
					render={<Link to="/" />}
				>
					Settings
					<DropdownMenuShortcut className="opacity-50">⌘S</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuGroup>

			<DropdownMenuSeparator />
			<DropdownMenuGroup>
				<DropdownMenuItem>GitHub</DropdownMenuItem>
				<DropdownMenuItem>Support</DropdownMenuItem>
				<DropdownMenuItem disabled>API</DropdownMenuItem>
			</DropdownMenuGroup>
			<DropdownMenuSeparator />
			<DropdownMenuGroup>
				<DropdownMenuItem>
					Log out
					<DropdownMenuShortcut className="opacity-50">
						⇧⌘Q
					</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuGroup>
		</DropdownMenuContent>
	</DropdownMenu>
)

const MeHeader: FC = () => {
	return (
		<MeHeaderUI
			name="Jhon Dow"
			src=""
		/>
	)
}

export { MeHeader }
