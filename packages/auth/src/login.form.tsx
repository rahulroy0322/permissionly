import { useAppForm } from 'form'
import { type FC, type SubmitEvent, useCallback, useEffect } from 'react'
import { type LoginSchemaType, loginSchema } from 'schema/auth'
import { Button } from 'ui/ui/button'
import { Field, FieldError } from 'ui/ui/field'
import { toast } from 'ui/ui/sonner'
import { useAuth } from './context'

const LoginForm: FC = () => {
	const { login, loading, error } = useAuth()
	const { AppField, handleSubmit: submit } = useAppForm({
		defaultValues: {
			email: '',
			password: '',
		} satisfies LoginSchemaType as LoginSchemaType,
		validators: {
			onBlur: loginSchema,
		},

		onSubmit: ({ value }) => login(value),
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
					disabled={loading}
					type="submit"
				>
					Login
				</Button>
			</Field>
		</form>
	)
}

export { LoginForm }
