import { useAppForm } from 'form'
import { Cog } from 'lucide-react'
import { type FC, type SubmitEvent, useCallback, useRef } from 'react'
import { type PostSchemaType, postSchema } from 'schema/post'
import { Button } from 'ui/ui/button'

const generateSlug = (title: string) => title.replaceAll(' ', '-').toLowerCase()

type PostFromPropsType = {
	Button: FC
	disabled: boolean
	handleSubmit: (value: PostSchemaType) => void
}

const PostFrom: FC<PostFromPropsType> = ({
	disabled,
	handleSubmit: hs,
	Button: B,
}) => {
	const titleRef = useRef<HTMLInputElement>(null)

	const {
		AppField,
		handleSubmit: submit,
		setFieldValue,
	} = useAppForm({
		defaultValues: {
			slug: '',
			title: '',
			desc: '',
			content: '',
		} satisfies PostSchemaType as PostSchemaType,
		validators: {
			onBlur: postSchema,
		},
		onSubmit({ value }) {
			hs(value)
		},
	})

	const handleSubmit = useCallback(
		(e: SubmitEvent<HTMLFormElement>) => {
			e.preventDefault()
			submit()
		},
		[submit]
	)

	const genSlug = useCallback(() => {
		if (!titleRef.current) {
			return
		}
		setFieldValue('slug', generateSlug(titleRef.current.value || ''))
	}, [setFieldValue])

	return (
		<form
			className="space-y-2 h-full flex flex-col"
			onSubmit={handleSubmit}
		>
			<div className="grid md:grid-cols-2 gap-2">
				<AppField name="title">
					{({ Input }) => (
						<Input
							label="Title"
							placeholder="Enter Title"
							ref={titleRef}
						/>
					)}
				</AppField>
				<div className="flex gap-2 items-end">
					<AppField name="slug">
						{({ Input }) => (
							<Input
								label="Slug"
								placeholder="Enter Slug"
							/>
						)}
					</AppField>
					<Button
						onClick={genSlug}
						size="icon"
						type="button"
					>
						<Cog />
					</Button>
				</div>
			</div>

			<AppField name="desc">
				{({ Textarea }) => (
					<Textarea
						label="Description"
						placeholder="Enter Description"
					/>
				)}
			</AppField>

			<div className="grow overflow-auto">
				<AppField name="content">
					{({ Editor }) => (
						<Editor
							label="Content"
							placeholder="Enter Content"
						/>
					)}
				</AppField>
			</div>

			<Button
				disabled={disabled}
				render={<B />}
				type="submit"
			>
				Create Post
			</Button>
		</form>
	)
}

export { PostFrom }
