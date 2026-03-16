import type { ComponentProps, FC } from 'react'
import { cn } from 'ui/lib/utils'
import { LoginSvg } from 'ui/svg/login.tsx'
import { RegisterSvg } from 'ui/svg/register.tsx'

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
