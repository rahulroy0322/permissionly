import { Eye, EyeOff } from 'lucide-react'
import { type FC, useCallback, useState } from 'react'
import { Button } from 'ui/ui/button'
import type { Input } from 'ui/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from 'ui/ui/input-group'
import { useFieldContext } from '../main'
import { FormBase, type FormControllPropsType } from './base'

type FormPasswordInputPropsType = FormControllPropsType &
	Parameters<typeof Input>[0]

const FormPasswordInput: FC<FormPasswordInputPropsType> = ({
	label,
	description,
	className,
	...props
}) => {
	const field = useFieldContext<string>()
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
	const [type, setType] = useState<'password' | 'text'>('password')

	const toggleType = useCallback(() => {
		setType((prev) => (prev === 'text' ? 'password' : 'text'))
	}, [])

	return (
		<FormBase
			description={description}
			label={label}
		>
			<InputGroup>
				<InputGroupInput
					{...props}
					aria-invalid={isInvalid}
					id={field.name}
					name={field.name}
					onBlur={field.handleBlur}
					onChange={(e) => field.handleChange(e.target.value)}
					type={type}
					value={field.state.value}
				/>
				<Button
					className={className}
					nativeButton={false}
					onClick={toggleType}
					render={<InputGroupAddon align="inline-end" />}
					size={'icon-sm'}
					variant={'ghost'}
				>
					{type === 'password' ? <EyeOff /> : <Eye />}
				</Button>
			</InputGroup>
		</FormBase>
	)
}

export { FormPasswordInput }
