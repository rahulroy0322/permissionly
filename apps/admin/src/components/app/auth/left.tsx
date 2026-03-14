import type { ComponentProps, FC } from 'react'
import { cn } from '@/lib/utils'

type LeftPartPropsType = ComponentProps<'div'>

const LeftPart: FC<LeftPartPropsType> = (props) => (
	<div
		{...props}
		className={cn('p-6', props.className)}
	/>
)

export { LeftPart }
