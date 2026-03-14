import { useAppForm } from 'form'
import { type FC, type SubmitEvent, useCallback } from 'react'
import { type RegisterSchemaType, registerSchema } from 'schema/auth'
import { Button } from 'ui/ui/button'
import { Field } from 'ui/ui/field'

const RegisterForm: FC = () => {
	const { AppField, handleSubmit: submit } = useAppForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		} satisfies RegisterSchemaType as RegisterSchemaType,
		validators: {
			onBlur: registerSchema,
		},

		onSubmit: ({ value }) => {
			// biome-ignore lint/suspicious/noConsole: temp
			console.log('xalsx', value)
		},
	})
	const handleSubmit = useCallback(
		(e: SubmitEvent<HTMLFormElement>) => {
			e.preventDefault()
			submit()
		},
		[submit]
	)

	return (
		<form
			className="space-y-2"
			onSubmit={handleSubmit}
		>
			<AppField name="name">
				{({ Input }) => (
					<Input
						label="Name"
						placeholder="John Doe"
						type="text"
					/>
				)}
			</AppField>
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
				{({ Password }) => (
					<Password
						className="bg-transparent!"
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
					Create Account
				</Button>
			</Field>
		</form>
	)
}

export { RegisterForm }
