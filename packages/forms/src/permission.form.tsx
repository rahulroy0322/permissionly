import { useAppForm } from 'form'
import { Layers, Lock, Plus, Trash2, Unlock } from 'lucide-react'
import { type FC, type SubmitEvent, useCallback } from 'react'
import { ACTIONS } from 'schema/action'
import {
	type AndType,
	type ConditionType,
	type LeafType,
	type NotType,
	operators,
} from 'schema/condition'
import { type PermissionSchemaType, permissionSchema } from 'schema/permission'
import { resorces } from 'schema/resorces'
import { ROLES } from 'schema/role'
import { Button } from 'ui/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from 'ui/ui/card'
import { Field } from 'ui/ui/field'
import { Input } from 'ui/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from 'ui/ui/select'
import { toast } from 'ui/ui/sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'ui/ui/tabs'

type LeafPropsType = {
	handleChange: (updater: LeafType) => void
	value: LeafType
}

const Leaf: FC<LeafPropsType> = ({ handleChange, value }) => (
	<div className="flex items-center gap-2">
		<Input
			onChange={({ target: { value: ref = '' } }) =>
				handleChange({
					...value,
					// @ts-expect-error
					ref,
				})
			}
			placeholder="attr/user"
			value={value.ref}
		/>

		<Select
			onValueChange={(op) =>
				handleChange({
					...value,
					// @ts-expect-error
					op,
				})
			}
			value={value.op}
		>
			<SelectTrigger className="w-full">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="check">Check</SelectItem>
				{operators.map((op) => (
					<SelectItem
						key={op}
						value={op}
					>
						{`${op.at(0)?.toUpperCase()}${op.slice(1)}`}
					</SelectItem>
				))}
			</SelectContent>
		</Select>

		<Input
			onChange={({ target: { value: v = '' } }) =>
				handleChange({
					...value,
					// @ts-expect-error
					value: v,
				})
			}
			placeholder="value"
			// @ts-expect-error
			value={value.value}
		/>
	</div>
)

type PermissionFromPropsType = {
	disabled: boolean
	handleSubmit: (value: PermissionSchemaType) => void
}

const PermissionFrom: FC<PermissionFromPropsType> = ({
	disabled,
	handleSubmit: hs,
}) => {
	const {
		AppField,
		handleSubmit: submit,
		Field: F,
		setFieldValue,
	} = useAppForm({
		defaultValues: {
			role: 'user',
			value: false,
			action: undefined,
			resorce: undefined,
		} satisfies PermissionSchemaType as PermissionSchemaType,
		validators: {
			// @ts-expect-error
			onBlur: permissionSchema,
		},
		onSubmit({ value }) {
			hs(value)
		},
		onSubmitInvalid: ({ value }) => {
			const { error } = permissionSchema.safeParse(value)

			if (!error) {
				return
			}

			toast.error(
				(
					error.issues[0] as unknown as { errors: { message: string }[][] }
				).errors
					.map((x) => x.map(({ message }) => message).join('  ,  '))
					.join('  ,  ')
			)
		},
	})

	const handleSubmit = useCallback(
		(e: SubmitEvent<HTMLFormElement>) => {
			e.preventDefault()
			submit()
		},
		[submit]
	)

	const handleValueChangeUpper = useCallback(
		(type: 'simple' | 'advance') => {
			switch (type) {
				case 'simple':
					// @ts-ignore
					setFieldValue('value', false)
					return
				case 'advance':
					setFieldValue('value', {
						type: 'leaf',
						op: 'eq',
						ref: 'user.id',
						value: '',
					} satisfies LeafType)
					return
				default:
					console.error(`invalid op ${type satisfies never}`)
			}
		},
		[setFieldValue]
	)

	const handleValueChange = useCallback(
		(type: ConditionType['type']) => {
			switch (type) {
				case 'leaf':
					setFieldValue('value', {
						type: 'leaf',
						op: 'eq',
						ref: 'user.id',
						value: '',
					} satisfies LeafType)
					return
				case 'not':
					setFieldValue('value', {
						type: 'not',
						leaf: {
							type: 'leaf',
							op: 'eq',
							ref: 'user.id',
							value: '',
						},
					} satisfies NotType)
					return
				case 'and':
				case 'or':
					setFieldValue('value', {
						type,
						leafs: [
							{
								type: 'leaf',
								op: 'eq',
								ref: 'user.id',
								value: '',
							},
						],
					} satisfies ConditionType)
					return
				default:
					console.error(`invalid op ${type satisfies never}`)
			}
		},
		[setFieldValue]
	)

	return (
		<form
			className="space-y-2"
			onSubmit={handleSubmit}
		>
			<AppField name="role">
				{({ Select }) => (
					<Select
						label="Role"
						placeholder="Select which role"
					>
						{ROLES.map((role) => (
							<SelectItem
								key={role}
								value={role}
							>
								{`${role.at(0)?.toUpperCase()}${role.slice(1)}`}
							</SelectItem>
						))}
					</Select>
				)}
			</AppField>

			<AppField name="resorce">
				{({ Select }) => (
					<Select
						description="Leave empty for role lebel permission"
						label="Resorce"
						placeholder="Select which Resorce"
					>
						{resorces.map((resorce) => (
							<SelectItem
								key={resorce}
								value={resorce}
							>
								{`${resorce.at(0)?.toUpperCase()}${resorce.slice(1)}`}
							</SelectItem>
						))}
					</Select>
				)}
			</AppField>

			<AppField name="action">
				{({ Select }) => (
					<Select
						description="Leave empty for role/resorce lebel permission"
						label="Action"
						placeholder="Select which Action"
					>
						{ACTIONS.map((action) => (
							<SelectItem
								key={action}
								value={action}
							>
								{`${action.at(0)?.toUpperCase()}${action.slice(1)}`}
							</SelectItem>
						))}
					</Select>
				)}
			</AppField>

			<Tabs
				className="flex-col"
				onValueChange={handleValueChangeUpper}
			>
				<TabsList className="w-full">
					<TabsTrigger value="simple">Simple</TabsTrigger>
					<TabsTrigger value="advance">Advance</TabsTrigger>
				</TabsList>
				<TabsContent value="simple">
					<AppField name="value">
						{({ handleChange, state: { value } }) => {
							const BoolIcon = value ? Unlock : Lock

							return (
								<Card
									className="cursor-pointer w-full"
									onClick={() => {
										handleChange(typeof value === 'boolean' ? !value : false)
									}}
									variant={value ? 'success' : 'destructive'}
								>
									<CardHeader>
										<CardTitle>{value ? 'ALLOW' : 'DENY'} ACCESS</CardTitle>
										<CardDescription>Click to toggle state</CardDescription>
									</CardHeader>
									<CardContent>
										<BoolIcon
											className="size-5"
											size={20}
										/>
									</CardContent>
								</Card>
							)
						}}
					</AppField>
				</TabsContent>
				<TabsContent value="advance">
					<Card variant="warn">
						<CardHeader className="flex items-center gap-2">
							<Layers
								className="size-5"
								size={20}
							/>
							<CardTitle>Condition Logic</CardTitle>
						</CardHeader>
						<CardContent>
							<Tabs
								className="flex-col"
								onValueChange={handleValueChange}
							>
								<TabsList className="w-full">
									<TabsTrigger value={'leaf' satisfies ConditionType['type']}>
										Leaf
									</TabsTrigger>
									<TabsTrigger value={'not' satisfies ConditionType['type']}>
										Not
									</TabsTrigger>
									<TabsTrigger value={'and' satisfies ConditionType['type']}>
										And
									</TabsTrigger>
									<TabsTrigger value={'or' satisfies ConditionType['type']}>
										Or
									</TabsTrigger>
								</TabsList>

								<TabsContent value={'leaf' satisfies ConditionType['type']}>
									<AppField name="value">
										{({ state: { value }, handleChange }) => (
											<Leaf
												handleChange={
													handleChange as LeafPropsType['handleChange']
												}
												value={value}
											/>
										)}
									</AppField>
								</TabsContent>
								<TabsContent value={'not' satisfies ConditionType['type']}>
									<AppField name="value">
										{({ state: { value }, handleChange }) => (
											<Leaf
												handleChange={
													handleChange as LeafPropsType['handleChange']
												}
												value={(value as NotType)?.leaf as LeafType}
											/>
										)}
									</AppField>
								</TabsContent>

								<TabsContent
									className="space-y-2"
									value={'and' satisfies ConditionType['type']}
								>
									<AppField
										mode="array"
										name="value.leafs"
									>
										{({ state: { value }, pushValue, removeValue }) => (
											<>
												{(value as AndType['leafs'])?.map((_, index) => (
													<F
														key={index.toString()}
														name={`value.leafs[${index}]`}
													>
														{({
															state: { value },
															handleChange,
															handleBlur,
														}) => (
															<div
																className="flex items-center gap-2"
																onBlur={handleBlur}
															>
																<Leaf
																	handleChange={
																		handleChange as LeafPropsType['handleChange']
																	}
																	value={value}
																/>
																<Button
																	onClick={() => removeValue(index)}
																	size="icon"
																	variant="destructive"
																>
																	<Trash2
																		className="size-5"
																		size={20}
																	/>
																</Button>
															</div>
														)}
													</F>
												))}

												<Button
													className="w-full"
													onClick={() => {
														pushValue({
															type: 'leaf',
															op: 'check',
															ref: '',
															value: '',
														})
													}}
													variant="outline"
												>
													<Plus
														className="size-5"
														size={20}
													/>{' '}
													Add Leaf
												</Button>
											</>
										)}
									</AppField>
								</TabsContent>

								<TabsContent
									className="space-y-2"
									value={'or' satisfies ConditionType['type']}
								>
									<AppField
										mode="array"
										name="value.leafs"
									>
										{({ state: { value }, pushValue, removeValue }) => (
											<>
												{(value as AndType['leafs'])?.map((_, index) => (
													<F
														key={index.toString()}
														name={`value.leafs[${index}]`}
													>
														{({
															state: { value },
															handleChange,
															handleBlur,
														}) => (
															<div
																className="flex items-center gap-2"
																onBlur={handleBlur}
															>
																<Leaf
																	handleChange={
																		handleChange as LeafPropsType['handleChange']
																	}
																	value={value}
																/>
																<Button
																	onClick={() => removeValue(index)}
																	size="icon"
																	variant="destructive"
																>
																	<Trash2
																		className="size-5"
																		size={20}
																	/>
																</Button>
															</div>
														)}
													</F>
												))}

												<Button
													className="w-full"
													onClick={() => {
														pushValue({
															type: 'leaf',
															op: 'check',
															ref: '',
															value: '',
														})
													}}
													variant="outline"
												>
													<Plus
														className="size-5"
														size={20}
													/>{' '}
													Add Leaf
												</Button>
											</>
										)}
									</AppField>
								</TabsContent>
							</Tabs>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			<Field>
				<Button
					className="w-full"
					disabled={disabled}
					type="submit"
				>
					Create Permission
				</Button>
			</Field>
		</form>
	)
}

export { PermissionFrom }
