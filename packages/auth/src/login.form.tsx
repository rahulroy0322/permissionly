import { useAppForm } from 'form'
import { type FC, type SubmitEvent, useCallback } from 'react'
import { type LoginSchemaType, loginSchema } from 'schema/auth'
import { Button } from 'ui/ui/button'
import { Field } from 'ui/ui/field'

const LoginForm: FC = () => {
	const { AppField, handleSubmit: submit } = useAppForm({
		defaultValues: {
			email: '',
			password: '',
		} satisfies LoginSchemaType as LoginSchemaType,
		validators: {
			onBlur: loginSchema,
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
