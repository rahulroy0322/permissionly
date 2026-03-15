import { useAppForm } from 'form'
import { type FC, type SubmitEvent, useCallback, useEffect } from 'react'
import { type RegisterSchemaType, registerSchema } from 'schema/auth'
import { Button } from 'ui/ui/button'
import { Field, FieldError } from 'ui/ui/field'
import { toast } from 'ui/ui/sonner'
import { useAuth } from './context'

const RegisterForm: FC = () => {
	const { register, loading, error } = useAuth()
	const { AppField, handleSubmit: submit } = useAppForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		} satisfies RegisterSchemaType as RegisterSchemaType,
		validators: {
			onBlur: registerSchema,
		},

		onSubmit: ({ value }) => register(value),
	})
	const handleSubmit = useCallback(
		(e: SubmitEvent<HTMLFormElement>) => {
			e.preventDefault()
			submit()
		},
		[submit]
	)

	useEffect(() => {
		if (error) {
			toast.error(error.message ?? String(error))
		}
	}, [error])

	return (
		<form
			className="space-y-2"
			onSubmit={handleSubmit}
		>
			{error ? (
				<FieldError
					errors={[
						error.message
							? error
							: {
									message: String(error),
								},
					]}
				/>
			) : null}
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
					disabled={loading}
					type="submit"
				>
					Create Account
				</Button>
			</Field>
		</form>
	)
}

export { RegisterForm }
