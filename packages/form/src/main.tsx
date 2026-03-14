import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { FormInput } from './ui/input'

const { fieldContext, formContext, useFieldContext } = createFormHookContexts()

const { useAppForm } = createFormHook({
	fieldComponents: {
		Input: FormInput,
		// Textarea: FormTextArea,
		// MultiSelect: FormMultiSelect,
		// Select: FormSelect,
		// Checkbox: FormCheckbox,
	},
	formComponents: {},
	fieldContext,
	formContext,
})

export { useAppForm, useFieldContext }
