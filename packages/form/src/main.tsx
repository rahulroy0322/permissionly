import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { FormEditor } from './ui/editor'
import { FormInput } from './ui/input'
import { FormPasswordInput } from './ui/password'
import { FormSelect } from './ui/select'
import { FormTextarea } from './ui/textarea'

const { fieldContext, formContext, useFieldContext } = createFormHookContexts()

const { useAppForm } = createFormHook({
	fieldComponents: {
		Input: FormInput,
		Password: FormPasswordInput,
		Select: FormSelect,
		Textarea: FormTextarea,
		Editor: FormEditor,
	},
	formComponents: {},
	fieldContext,
	formContext,
})

export { useAppForm, useFieldContext }
