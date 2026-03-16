import { Loader } from 'lucide-react'
import type { FC } from 'react'
import { cn } from '../../lib/utils'

type AppLoaderPropsType = {
	page?: boolean
}

const AppLoader: FC<AppLoaderPropsType> = ({ page = false }) => (
	<div
		className={cn('size-full flex items-center justify-center', {
			'h-screen w-screen': page,
		})}
	>
		<Loader className="size-3/4 max-w-12 animate-spin animation-duration-[2.5s]" />
	</div>
)

export { AppLoader }
