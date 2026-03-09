import { Link } from '@tanstack/react-router'
import {
	BellRing,
	Facebook,
	Github,
	Linkedin,
	Mail,
	Twitter,
	Youtube,
} from 'lucide-react'
import type { FC } from 'react'
import { Button } from 'ui/ui/button'
import { Input } from 'ui/ui/input'
import { LogoText } from './logo'
import { SocialIconIcon } from './social'
import Wraper from './wraper'

const Footer: FC = () => (
	<Wraper className="mt-auto">
		<footer className="space-y-6">
			<nav className="text-muted-foreground gap-4 grid md:grid-cols-2 lg:grid-cols-4">
				<div className="space-y-2">
					<Link
						className="text-foreground block"
						to="/"
					>
						<LogoText />
					</Link>
					<h4 className="text-balance">
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa,
						dolore quidem. Commodi at, nihil expedita aut ducimus aliquam natus
						voluptatem iusto quis, modi voluptatum dolor.
					</h4>
				</div>
				<div className="flex flex-col gap-2">
					<h3 className="text-xl font-bold text-foreground">About</h3>
					<Link to=".">About Us</Link>
					<Link to=".">Blog</Link>
					<Link to=".">Portfolio</Link>
				</div>
				<div className="flex flex-col gap-2">
					<h3 className="text-xl font-bold text-foreground">Support</h3>
					<a
						className="flex items-center gap-1"
						href="mailto:rahulroyapd80@gmail.com"
					>
						Contact
						<Mail className="size-4 rotate-45" />
					</a>
					<Link to=".">Request</Link>
					<Link to=".">Faq</Link>
				</div>
				<div className="flex flex-col gap-2 text-foreground">
					<h3 className="text-xl font-bold flex items-center gap-1 group/noti">
						Get Notified{' '}
						<BellRing className="size-4 group-hover/noti:-rotate-45 transition-transform" />
					</h3>

					<form className="ring flex items-stretch p-1.5 shadow shadow-primary ring-input focus-within:ring-primary">
						<Input
							className="rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent"
							placeholder="Enter your email"
						/>
						<Button>Subscribe</Button>
					</form>

					<h3 className="text-xl font-bold">Follow on</h3>
					<div className="flex gap-2 flex-wrap items-center">
						<SocialIconIcon
							href="#"
							Icon={Twitter}
						/>
						<SocialIconIcon
							href="#"
							Icon={Linkedin}
						/>
						<SocialIconIcon
							href="#"
							Icon={Github}
						/>
						<SocialIconIcon
							disabled
							href="#"
							Icon={Facebook}
						/>
						<SocialIconIcon
							disabled
							href="#"
							Icon={Youtube}
						/>
					</div>
				</div>
			</nav>
			<div className="flex flex-col md:flex-row justify-between gap-2 text-center">
				<p>
					&copy;{new Date().getFullYear()} <LogoText />. All rights reserved.
				</p>
				<div className="flex items-center gap-6">
					<Link to="/">Privacy Policy</Link>
					<Link to="/">Terms & Conditions</Link>
				</div>
			</div>
		</footer>
	</Wraper>
)

export default Footer
