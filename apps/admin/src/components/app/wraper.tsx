import type { ComponentProps, FC } from 'react'
import { cn } from 'ui/lib/utils'

type WraperPropsType = ComponentProps<'div'>

const Wraper: FC<WraperPropsType> = (props) => (
	<div
		{...props}
		className={cn('p-2 container mx-auto', props.className)}
	/>
)

export default Wraper
