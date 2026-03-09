import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import type { FC } from 'react'
import { Button } from 'ui/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from 'ui/ui/dropdown-menu'
import { Avatar } from '@/components/app/Avatar'
import { useIsMobile } from '@/hooks/use-mobile'
import { LogoText } from './logo'
import Wraper from './wraper'

type HeaderPropsType = {
	user: null // UserType
}

type LinkType = {
	link: string
	value: Uppercase<string>
}
const links = [
	{
		link: '/',
		value: 'HOME',
	},
	// TODo!
	{
		link: '/',
		value: 'BLOGS',
	},
	{
		link: '/',
		value: 'ABOUT',
	},
	{
		link: '/',
		value: 'POLICY',
	},
] as const satisfies LinkType[]

const MobileHeader: FC<HeaderPropsType> = ({ user }) => (
	<DropdownMenu>
		<DropdownMenuTrigger render={<Button variant="ghost" />}>
			<Menu className="size-6" />
		</DropdownMenuTrigger>
		<DropdownMenuContent
			className={'w-[55vw] h-screen p-2 flex flex-col justify-between'}
			render={<nav />}
		>
			<DropdownMenuGroup>
				{links.map(({ link, value }) => (
					<DropdownMenuItem key={`${link}-${value}`}>
						<Link
							className="text-lg w-full"
							to={link}
						>
							{value}
						</Link>
					</DropdownMenuItem>
				))}
			</DropdownMenuGroup>
			{!user ? (
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Button
							nativeButton={false}
							render={<Link to="/login" />}
							variant={'outline'}
						>
							Login
						</Button>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Button
							nativeButton={false}
							render={<Link to="/register" />}
						>
							Register
						</Button>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			) : (
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Avatar
							// TODO!
							// src={user.}
							alt=""
							render={<Link to="/me" />}
							src=""
						/>
					</DropdownMenuItem>
					{/* <DropdownMenuItem>
            <Button
              nativeButton={false}
              render={
                <Link
                  // TODO!
                  to="/register"
                />
              }
            >
              Logout
            </Button>
          </DropdownMenuItem> */}
					{/* {adminRoles.includes(user.role) ? (
              <DropdownMenuItem>
                <Button
                  nativeButton={false}
                  render={<Link to="/admin" />}
                >
                  Admin Panel
                </Button>
              </DropdownMenuItem>
            ) : null} */}
				</DropdownMenuGroup>
			)}
		</DropdownMenuContent>
	</DropdownMenu>
)

const DeskTopHeader: FC<HeaderPropsType> = ({ user }) => (
	<nav className="flex items-center justify-between w-1/2 lg:w-2/3">
		<ul className="flex items-center gap-4 lg:gap-6">
			{links.map(({ link, value }) => (
				<li key={`${link}-${value}`}>
					<Link to={link}>{value}</Link>
				</li>
			))}
		</ul>

		<div>
			{user ? (
				<>
					<Button
						nativeButton={false}
						render={<Link to="/login" />}
						variant={'outline'}
					>
						Login
					</Button>
					<Button
						nativeButton={false}
						render={<Link to="/register" />}
					>
						Register
					</Button>
				</>
			) : (
				<Avatar
					// TODO!
					// src={user.}
					alt=""
					render={<Link to="/me" />}
					src=""
				/>
			)}
		</div>
	</nav>
)

const Header: FC<HeaderPropsType> = ({ user }) => {
	const isMobile = useIsMobile()
	const Header = isMobile ? MobileHeader : DeskTopHeader
	return (
		<Wraper className="sticky z-9999 top-0 bg-background">
			<header className="flex justify-between items-center sticky top-0 z-99">
				<Link to="/">
					<LogoText />
				</Link>
				<Header user={user} />
			</header>
		</Wraper>
	)
}

export default Header
