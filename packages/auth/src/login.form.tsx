import { useAppForm } from 'form'
import type { FC } from 'react'
import { Button } from 'ui/ui/button'
import { Field } from 'ui/ui/field'

const LoginForm: FC = () => {
	const { AppField } = useAppForm({})

	return (
		<form
			className="space-y-2"
			onSubmit={(e) => {
				e.preventDefault()
			}}
		>
			<AppField name="email">
				{({ Input }) => (
					<Input
						label="Email"
						placeholder="john@example.com"
						type="email"
					/>
				)}
			</AppField>

			<AppField name="password">
				{({ Input }) => (
					<Input
						label="Password"
						placeholder={'*'.repeat(8)}
						type="password"
					/>
				)}
			</AppField>

			<Field>
				<Button
					className="w-full"
					type="submit"
				>
					Login
				</Button>
			</Field>
		</form>
	)
}

export { LoginForm }
