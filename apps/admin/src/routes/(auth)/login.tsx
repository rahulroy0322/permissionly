import { createFileRoute, Link } from '@tanstack/react-router'
import { LoginForm, SocialLogins } from 'auth'
import type { FC } from 'react'
import { LeftPart } from '#/auth/left'
import { RightPart } from '#/auth/right'
import { Button } from '@/components/ui/button'

const LoginPage: FC = () => (
	<div className="min-h-screen flex items-center justify-center p-2">
		<div className="grid grid-cols-1 w-[90%] md:grid-cols-2 m-auto max-w-2xl ring ring-primary/30">
			<LeftPart className="border-r-2">
				<div className="text-center mb-4">
					<h1 className="text-2xl font-bold">Welcome back</h1>
					<p className="text-balance text-muted-foreground">
						Login to your account
					</p>
				</div>

				<LoginForm />

				<div className="mb-4 flex flex-col items-start">
					<Button
						className="p-0"
						nativeButton={false}
						render={<p />}
						variant={'link'}
					>
						Don't have account? <Link to="/register">Register Here!</Link>
					</Button>

					<Button
						className="p-0"
						nativeButton={false}
						render={<p />}
						variant={'link'}
					>
						Forgot Password? <Link to="/">Reset Here!</Link>
					</Button>
				</div>

				<SocialLogins />
			</LeftPart>
			<RightPart
				className="hidden md:block"
				mode="login"
			/>
		</div>
	</div>
)

const Route = createFileRoute('/(auth)/login')({
	component: LoginPage,
})

export { Route }
