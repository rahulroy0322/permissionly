import type { ComponentProps, FC } from 'react'
import { cn } from '@/lib/utils'
import { LoginSvg } from '@/svg/login'
import { RegisterSvg } from '@/svg/register'

type RightPartPropsType = {
	mode: 'login' | 'register'
} & ComponentProps<'figure'>

const RightPart: FC<RightPartPropsType> = (props) => (
	<figure
		{...props}
		className={cn('p-4', props.className)}
	>
		{props.mode === 'login' ? <LoginSvg /> : <RegisterSvg />}
	</figure>
)

export { RightPart }
