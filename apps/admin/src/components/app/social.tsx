import type { LucideIcon } from 'lucide-react'
import type { FC } from 'react'
import { cn } from 'ui/lib/utils'

type SocialIconIconPropsType = {
	Icon: LucideIcon
	href: string
	disabled?: boolean
}

const SocialIconIcon: FC<SocialIconIconPropsType> = ({
	Icon,
	disabled = false,
	...props
}) => (
	<a
		{...props}
		className={cn('p-1 bg-inherit shadow size-10 block', {
			'pointer-events-none cursor-not-allowed opacity-50': disabled,
		})}
	>
		<Icon />
	</a>
)

export { SocialIconIcon }
