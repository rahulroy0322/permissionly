import type { FC } from 'react'
import { SimpleEditor } from 'ui/components/tiptap-templates/simple/simple-editor.tsx'
import type { Textarea } from 'ui/ui/textarea'
import { useFieldContext } from '../main'
import { FormBase, type FormControllPropsType } from './base'

type FormEditorPropsType = FormControllPropsType &
	Parameters<typeof Textarea>[0]

const FormEditor: FC<FormEditorPropsType> = ({
	label,
	description,
	...props
}) => {
	const field = useFieldContext<string>()
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

	return (
		<FormBase
			description={description}
			label={label}
		>
			<SimpleEditor
				{...props}
				aria-invalid={isInvalid}
				id={field.name}
				name={field.name}
				onBlur={field.handleBlur}
				onChange={field.handleChange}
				value={field.state.value}
			/>
		</FormBase>
	)
}

export { FormEditor }
