import { createFileRoute, Link } from '@tanstack/react-router'
import { RegisterForm, SocialLogins } from 'auth'
import type { FC } from 'react'
import { LeftPart } from '#/auth/left'
import { RightPart } from '#/auth/right'
import { Button } from '@/components/ui/button'

const RegisterPage: FC = () => (
	<div className="min-h-screen flex items-center justify-center p-2">
		<div className="grid grid-cols-1 w-[90%] md:grid-cols-2 m-auto max-w-2xl ring ring-primary/30">
			<LeftPart className="border-r-2">
				<div className="text-center mb-4">
					<h1 className="text-2xl font-bold">Create your account</h1>
					<p className="text-balance text-muted-foreground">
						Enter details below to create your account
					</p>
				</div>

				<RegisterForm />
				<Button
					className="p-0 mb-4"
					nativeButton={false}
					render={<p />}
					variant={'link'}
				>
					Already have account? <Link to="/login">Login Here!</Link>
				</Button>

				<SocialLogins />
			</LeftPart>
			<RightPart
				className="hidden md:block"
				mode="register"
			/>
		</div>
	</div>
)

const Route = createFileRoute('/(auth)/register')({
	component: RegisterPage,
})

export { Route }
